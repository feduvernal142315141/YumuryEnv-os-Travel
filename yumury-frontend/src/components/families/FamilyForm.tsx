"use client";

import { cn } from "@/lib/utils";
import type { Family, Relationship } from "@/types";
import { matanzasMunicipalities } from "@/lib/mock-data/municipalities";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nanoid } from "nanoid";
import { useState } from "react";
import { ChevronDown, ChevronUp, Save } from "lucide-react";

const AVATARS = ["👵", "👴", "👨", "👩", "👧", "👦", "🧑‍🦱", "👨🏼", "👩🏼", "🧓", "🧑", "👶"];

const RELATIONSHIPS: Relationship[] = [
  "Madre", "Padre", "Hermano", "Hermana", "Tío", "Tía",
  "Abuelo", "Abuela", "Sobrino", "Sobrina", "Hijo", "Hija",
  "Esposo", "Esposa", "Amigo", "Otro",
];

const HEALTH_ALERTS = [
  "Diabético", "Hipertenso", "Alergia gluten", "Alergia maní",
  "Asma", "Celíaco", "Vegano", "Otro",
];

const PREFERENCES = [
  "Café fuerte", "Sin azúcar", "Comida criolla", "Productos de marca",
  "Aseo premium", "Vegetales frescos", "Conservas", "Dulces",
];

