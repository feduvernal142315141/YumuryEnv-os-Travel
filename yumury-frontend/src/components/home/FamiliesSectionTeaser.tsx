import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { mockFamilies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "./MotionReveal";

export function FamiliesSectionTeaser() {
  const families = mockFamilies.slice(0, 3);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-brand-soft opacity-50 dark:opacity-15"
      />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <MotionReveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card/80 px-3 py-1 text-overline text-brand-orange backdrop-blur">
            <Users className="h-3.5 w-3.5" /> Feature exclusiva
          </span>
          <h2 className="mt-3 text-h1">
            Mis Familias: tu lista de seres queridos siempre lista
          </h2>
          <p className="mt-4 text-body-lg text-foreground-secondary">
            Guarda los datos de tu mamá, tu abuela, tus tíos. Reordena en un click.
            Olvídate de escribir direcciones cada vez.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-foreground-secondary">
            {[
              "Direcciones completas con municipios de Matanzas",
              "Preferencias y alergias guardadas por familiar",
              "Historial de envíos por persona",
              "Reorden con un click desde el dashboard",
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                {feat}
              </li>
            ))}
          </ul>
          <Button asChild variant="gradient" size="lg" className="mt-7">
            <Link href="/auth/registro">
              Crear cuenta gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MotionReveal>

        {/* Stacked family cards */}
        <MotionReveal delay={0.1} className="relative h-[420px] sm:h-[480px]">
          {families.map((fam, i) => {
            const offset = i * 26;
            const rotate = (i - 1) * 3;
            return (
              <div
                key={fam.id}
                className="absolute left-1/2 w-[320px] max-w-[90vw] -translate-x-1/2 rounded-3xl border border-border-subtle bg-card p-5 shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  top: `${offset}px`,
                  transform: `translateX(calc(-50% + ${(i - 1) * 14}px)) rotate(${rotate}deg)`,
                  zIndex: i,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand-soft text-3xl">
                    {fam.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-overline text-foreground-muted">
                      {fam.relationship}
                    </p>
                    <p className="truncate text-base font-semibold">{fam.alias}</p>
                    <p className="truncate text-xs text-foreground-muted">
                      {fam.address.municipalityLabel} · Matanzas
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border-subtle pt-3 text-xs">
                  <div>
                    <p className="text-foreground-muted">Pedidos</p>
                    <p className="font-mono text-base font-semibold tabular-nums">
                      {fam.stats?.totalOrdersReceived ?? 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Total enviado</p>
                    <p className="font-mono text-base font-semibold tabular-nums">
                      ${(fam.stats?.totalReceived ?? 0).toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </MotionReveal>
      </div>
    </section>
  );
}
