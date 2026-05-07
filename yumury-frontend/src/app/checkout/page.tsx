"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Plus, MapPin, Phone, Check } from "lucide-react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { useFamiliesStore } from "@/lib/stores/families-store";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { matanzasMunicipalities } from "@/lib/mock-data/municipalities";
import { cn } from "@/lib/utils";
import type { Family } from "@/types";

const RELATIONSHIPS = [
  "Madre", "Padre", "Hermano", "Hermana", "Tío", "Tía",
  "Abuelo", "Abuela", "Sobrino", "Sobrina", "Hijo", "Hija",
  "Esposo", "Esposa", "Amigo", "Otro",
] as const;

const recipientSchema = z.object({
  alias: z.string().min(1, "El alias es requerido"),
  fullName: z.string().min(2, "Nombre completo requerido"),
  relationship: z.string().min(1, "Selecciona una relación"),
  phone: z.string().min(8, "Teléfono requerido").regex(/^\+?[\d\s\-]{7,}$/, "Formato inválido"),
  altPhone: z.string().optional(),
  street: z.string().min(2, "Calle requerida"),
  number: z.string().min(1, "Número requerido"),
  between: z.string().optional(),
  municipality: z.string().min(1, "Municipio requerido"),
  reference: z.string().optional(),
  notes: z.string().optional(),
  saveFamily: z.boolean().default(true),
});

type RecipientForm = z.infer<typeof recipientSchema>;

export default function CheckoutStep1() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const { setRecipient, setStep } = useCheckoutStore();
  const { families, selectedFamilyId, selectFamily, addFamily } = useFamiliesStore();
  const [showForm, setShowForm] = React.useState(families.length === 0);
  const [selected, setSelected] = React.useState<string | null>(selectedFamilyId);

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) router.replace("/carrito");
  }, [items.length, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RecipientForm>({
    resolver: zodResolver(recipientSchema),
    mode: "onChange",
    defaultValues: { saveFamily: true },
  });

  const handleSelectFamily = (id: string) => {
    setSelected(id);
    selectFamily(id);
    setShowForm(false);
  };

  const handleContinueWithFamily = () => {
    if (!selected) return;
    setRecipient(selected);
    setStep("shipping");
    router.push("/checkout/envio");
  };

  const onSubmitNewRecipient = (data: RecipientForm) => {
    const muni = matanzasMunicipalities.find((m) => m.value === data.municipality);
    const newFamily: Family = {
      id: nanoid(),
      alias: data.alias,
      fullName: data.fullName,
      relationship: data.relationship as Family["relationship"],
      avatar: "🙂",
      phone: data.phone,
      altPhone: data.altPhone,
      address: {
        street: data.street,
        number: data.number,
        between: data.between,
        municipality: data.municipality,
        municipalityLabel: muni?.label ?? data.municipality,
        province: "Matanzas",
        reference: data.reference,
      },
      notes: data.notes,
      createdAt: new Date().toISOString(),
    };
    if (data.saveFamily) {
      addFamily(newFamily);
    }
    setRecipient(newFamily.id);
    setStep("shipping");
    router.push("/checkout/envio");
  };

  if (items.length === 0) return null;

  return (
    <CheckoutLayout step={1}>
      <div className="max-w-xl">
        <h1 className="text-h2 font-bold mb-1">¿Para quién es el envío?</h1>
        <p className="text-foreground-muted mb-8">
          Selecciona un familiar guardado o ingresa los datos manualmente.
        </p>

        {/* Saved families */}
        {families.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide mb-3">
              Mis familias guardadas
            </h2>
            <div className="grid gap-3">
              {families.map((fam) => (
                <button
                  key={fam.id}
                  onClick={() => handleSelectFamily(fam.id)}
                  className={cn(
                    "relative flex items-start gap-4 rounded-xl border-2 bg-card p-4 text-left transition-all",
                    selected === fam.id
                      ? "border-primary shadow-sm shadow-primary/10"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  <span className="text-3xl">{fam.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{fam.alias}</p>
                      <span className="text-xs text-foreground-muted">· {fam.relationship}</span>
                    </div>
                    <p className="text-sm text-foreground-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {fam.address.municipalityLabel}, Matanzas
                    </p>
                    <p className="text-sm text-foreground-muted flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {fam.phone}
                    </p>
                    {fam.alerts && fam.alerts.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {fam.alerts.map((a) => (
                          <span key={a} className="rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] text-destructive font-medium">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {selected === fam.id && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {selected && !showForm && (
              <Button
                onClick={handleContinueWithFamily}
                size="lg"
                className="mt-4 w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
              >
                Continuar con {families.find((f) => f.id === selected)?.alias}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            <button
              onClick={() => { setSelected(null); setShowForm((v) => !v); }}
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="h-4 w-4" />
              {showForm ? "Cancelar" : "Añadir nuevo destinatario"}
            </button>
          </div>
        )}

        {/* Manual form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmitNewRecipient)}
            className="space-y-5"
          >
            <Separator />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Datos del destinatario
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="alias">¿Cómo le llamas?</Label>
                <Input id="alias" placeholder="Mamá, Tía Carmen..." {...register("alias")} />
                {errors.alias && <p className="text-xs text-destructive">{errors.alias.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="relationship">Relación</Label>
                <select
                  id="relationship"
                  {...register("relationship")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Seleccionar...</option>
                  {RELATIONSHIPS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.relationship && <p className="text-xs text-destructive">{errors.relationship.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input id="fullName" placeholder="Mercedes González Pérez" {...register("fullName")} />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Teléfono (+53)</Label>
                <Input id="phone" placeholder="+53 5234 5678" {...register("phone")} />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="altPhone">Teléfono alternativo (opcional)</Label>
                <Input id="altPhone" placeholder="+53 4523 1234" {...register("altPhone")} />
              </div>
            </div>

            <Separator />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Dirección en Matanzas
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="street">Calle</Label>
                <Input id="street" placeholder="Calle 12" {...register("street")} />
                {errors.street && <p className="text-xs text-destructive">{errors.street.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="234" {...register("number")} />
                {errors.number && <p className="text-xs text-destructive">{errors.number.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="between">Entre calles (opcional)</Label>
                <Input id="between" placeholder="entre 3ra y 5ta" {...register("between")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="municipality">Municipio</Label>
                <select
                  id="municipality"
                  {...register("municipality")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Seleccionar municipio...</option>
                  {matanzasMunicipalities.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                {errors.municipality && <p className="text-xs text-destructive">{errors.municipality.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reference">Referencia (opcional)</Label>
              <Input
                id="reference"
                placeholder="Casa azul a la izquierda del CUPET"
                {...register("reference")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Notas adicionales (opcional)</Label>
              <textarea
                id="notes"
                {...register("notes")}
                rows={3}
                placeholder="Alergias, preferencias, instrucciones especiales..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>

            {/* Save checkbox */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                {...register("saveFamily")}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground-muted">
                Guardar para futuros envíos
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
            >
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
        )}
      </div>
    </CheckoutLayout>
  );
}
