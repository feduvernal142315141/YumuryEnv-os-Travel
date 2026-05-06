import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "./MotionReveal";

export function CTAFinalSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
      <MotionReveal>
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-brand p-10 text-white shadow-glow-warm md:p-16">
          {/* Decorative shapes */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.5fr_auto]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-overline backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Crea tu cuenta gratis
              </span>
              <h2 className="mt-4 text-display-lg font-extrabold">
                Empieza a enviar a Matanzas hoy
              </h2>
              <p className="mt-3 max-w-xl text-base/relaxed opacity-90 md:text-lg/relaxed">
                Crea tu cuenta gratis y guarda tus familias en menos de 2 minutos.
                Sin contratos, sin compromisos, solo envíos confiables.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/95 shadow-xl"
              >
                <Link href="/auth/registro">
                  Crear cuenta gratis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/categoria/alimentos">Ver catálogo</Link>
              </Button>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
