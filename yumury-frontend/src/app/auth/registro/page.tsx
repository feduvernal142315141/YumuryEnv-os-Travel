"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const registroSchema = z
  .object({
    name: z.string().min(2, "Nombre requerido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, "Debes aceptar los términos"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegistroForm = z.infer<typeof registroSchema>;

function strengthLabel(pw: string) {
  if (pw.length === 0) return null;
  if (pw.length < 8) return { label: "Débil", color: "bg-destructive", width: "w-1/4" };
  if (pw.length < 10 && !/[A-Z]/.test(pw)) return { label: "Regular", color: "bg-brand-orange", width: "w-2/4" };
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) return { label: "Fuerte", color: "bg-primary", width: "w-full" };
  return { label: "Buena", color: "bg-brand-yellow", width: "w-3/4" };
}

export default function RegistroPage() {
  const router = useRouter();
  const { register: authRegister } = useAuthStore();
  const [showPw, setShowPw] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pwValue, setPwValue] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
    mode: "onTouched",
  });

  const strength = strengthLabel(pwValue);

  const onSubmit = async (data: RegistroForm) => {
    setLoading(true);
    try {
      await authRegister({ name: data.name, email: data.email });
      toast.success("¡Cuenta creada! Bienvenido a Yumury 🎉");
      router.push("/cuenta");
    } catch {
      toast.error("Error al crear la cuenta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-[55%] flex-col justify-between bg-gradient-brand p-12 lg:flex">
        <div className="relative z-10">
          <p className="text-lg font-bold text-white/90">Yumury Envíos & Travel</p>
        </div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Empieza a enviar a tu familia en Matanzas hoy
          </h2>
          <p className="text-white/75">
            Registro gratuito · Sin cuota mensual · Cancela cuando quieras
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Combos curados", "Tracking visual", "Mis Familias", "Yumi AI"].map((f) => (
              <span
                key={f}
                className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white"
              >
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} Yumury Envíos & Travel
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200')] bg-cover bg-center opacity-10" />
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size="lg" />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-h2 font-bold">Crea tu cuenta gratis</h1>
            <p className="mt-1 text-foreground-muted">Empieza a enviar a Matanzas hoy</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="María García" autoComplete="name" {...register("name")} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" autoComplete="email" {...register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  className="pr-10"
                  {...register("password", {
                    onChange: (e) => setPwValue(e.target.value),
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted"
                  aria-label={showPw ? "Ocultar" : "Mostrar"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Strength indicator */}
              {strength && (
                <div className="space-y-1">
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-300", strength.color, strength.width)}
                    />
                  </div>
                  <p className="text-xs text-foreground-muted">
                    Seguridad: <span className="font-medium">{strength.label}</span>
                  </p>
                </div>
              )}
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                  className="pr-10"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted"
                  aria-label={showConfirm ? "Ocultar" : "Mostrar"}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("terms")}
                  className="mt-0.5 h-4 w-4 rounded border-input"
                />
                <span className="text-sm text-foreground-muted">
                  Acepto los{" "}
                  <Link href="/terminos" className="text-primary underline" target="_blank">
                    Términos
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacidad" className="text-primary underline" target="_blank">
                    Política de Privacidad
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="mt-1 text-xs text-destructive">{errors.terms.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
              size="lg"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...</>
              ) : (
                "Crear cuenta gratis"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-foreground-muted">O continúa con</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <Button key={provider} variant="outline" size="lg" disabled className="opacity-60">
                {provider === "Google" ? "🔍" : "🍎"} {provider}
              </Button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-foreground-muted">
            ¿Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Iniciar sesión →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
