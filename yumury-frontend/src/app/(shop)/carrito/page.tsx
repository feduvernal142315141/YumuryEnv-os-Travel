"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShoppingBag, Tag, Shield, Clock, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { useCartStore, selectSubtotal, selectShippingFee, selectTotal } from "@/lib/stores/cart-store";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { allProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";

const VALID_COUPON = "YUMURY10";
const COUPON_DISCOUNT = 0.10;

export default function CarritoPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const shipping = useCartStore(selectShippingFee);
  const total = useCartStore(selectTotal);

  const [couponInput, setCouponInput] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);
  const [couponError, setCouponError] = React.useState("");

  const discount = appliedCoupon ? subtotal * COUPON_DISCOUNT : 0;
  const finalTotal = total - discount;

  const crossSell = allProducts
    .filter((p) => p.inStock && p.bestseller)
    .slice(0, 4);

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === VALID_COUPON) {
      setAppliedCoupon(VALID_COUPON);
      setCouponError("");
      toast.success("Cupón YUMURY10 aplicado — 10% de descuento");
    } else {
      setCouponError("Cupón inválido. Prueba YUMURY10");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center px-4">
        <div className="rounded-full bg-muted p-8">
          <ShoppingBag className="h-14 w-14 text-foreground-muted" />
        </div>
        <div>
          <h1 className="text-h2 font-bold">Tu carrito está vacío</h1>
          <p className="mt-2 text-foreground-muted max-w-sm mx-auto">
            Empieza explorando nuestro catálogo o deja que Yumi te ayude a elegir.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/categoria/alimentos">Ver catálogo</Link>
          </Button>
          <Button asChild className="bg-gradient-brand text-white hover:opacity-90">
            <Link href="/categoria/combos">Explorar combos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6 md:py-12">
      {/* Page header */}
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="text-foreground-muted">
          <Link href="/categoria/alimentos">
            <ArrowLeft className="h-4 w-4 mr-1" /> Seguir comprando
          </Link>
        </Button>
        <h1 className="text-h2 font-bold">
          Tu carrito
          <span className="ml-2 text-base font-normal text-foreground-muted">
            ({items.reduce((acc, i) => acc + i.quantity, 0)} productos)
          </span>
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left — items */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
            <AnimatePresence initial={false} mode="popLayout">
              <div className="flex flex-col divide-y divide-border">
                {items.map((item) => (
                  <div key={item.key} className="py-4 first:pt-0 last:pb-0">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Shield, label: "Pago seguro" },
              { icon: Clock, label: "Entrega 5-7 días" },
              { icon: Star, label: "Garantía Yumury" },
              { icon: Tag, label: "Precio justo" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs text-foreground-muted"
              >
                <Icon className="h-4 w-4 text-primary shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right — summary (sticky on desktop) */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-base font-bold mb-4">Resumen del pedido</h2>

            {/* Coupon */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-1.5 block">Cupón de descuento</label>
              <div className="flex gap-2">
                <Input
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  placeholder="YUMURY10"
                  className="font-mono uppercase"
                  disabled={!!appliedCoupon}
                />
                {appliedCoupon ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponInput("");
                    }}
                  >
                    Quitar
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
                    Aplicar
                  </Button>
                )}
              </div>
              {couponError && <p className="mt-1 text-xs text-destructive">{couponError}</p>}
              {appliedCoupon && (
                <p className="mt-1 text-xs text-primary font-medium">
                  ✓ Cupón aplicado — 10% de descuento
                </p>
              )}
            </div>

            <Separator className="mb-4" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-foreground-muted">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary font-medium">
                  <span>Descuento (YUMURY10)</span>
                  <span className="font-mono tabular-nums">−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-foreground-muted">
                <span>Envío estimado</span>
                <span className="font-mono tabular-nums">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold pt-1">
                <span>Total</span>
                <span className="font-mono tabular-nums">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-5 w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
            >
              <Link href="/checkout">
                Continuar al checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Trust strip */}
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-foreground-muted">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-primary" /> Pago seguro
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-brand-yellow" /> Garantía Yumury
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-sell */}
      {crossSell.length > 0 && (
        <section className="mt-16">
          <h2 className="text-h3 font-bold mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {crossSell.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
