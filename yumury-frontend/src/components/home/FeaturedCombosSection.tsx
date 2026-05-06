import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { combos } from "@/lib/mock-data";
import { ComboCard } from "@/components/combos/ComboCard";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "./MotionReveal";

export function FeaturedCombosSection() {
  const featured = combos.filter((c) => c.featured).slice(0, 6);

  return (
    <section className="bg-background-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <MotionReveal className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="text-overline text-brand-orange">Combos curados</span>
            <h2 className="mt-2 text-h1">Pensados con propósito, no solo bulk</h2>
            <p className="mt-3 text-body-lg text-foreground-secondary">
              Combos diseñados para situaciones reales: apagones, cumpleaños, mamás
              diabéticas, ciclones. Selecciona uno y listo.
            </p>
          </div>
          <Button asChild variant="ghost" className="self-start md:self-auto">
            <Link href="/categoria/combos">
              Ver todos los combos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MotionReveal>

        {/* Mobile carousel / desktop grid */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {featured.map((combo, i) => (
            <MotionReveal
              key={combo.id}
              delay={i * 0.05}
              className="w-[82%] shrink-0 snap-start md:w-auto"
            >
              <ComboCard combo={combo} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
