import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Package,
  Refrigerator,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/mock-data";
import { MotionReveal } from "./MotionReveal";

const ICONS: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Package,
  Refrigerator,
  Bike,
};

export function CategoriesGridSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
      <MotionReveal className="mb-10 max-w-2xl md:mb-14">
        <span className="text-overline text-brand-orange">Catálogo Yumury</span>
        <h2 className="mt-2 text-h1">Explora por categoría</h2>
        <p className="mt-3 text-body-lg text-foreground-secondary">
          Más de 160 productos seleccionados por su utilidad real para una familia en
          Matanzas. Sin filler.
        </p>
      </MotionReveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const Icon = ICONS[cat.icon] ?? Package;
          return (
            <MotionReveal key={cat.id} delay={i * 0.06}>
              <Link
                href={`/categoria/${cat.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/0 transition-opacity duration-300 group-hover:from-foreground/90" />

                {/* Icon chip */}
                <div
                  className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-md"
                  style={{ backgroundColor: cat.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-5 bottom-5 flex flex-col gap-1.5 text-white">
                  <h3 className="text-h4 font-bold">{cat.name}</h3>
                  <p className="line-clamp-2 text-sm opacity-85">
                    {cat.shortDescription}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold opacity-80 transition-all group-hover:gap-2 group-hover:opacity-100">
                    {cat.productCount} productos
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}
