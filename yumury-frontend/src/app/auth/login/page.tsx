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

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  remember: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPw, setShowPw] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("¡Bienvenido de nuevo!");
      router.push("/cuenta");
    } catch {
      toast.error("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Brand panel — hidden on mobile */}
      <div className="relative hidden w-[55%] flex-col justify-between bg-gradient-brand p-12 lg:flex">
        <div className="relative z-10">
          <p className="text-lg font-bold text-white/90">Yumury Envíos & Travel</p>
        </div>
        <div className="relative z-10 space-y-4">
          <blockquote className="text-2xl font-semibold leading-relaxed text-white">
            &ldquo;Gracias a Yumury pude mandarle el combo de cumpleaños a mi mamá en Cárdenas sin
            salir de casa. ¡Llegó con fotos!&rdquo;
          </blockquote>
          <p className="text-sm text-white/75">— Yenny Rodríguez, Miami FL</p>
        </div>
        <div className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} Yumury Envíos & Travel
        </div>
        {/* Decorative */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200')] bg-cover bg-center opacity-10" />
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size="lg" />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-h2 font-bold">Bienvenido de nuevo</h1>
            <p className="mt-1 text-foreground-muted">Ingresa para gestionar tus envíos</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/auth/recuperar-password"
                  className="text-xs text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                  aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 rounded border-input"
              />
              <span className="text-sm text-foreground-muted">Recordarme</span>
            </label>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
              size="lg"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...</>
              ) : (
                "Iniciar sesión"
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
              <Button
                key={provider}
                variant="outline"
                size="lg"
                disabled
                className="cursor-not-allowed opacity-60"
              >
                {provider === "Google" ? "🔍" : "🍎"} {provider}
              </Button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-foreground-muted">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/auth/registro" className="font-medium text-primary hover:underline">
              Crear cuenta →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
