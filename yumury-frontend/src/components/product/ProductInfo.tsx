"use client";

import * as React from "react";
import Link from "next/link";
import {
  Star,
  Truck,
  ShieldCheck,
  Lock,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VariantSelector } from "@/components/product/VariantSelector";
import type { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils";

type ProductInfoProps = {
  product: Product;
  /** Forwarded ref attached to the CTA area, used by StickyAddToCart */
  mainCTARef?: React.RefObject<HTMLElement | null>;
};

export function ProductInfo({ product, mainCTARef }: ProductInfoProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | undefined>(
    product.variants?.[0],
  );
  const [qty, setQty] = React.useState(1);
  const [addedAnim, setAddedAnim] = React.useState(false);

  const unitPrice = product.price + (selectedVariant?.priceModifier ?? 0);
  const discount =
    product.comparePrice && product.comparePrice > unitPrice
      ? Math.round(((product.comparePrice - unitPrice) / product.comparePrice) * 100)
      : 0;

  const handleAdd = () => {
    addItem({ product, variant: selectedVariant, quantity: qty });
    toast.success("Añadido al carrito", { description: product.name });
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const stockLevel = product.stockLevel;
  const stockLabel =
    !product.inStock
      ? { text: "Agotado", color: "text-brand-red" }
      : stockLevel === "low"
        ? { text: "Pocas unidades", color: "text-brand-orange" }
        : { text: "En stock", color: "text-brand-green" };

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb category */}
      <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
        <Link href={`/categoria/${product.category}`} className="hover:text-primary transition-colors capitalize">
          {product.category}
        </Link>
        <span>›</span>
        <span className="capitalize">{product.subcategory.replace(/-/g, " ")}</span>
      </div>

      {/* Title */}
      <div>
        {product.brand && (
          <p className="mb-1 text-sm text-foreground-muted">{product.brand}</p>
        )}
        <h1 className="text-h2 font-bold text-foreground">{product.name}</h1>
      </div>

      {/* Rating */}
      {product.rating !== undefined && (
        <div className="flex items-center gap-2">
          <StarRow rating={product.rating} />
          <a
            href="#reviews"
            className="text-sm text-foreground-muted hover:text-primary transition-colors"
          >
            {product.reviewCount} reseñas
          </a>
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
        {product.isNew && <Badge variant="new">Nuevo</Badge>}
        {product.featured && !product.bestseller && <Badge variant="featured">Destacado</Badge>}
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="font-mono text-3xl font-bold tabular-nums text-foreground">
          ${unitPrice.toFixed(2)}
        </span>
        {product.comparePrice && product.comparePrice > unitPrice && (
          <span className="mb-0.5 font-mono text-lg text-foreground-muted line-through tabular-nums">
            ${product.comparePrice.toFixed(2)}
          </span>
        )}
        {discount > 0 && (
          <Badge variant="destructive" className="mb-0.5">
            −{discount}%
          </Badge>
        )}
      </div>

      {/* Stock */}
      <p className={cn("text-sm font-medium", stockLabel.color)}>
        {stockLabel.text}
      </p>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {variantTypeLabel(product.variants[0].type)}
            {selectedVariant && (
              <span className="ml-2 font-normal text-foreground-muted">
                {selectedVariant.name}
              </span>
            )}
          </label>
          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariant?.id}
            onSelect={setSelectedVariant}
          />
        </div>
      )}

      {/* Quantity + CTAs — ref used by StickyAddToCart */}
      <div
        ref={mainCTARef as React.RefObject<HTMLDivElement>}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground">Cantidad</label>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-l-lg text-foreground transition-colors hover:bg-muted disabled:opacity-40"
              disabled={qty <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center font-mono text-sm font-semibold tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-r-lg text-foreground transition-colors hover:bg-muted disabled:opacity-40"
              disabled={qty >= 10}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={cn(
            "w-full gap-2 bg-gradient-brand text-white shadow-md transition-all hover:shadow-lg hover:opacity-90",
            addedAnim && "scale-95",
          )}
        >
          <AnimatePresence mode="wait">
            {addedAnim ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                ✓ Añadido al carrito
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Añadir al carrito
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full gap-2"
          disabled={!product.inStock}
          asChild
        >
          <Link href="/checkout">
            <Zap className="h-4 w-4" />
            Comprar ahora
          </Link>
        </Button>
      </div>

      {/* Trust strip */}
      <div className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-muted/50 p-4">
        <TrustItem icon={<Truck className="h-4 w-4 text-primary" />}>
          Llega en {product.estimatedDelivery}
        </TrustItem>
        <TrustItem icon={<ShieldCheck className="h-4 w-4 text-primary" />}>
          Garantía Yumury de entrega
        </TrustItem>
        <TrustItem icon={<Lock className="h-4 w-4 text-primary" />}>
          Pago seguro y encriptado
        </TrustItem>
      </div>

      {/* Payment icons */}
      <div className="flex items-center gap-2 text-xs text-foreground-muted">
        <span>Aceptamos:</span>
        {["Visa", "MC", "Amex", "PayPal"].map((m) => (
          <span
            key={m}
            className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "h-4 w-4",
            s <= Math.round(rating)
              ? "fill-brand-yellow text-brand-yellow"
              : "fill-muted text-border",
          )}
        />
      ))}
      <span className="ml-1 text-sm font-semibold tabular-nums text-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function TrustItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-foreground">
      {icon}
      {children}
    </div>
  );
}

function variantTypeLabel(type: ProductVariant["type"]): string {
  const map: Record<ProductVariant["type"], string> = {
    weight: "Peso",
    size: "Tamaño",
    color: "Color",
    model: "Modelo",
    capacity: "Capacidad",
  };
  return map[type] ?? "Variante";
}
