"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SearchX, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptySearchProps = {
  query?: string;
};

const popularProducts = [
  { label: "Arroz", href: "/buscar?q=arroz" },
  { label: "Combos", href: "/categoria/combos" },
  { label: "Motos eléctricas", href: "/categoria/vehiculos" },
  { label: "Electrodomésticos", href: "/categoria/electrodomesticos" },
];

export function EmptySearch({ query }: EmptySearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-16 px-4 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange-50 dark:bg-brand-orange/10">
        <SearchX className="h-10 w-10 text-brand-orange" />
      </div>

      <h3 className="mt-6 text-h4 font-bold text-foreground">
        No encontramos resultados
        {query && (
          <>
            {" "}para &ldquo;<span className="text-primary">{query}</span>&rdquo;
          </>
        )}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-foreground-secondary">
        Revisa la ortografía o prueba con otros términos. También puedes
        explorar nuestras categorías.
      </p>

      <div className="mt-6">
        <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide mb-3">
          Productos populares
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularProducts.map((p) => (
            <Link
              key={p.label}
              href={p.href}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary hover:shadow-sm"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/categoria/alimentos">
          Ver todo el catálogo <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