const familySchema = z.object({
  avatar: z.string().min(1, "Selecciona un avatar"),
  alias: z.string().min(2, "Mínimo 2 caracteres"),
  fullName: z.string().min(3, "Nombre completo requerido"),
  relationship: z.string().min(1, "Selecciona la relación"),
  age: z.coerce.number().min(0).max(120).optional().or(z.literal("")),
  phone: z.string().regex(/^\+53\s?\d{4}\s?\d{4}$/, "Formato: +53 XXXX XXXX"),
  altPhone: z.string().optional(),
  municipality: z.string().min(1, "Selecciona el municipio"),
  street: z.string().min(1, "Calle requerida"),
  number: z.string().min(1, "Número requerido"),
  between: z.string().optional(),
  reference: z.string().optional(),
  birthday: z.string().optional(),
  alerts: z.array(z.string()).optional(),
  preferences: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof familySchema>;

type FamilyFormProps = {
  initialData?: Family;
  onSubmit: (family: Family) => void;
  onCancel?: () => void;
};

export function FamilyForm({ initialData, onSubmit, onCancel }: FamilyFormProps) {
  const [showExtras, setShowExtras] = useState(
    !!(initialData?.birthday || initialData?.alerts?.length || initialData?.preferences?.length)
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      avatar: initialData?.avatar || "",
      alias: initialData?.alias || "",
      fullName: initialData?.fullName || "",
      relationship: initialData?.relationship || "",
      age: initialData?.age || "",
      phone: initialData?.phone || "",
      altPhone: initialData?.altPhone || "",
      municipality: initialData?.address?.municipality || "",
      street: initialData?.address?.street || "",
      number: initialData?.address?.number || "",
      between: initialData?.address?.between || "",
      reference: initialData?.address?.reference || "",
      birthday: initialData?.birthday || "",
      alerts: initialData?.alerts || [],
      preferences: initialData?.preferences || [],
      notes: initialData?.notes || "",
    },
  });

  const selectedAvatar = watch("avatar");
  const selectedAlerts = watch("alerts") || [];
  const selectedPreferences = watch("preferences") || [];

  const toggleChip = (field: "alerts" | "preferences", value: string) => {
    const current = field === "alerts" ? selectedAlerts : selectedPreferences;
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, next, { shouldValidate: true });
  };

  const onFormSubmit = (data: FormValues) => {
    const municipality = matanzasMunicipalities.find(
      (m) => m.value === data.municipality
    );

    const family: Family = {
      id: initialData?.id || `family_${nanoid(8)}`,
      alias: data.alias,
      fullName: data.fullName,
      relationship: data.relationship as Relationship,
      age: typeof data.age === "number" ? data.age : undefined,
      avatar: data.avatar,
      phone: data.phone,
      altPhone: data.altPhone || undefined,
      address: {
        street: data.street,
        number: data.number,
        between: data.between || undefined,
        municipality: data.municipality,
        municipalityLabel: municipality?.label || data.municipality,
        province: "Matanzas",
        reference: data.reference || undefined,
      },
      birthday: data.birthday || undefined,
      preferences: data.preferences?.length ? data.preferences : undefined,
      alerts: data.alerts?.length ? data.alerts : undefined,
      notes: data.notes || undefined,
      stats: initialData?.stats || {
        totalOrdersReceived: 0,
        lastOrderDate: undefined,
        totalReceived: 0,
      },
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(family);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Section 1: Identity */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          ¿Quién es tu familiar?
        </h3>

        {/* Avatar grid */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground-secondary">
            Avatar
          </label>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setValue("avatar", emoji, { shouldValidate: true })}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all",
                  selectedAvatar === emoji
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                    : "hover:bg-card-hover border border-border"
                )}
              >
                {emoji}
              </button>
            ))}
          </div>
          {errors.avatar && (
            <p className="mt-1 text-xs text-destructive">{errors.avatar.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Alias (cómo le llamas)
            </label>
            <input
              {...register("alias")}
              placeholder="Mamá, Tía Mercedes..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.alias && (
              <p className="mt-1 text-xs text-destructive">{errors.alias.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Nombre completo
            </label>
            <input
              {...register("fullName")}
              placeholder="Mercedes González Pérez"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Relación
            </label>
            <select
              {...register("relationship")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Seleccionar...</option>
              {RELATIONSHIPS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {errors.relationship && (
              <p className="mt-1 text-xs text-destructive">{errors.relationship.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Edad (opcional)
            </label>
            <input
              {...register("age")}
              type="number"
              min={0}
              max={120}
              placeholder="67"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Address */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          ¿Dónde vive en Matanzas?
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Municipio
            </label>
            <select
              {...register("municipality")}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Seleccionar municipio...</option>
              {matanzasMunicipalities.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            {errors.municipality && (
              <p className="mt-1 text-xs text-destructive">{errors.municipality.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Calle
            </label>
            <input
              {...register("street")}
              placeholder="Calle 12"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.street && (
              <p className="mt-1 text-xs text-destructive">{errors.street.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Número
            </label>
            <input
              {...register("number")}
              placeholder="234"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.number && (
              <p className="mt-1 text-xs text-destructive">{errors.number.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Entre (opcional)
            </label>
            <input
              {...register("between")}
              placeholder="entre 3ra y 5ta"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Referencia (opcional)
            </label>
            <input
              {...register("reference")}
              placeholder="Casa azul a la izquierda del CUPET"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Contact */}
      <section className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          ¿Cómo lo contactamos?
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Teléfono principal
            </label>
            <input
              {...register("phone")}
              placeholder="+53 5234 5678"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground-secondary">
              Teléfono alternativo (opcional)
            </label>
            <input
              {...register("altPhone")}
              placeholder="+53 4523 1234"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Extras (collapsible) */}
      <section className="rounded-xl border border-border bg-card p-6">
        <button
          type="button"
          onClick={() => setShowExtras(!showExtras)}
          className="flex w-full items-center justify-between text-lg font-semibold text-foreground"
        >
          <span>Información especial (opcional)</span>
          {showExtras ? (
            <ChevronUp className="h-5 w-5 text-foreground-muted" />
          ) : (
            <ChevronDown className="h-5 w-5 text-foreground-muted" />
          )}
        </button>

        {showExtras && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground-secondary">
                Cumpleaños
              </label>
              <input
                {...register("birthday")}
                type="date"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground-secondary">
                Alertas de salud
              </label>
              <div className="flex flex-wrap gap-2">
                {HEALTH_ALERTS.map((alert) => (
                  <button
                    key={alert}
                    type="button"
                    onClick={() => toggleChip("alerts", alert)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      selectedAlerts.includes(alert)
                        ? "bg-brand-red-50 text-brand-red-deep ring-1 ring-brand-red/30 dark:bg-brand-red/10 dark:text-brand-red-light"
                        : "bg-background border border-border text-foreground-secondary hover:bg-card-hover"
                    )}
                  >
                    {alert}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground-secondary">
                Preferencias de productos
              </label>
              <div className="flex flex-wrap gap-2">
                {PREFERENCES.map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => toggleChip("preferences", pref)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      selectedPreferences.includes(pref)
                        ? "bg-brand-green-50 text-brand-green-deep ring-1 ring-brand-green/30 dark:bg-brand-green/10 dark:text-brand-green-light"
                        : "bg-background border border-border text-foreground-secondary hover:bg-card-hover"
                    )}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground-secondary">
                Notas adicionales
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder="Le encanta el café fuerte. Prefiere productos sin azúcar..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground-secondary transition-colors hover:bg-card-hover"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {initialData ? "Guardar cambios" : "Guardar familiar"}
        </button>
      </div>
    </form>
  );
}
