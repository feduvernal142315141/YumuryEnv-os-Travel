"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, selectSubtotal, selectTotal, selectShippingFee } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUIStore();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const shipping = useCartStore(selectShippingFee);
  const total = useCartStore(selectTotal);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex flex-col p-0 w-full sm:max-w-md">
        {/* Header */}
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <ShoppingBag className="h-4 w-4 text-primary" />
            Tu carrito
            {items.length > 0 && (
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-10 w-10 text-foreground-muted" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-foreground-muted">
                Explora nuestros combos o el catálogo
              </p>
            </div>
            <Button asChild variant="outline" size="sm" onClick={() => setCartOpen(false)}>
              <Link href="/categoria/combos">
                Ver combos →
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 py-3">
              <AnimatePresence initial={false} mode="popLayout">
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} compact />
                  ))}
                </div>
              </AnimatePresence>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border bg-card px-5 py-4 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-foreground-muted">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground-muted text-xs">
                  <span>Envío estimado</span>
                  <span className="font-mono tabular-nums text-foreground-muted">
                    {shipping > 0 ? `$${shipping.toFixed(2)}` : "Calcular en checkout"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base text-foreground pt-0.5">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
                size="lg"
                onClick={() => setCartOpen(false)}
              >
                <Link href="/checkout">
                  Ir al checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full text-foreground-muted"
                onClick={() => setCartOpen(false)}
              >
                <Link href="/carrito">Ver carrito completo</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
