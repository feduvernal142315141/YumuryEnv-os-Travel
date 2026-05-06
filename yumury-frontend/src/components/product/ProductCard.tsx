"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Eye, Truck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  /** Layout variant */
  variant?: "default" | "compact";
  className?: string;
};

export function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : 0;

  const primaryBadge = product.bestseller
    ? { label: "Bestseller", variant: "bestseller" as const }
    : product.isNew
      ? { label: "Nuevo", variant: "new" as const }
      : product.featured
        ? { label: "Destacado", variant: "featured" as const }
        : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ product, quantity: 1 });
    toast.success("Añadido al carrito", {
      description: product.name,
    });
  };

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/producto/${product.slug}`} className="contents">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          />

          {/* Top-left primary badge */}
          {primaryBadge && (
            <Badge
              variant={primaryBadge.variant}
              className="absolute left-3 top-3 shadow-md"
            >
              {primaryBadge.label}
            </Badge>
          )}

          {/* Top-right discount */}
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute right-3 top-3 font-mono shadow-md"
            >
              −{discount}%
            </Badge>
          )}

          {/* Stock-out overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
              <Badge variant="outline" className="bg-background">
                Agotado
              </Badge>
            </div>
          )}

          {/* Hover quick actions (desktop) */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
            <Button
              size="sm"
              variant="default"
              className="pointer-events-auto h-9 flex-1 shadow-lg"
              onClick={handleAdd}
              disabled={!product.inStock}
            >
              <Plus className="h-4 w-4" /> Añadir
            </Button>
            <Button
              size="icon-sm"
              variant="secondary"
              className="pointer-events-auto h-9 w-9 shadow-lg"
              aria-label="Vista rápida"
              asChild
            >
              <span>
                <Eye className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>

        {/* Body */}
        <div
          className={cn(
            "flex flex-1 flex-col p-4",
            variant === "compact" ? "gap-1" : "gap-1.5",
          )}
        >
          {product.brand && (
            <span className="text-caption text-foreground-muted">{product.brand}</span>
          )}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {product.name}
          </h3>

          {product.rating !== undefined && (
            <div className="flex items-center gap-1 text-xs text-foreground-muted">
              <Star className="h-3 w-3 fill-brand-yellow text-brand-yellow" />
              <span className="font-medium tabular-nums text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <span>({product.reviewCount ?? 0})</span>
            </div>
          )}

          <div className="mt-auto flex items-end justify-between gap-2 pt-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold tabular-nums text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="font-mono text-xs text-foreground-muted line-through tabular-nums">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              aria-label={`Añadir ${product.name} al carrito`}
              disabled={!product.inStock}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all md:hidden",
                "hover:bg-primary-hover active:scale-95 disabled:opacity-50",
              )}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-foreground-muted">
            <Truck className="h-3 w-3" /> Llega en {product.estimatedDelivery}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  );
}
