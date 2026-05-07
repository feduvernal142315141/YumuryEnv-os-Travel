"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, CreditCard, Lock, AlertCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useCartStore, selectSubtotal } from "@/lib/stores/cart-store";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { useFamiliesStore } from "@/lib/stores/families-store";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── helpers ────────────────────────────────────────────────────────────────

function detectBrand(num: string): "visa" | "mastercard" | "amex" | null {
  const n = num.replace(/\s/g, "");
  if (n.startsWith("4")) return "visa";
  if (n.startsWith("5") || n.startsWith("2")) return "mastercard";
  if (n.startsWith("34") || n.startsWith("37")) return "amex";
  return null;
}

function formatCardNum(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const DECLINED_CARD = "4000000000000002";

const paymentSchema = z.object({
  cardNumber: z.string().min(19, "Número de tarjeta incompleto").max(19),
  cardName: z.string().min(3, "Nombre del titular requerido"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY inválido"),
  cvv: z.string().min(3, "CVV inválido").max(4, "CVV inválido"),
  zipCode: z.string().min(5, "ZIP requerido").max(10),
  saveCard: z.boolean().default(false),
  acceptTerms: z.boolean().refine((v) => v === true, { message: "Debes aceptar los términos" }),
});

type PaymentForm = z.infer<typeof paymentSchema>;

const PROCESSING_MESSAGES = [
  "Validando tarjeta...",
  "Confirmando productos...",
  "Notificando a Matanzas...",
  "¡Casi listo!",
];

// ─── component ──────────────────────────────────────────────────────────────

export default function CheckoutStep3() {
  const router = useRouter();

  // Read store values
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const { shipping, setStep, recipientFamilyId } = useCheckoutStore();
  const { families } = useFamiliesStore();

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingMsg, setProcessingMsg] = React.useState(0);
  const [cardError, setCardError] = React.useState("");
  const [cardBrand, setCardBrand] = React.useState<string | null>(null);
  const [cardNum, setCardNum] = React.useState("");
  const [expiry, setExpiry] = React.useState("");

  const shippingFee = shipping?.fee ?? 0;
  const total = subtotal + shippingFee;

  // ── Guards ─────────────────────────────────────────────────────────────────
  // Snapshot the values at mount time. The guard runs once (router is stable),
  // using refs so that clearCart / resetCheckout can never re-trigger it.
  const initRef = React.useRef({ items, recipientFamilyId, shipping });
  React.useEffect(() => {
    const { items: i, recipientFamilyId: rId, shipping: s } = initRef.current;
    if (i.length === 0) { router.replace("/carrito"); return; }
    if (!rId)           { router.replace("/checkout"); return; }
    if (!s)             { router.replace("/checkout/envio"); return; }
  // router is stable — this runs exactly once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // ── Form ───────────────────────────────────────────────────────────────────
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    mode: "onTouched",
    defaultValues: { saveCard: false, acceptTerms: false },
  });

  const handleCardNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNum(e.target.value);
    setCardNum(formatted);
    setValue("cardNumber", formatted, { shouldValidate: true });
    setCardBrand(detectBrand(formatted));
    setCardError("");
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    setValue("expiry", formatted, { shouldValidate: true });
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const onSubmit = async (_data: PaymentForm) => {
    if (cardNum.replace(/\s/g, "") === DECLINED_CARD) {
      setCardError("Tarjeta rechazada. Por favor usa otra tarjeta.");
      return;
    }

    setIsProcessing(true);

    const interval = setInterval(
      () => setProcessingMsg((i) => (i + 1) % PROCESSING_MESSAGES.length),
      700,
    );
    await new Promise((r) => setTimeout(r, 2800));
    clearInterval(interval);

    // Snapshot store values before any mutation
    const snapshotItems      = useCartStore.getState().items;
    const snapshotSubtotal   = snapshotItems.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
    const snapshotShipping   = useCheckoutStore.getState().shipping;
    const snapshotRecipId    = useCheckoutStore.getState().recipientFamilyId;
    const snapshotRecipient  = families.find((f) => f.id === snapshotRecipId);

    const etaDays    = snapshotShipping?.type === "express" ? 5
                     : snapshotShipping?.type === "maritime" ? 35
                     : 7;
    const eta        = format(addDays(new Date(), etaDays), "d 'de' MMMM", { locale: es });
    const orderId    = `YUM-2025-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderTotal = snapshotSubtotal + (snapshotShipping?.fee ?? 0);

    // Persist the new order to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("yumury:new-orders") ?? "[]");
      localStorage.setItem(
        "yumury:new-orders",
        JSON.stringify([
          {
            id: nanoid(),
            number: orderId,
            status: "confirmed",
            createdAt: new Date().toISOString(),
            estimatedDelivery: addDays(new Date(), etaDays).toISOString().slice(0, 10),
            etaLabel: eta,
            recipient: snapshotRecipient,
            items: snapshotItems,
            subtotal: snapshotSubtotal,
            shipping: snapshotShipping?.fee ?? 0,
            total: orderTotal,
            currency: "USD",
            payment: { method: "card", last4: cardNum.slice(-4), brand: cardBrand ?? "visa" },
            publicTrackingId: `pub_${nanoid(8)}`,
          },
          ...existing,
        ]),
      );
    } catch { /* non-fatal */ }

    // Navigate — stores are cleared on the confirmacion page after mount,
    // not here, to avoid race conditions with React 19 transitions.
    router.push(
      `/checkout/confirmacion?` +
      `orderId=${encodeURIComponent(orderId)}` +
      `&eta=${encodeURIComponent(eta)}` +
      `&total=${orderTotal.toFixed(2)}` +
      `&recipient=${encodeURIComponent(snapshotRecipient?.alias ?? "tu familiar")}`,
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <CheckoutLayout step={3}>
      <div className="max-w-xl">
        <h1 className="text-h2 font-bold mb-1">Información de pago</h1>
        <p className="text-sm text-foreground-muted mb-8 flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5 text-primary" />
          Pago 100% seguro · No almacenamos tu información de tarjeta.
        </p>

        {/* Payment method tabs */}
        <div className="mb-6 flex gap-2">
          {["Tarjeta", "PayPal", "Apple Pay"].map((m, i) => (
            <button
              key={m}
              disabled={i > 0}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                i === 0
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground-muted opacity-50 cursor-not-allowed",
              )}
            >
              {m}
              {i > 0 && (
                <span className="ml-1.5 text-[10px] font-normal bg-muted rounded-full px-1.5 py-0.5">
                  Próximamente
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Processing overlay */}
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center gap-6 py-16">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Procesando tu pedido...</p>
              <p className="mt-1 text-sm text-foreground-muted">{PROCESSING_MESSAGES[processingMsg]}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Card number */}
            <div className="space-y-1.5">
              <Label htmlFor="cardNumber">Número de tarjeta</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  value={cardNum}
                  onChange={handleCardNumChange}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  maxLength={19}
                  className="pr-10 font-mono"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                  {cardBrand === "visa" && "💳"}
                  {cardBrand === "mastercard" && "🔴"}
                  {cardBrand === "amex" && "🟦"}
                  {!cardBrand && <CreditCard className="h-4 w-4 text-foreground-muted" />}
                </div>
              </div>
              {errors.cardNumber && (
                <p className="text-xs text-destructive">{errors.cardNumber.message}</p>
              )}
              {cardError && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" /> {cardError}
                </p>
              )}
            </div>

            {/* Cardholder name */}
            <div className="space-y-1.5">
              <Label htmlFor="cardName">Nombre del titular</Label>
              <Input
                id="cardName"
                placeholder="MERCEDES GONZALEZ"
                {...register("cardName")}
                onChange={(e) =>
                  setValue("cardName", e.target.value.toUpperCase(), { shouldValidate: true })
                }
                className="uppercase"
              />
              {errors.cardName && (
                <p className="text-xs text-destructive">{errors.cardName.message}</p>
              )}
            </div>

            {/* Expiry + CVV + ZIP */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="expiry">Vencimiento</Label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/AA"
                  inputMode="numeric"
                  maxLength={5}
                  className="font-mono"
                />
                {errors.expiry && (
                  <p className="text-xs text-destructive">{errors.expiry.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  inputMode="numeric"
                  maxLength={4}
                  className="font-mono"
                  {...register("cvv")}
                />
                {errors.cvv && <p className="text-xs text-destructive">{errors.cvv.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zipCode">ZIP (EE.UU.)</Label>
                <Input
                  id="zipCode"
                  placeholder="33101"
                  inputMode="numeric"
                  maxLength={10}
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <p className="text-xs text-destructive">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" {...register("saveCard")} className="h-4 w-4 rounded border-input" />
                <span className="text-sm text-foreground-muted">Guardar tarjeta para futuras compras</span>
              </label>
              <div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("acceptTerms")}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span className="text-sm text-foreground-muted">
                    Acepto los{" "}
                    <a href="/terminos" className="text-primary underline" target="_blank">
                      Términos y Condiciones
                    </a>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-xs text-destructive">{errors.acceptTerms.message}</p>
                )}
              </div>
            </div>

            {/* Nav buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => { setStep("shipping"); router.push("/checkout/envio"); }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-gradient-brand text-white hover:opacity-90 shadow-md"
              >
                <Lock className="mr-2 h-4 w-4" />
                Confirmar y pagar ${total.toFixed(2)}
              </Button>
            </div>
          </form>
        )}
      </div>
    </CheckoutLayout>
  );
}
