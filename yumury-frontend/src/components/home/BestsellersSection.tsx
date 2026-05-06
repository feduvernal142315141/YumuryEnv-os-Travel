import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBestsellers } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "./MotionReveal";

export function BestsellersSection() {
  const products = getBestsellers(8);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
      <MotionReveal className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <span className="text-overline text-brand-orange">Lo más pedido</span>
          <h2 className="mt-2 text-h1">Bestsellers Yumury</h2>
          <p className="mt-3 text-body-lg text-foreground-secondary">
            Lo que más envían las familias cubanas a Matanzas. Calidad probada.
          </p>
        </div>
        <Button asChild variant="ghost">
          <Link href="/categoria/alimentos">
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </MotionReveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {products.map((p, i) => (
          <MotionReveal key={p.id} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
