"use client";

import * as React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { CartItem as CartItemType } from "@/lib/stores/cart-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CartItemProps = {
  item: CartItemType;
  compact?: boolean;
};

export function CartItem({ item, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleRemove = () => {
    removeItem(item.key);
    toast.success(`${item.name} eliminado del carrito`);
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      handleRemove();
    } else {
      updateQuantity(item.key, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (item.quantity >= 10) return;
    updateQuantity(item.key, item.quantity + 1);
  };

  const imgSize = compact ? 64 : 80;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-start gap-3 rounded-xl bg-background/50 p-3",
        compact ? "gap-2.5" : "gap-3",
      )}
    >
      {/* Thumbnail */}
      <div
        className="relative shrink-0 overflow-hidden rounded-lg bg-muted"
        style={{ width: imgSize, height: imgSize }}
      >
        <Image
          src={item.thumbnail}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Info + controls */}
      <div className="flex flex-1 flex-col gap-1.5 min-w-0">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {item.name}
        </p>
        {item.variantName && (
          <p className="text-xs text-foreground-muted">{item.variantName}</p>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Quantity stepper */}
          <div className="flex items-center rounded-full border border-border bg-background">
            <button
              onClick={handleDecrement}
              aria-label="Reducir cantidad"
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[24px] text-center text-sm font-semibold tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              aria-label="Aumentar cantidad"
              disabled={item.quantity >= 10}
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Item total + remove */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold tabular-nums">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={handleRemove}
              aria-label="Eliminar producto"
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
