"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Truck, Zap, Ship, ArrowLeft, ArrowRight, MessageSquare, Check } from "lucide-react";
import { motion } from "framer-motion";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SHIPPING_OPTIONS = [
  {
    type: "standard" as const,
    label: "Envío Estándar",
    fee: 8.99,
    eta: "5-7 días hábiles",
    minDays: 5,
    maxDays: 7,
    icon: Truck,
    description: "La opción más popular. Tracking visual incluido.",
    badge: null,
  },
  {
    type: "express" as const,
    label: "Envío Express",
    fee: 18.99,
    eta: "3-5 días hábiles",
    minDays: 3,
    maxDays: 5,
    icon: Zap,
    description: "Prioridad de envío. Ideal para alimentos congelados.",
    badge: "Recomendado para alimentos",
  },
  {
    type: "maritime" as const,
    label: "Envío Marítimo",
    fee: 4.99,
    eta: "4-7 semanas",
    minDays: 28,
    maxDays: 49,
    icon: Ship,
    description: "Lo más económico para envíos grandes y voluminosos.",
    badge: "Para motos, refrigeradores, lavadoras",
  },
] as const;

export default function CheckoutStep2() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const { shipping, setShipping, setStep, recipientFamilyId, giftMessage, setGiftMessage } =
    useCheckoutStore();

  const [selectedType, setSelectedType] = React.useState<string | null>(
    shipping?.type ?? "standard",
  );
  const [showMessage, setShowMessage] = React.useState(!!giftMessage);

  // Guard
  React.useEffect(() => {
    if (items.length === 0) router.replace("/carrito");
    if (!recipientFamilyId) router.replace("/checkout");
  }, [items.length, recipientFamilyId, router]);

  const hasMaritime = items.some((i) => i.shippingType === "maritime");

  const handleContinue = () => {
    const opt = SHIPPING_OPTIONS.find((o) => o.type === selectedType);
    if (!opt) return;
    setShipping({ type: opt.type, fee: opt.fee });
    setStep("payment");
    router.push("/checkout/pago");
  };

  const getEtaLabel = (minDays: number, maxDays: number) => {
    const from = format(addDays(new Date(), minDays), "d 'de' MMMM", { locale: es });
    const to = format(addDays(new Date(), maxDays), "d 'de' MMMM", { locale: es });
    return `Entre el ${from} y el ${to}`;
  };

  const selected = SHIPPING_OPTIONS.find((o) => o.type === selectedType);

  return (
    <CheckoutLayout step={2}>
      <div className="max-w-xl">
        <h1 className="text-h2 font-bold mb-1">¿Cómo lo enviamos?</h1>
        <p className="text-foreground-muted mb-8">
          Selecciona el método de envío para tu pedido.
        </p>

        <div className="space-y-3 mb-8">
          {SHIPPING_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const disabled = opt.type === "maritime" && !hasMaritime;
            const isSelected = selectedType === opt.type;

            return (
              <button
                key={opt.type}
                disabled={disabled}
                onClick={() => !disabled && setSelectedType(opt.type)}
                className={cn(
                  "relative w-full rounded-xl border-2 bg-card p-4 text-left transition-all",
                  isSelected
                    ? "border-primary shadow-sm shadow-primary/10"
                    : "border-border hover:border-primary/40",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    isSelected ? "bg-primary/10 text-primary" : "bg-muted text-foreground-muted",
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{opt.label}</span>
                      <span className="font-mono text-base font-bold tabular-nums shrink-0">
                        ${opt.fee.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-medium">{opt.eta}</p>
                    <p className="text-sm text-foreground-muted mt-0.5">{opt.description}</p>
                    {opt.badge && (
                      <span className="mt-1.5 inline-block rounded-full bg-brand-orange/10 px-2 py-0.5 text-[11px] font-medium text-brand-orange">
                        {opt.badge}
                      </span>
                    )}
                    {disabled && (
                      <p className="mt-1 text-xs text-foreground-muted italic">
                        Solo disponible con artículos de envío marítimo
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Estimated arrival */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl bg-primary/5 border border-primary/20 p-4"
          >
            <p className="text-sm font-medium text-foreground">
              📦 Tu pedido llegará{" "}
              <span className="text-primary font-semibold">
                {getEtaLabel(selected.minDays, selected.maxDays)}
              </span>
            </p>
          </motion.div>
        )}

        {/* Gift message */}
        <div className="mb-8">
          <button
            onClick={() => setShowMessage((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <MessageSquare className="h-4 w-4" />
            {showMessage ? "Quitar mensaje de regalo" : "¿Quieres incluir un mensaje?"}
          </button>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                maxLength={200}
                rows={3}
                placeholder="Escribe un mensaje para tu familiar..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
              <p className="mt-1 text-right text-xs text-foreground-muted">
                {giftMessage.length}/200
              </p>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => { setStep("recipient"); router.push("/checkout"); }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-brand text-white hover:opacity-90 shadow-md"
            disabled={!selectedType}
            onClick={handleContinue}
          >
            Continuar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </CheckoutLayout>
  );
}
