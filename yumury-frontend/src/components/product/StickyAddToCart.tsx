"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { useIsMobile } from "@/lib/hooks/use-media-query";

type StickyAddToCartProps = {
  product: Product;
  /** Ref to the main CTA button — bar appears when this is out of view */
  mainCTARef: React.RefObject<HTMLElement | null>;
};

export function StickyAddToCart({ product, mainCTARef }: StickyAddToCartProps) {
  const isMobile = useIsMobile();
  const addItem = useCartStore((s) => s.addItem);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = mainCTARef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mainCTARef]);

  if (!isMobile) return null;

  const handleAdd = () => {
    addItem({ product, quantity: 1 });
    toast.success("Añadido al carrito", { description: product.name });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 border-t border-border-subtle bg-background/95 p-3 backdrop-blur-md safe-area-inset-bottom"
        >
          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            {/* Name + price */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
              <p className="font-mono text-sm font-bold tabular-nums text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* CTA */}
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={!product.inStock}
              className="shrink-0 gap-1.5 bg-gradient-brand text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              Añadir
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
