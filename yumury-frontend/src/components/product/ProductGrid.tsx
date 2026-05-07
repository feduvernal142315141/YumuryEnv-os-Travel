"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  emptySubMessage?: string;
  className?: string;
};

const SKELETON_COUNT = 8;

export function ProductGrid({
  products,
  loading = false,
  emptyMessage = "No hay productos que coincidan",
  emptySubMessage = "Prueba ajustando los filtros o explora otra categoría.",
  className,
}: ProductGridProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <PackageSearch className="h-9 w-9 text-foreground-muted" />
        </div>
        <p className="text-lg font-semibold text-foreground">{emptyMessage}</p>
        <p className="mt-1.5 max-w-xs text-sm text-foreground-muted">{emptySubMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.2,
              delay: Math.min(i * 0.04, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
