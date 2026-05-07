"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Shield, Clock } from "lucide-react";
import { useCartStore, selectSubtotal, selectTotal } from "@/lib/stores/cart-store";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SHIPPING_LABELS: Record<string, string> = {
  standard: "Envío Estándar",
  express: "Envío Express",
  maritime: "Envío Marítimo",
};

export function OrderSummary({ className }: { className?: string }) {
  const [expanded, setExpanded] = React.useState(true);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const shipping = useCheckoutStore((s) => s.shipping);

  const shippingFee = shipping?.fee ?? 0;
  const total = subtotal + shippingFee;

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-sm", className)}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between text-sm font-bold md:cursor-default"
        aria-expanded={expanded}
      >
        <span>Resumen del pedido</span>
        <span className="md:hidden">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      <div className={cn("mt-4", !expanded && "hidden md:block")}>
        {/* Items */}
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                  {item.quantity}
                </span>
              </div>
              <div className="flex flex-1 items-start justify-between gap-2 min-w-0">
                <p className="line-clamp-1 text-xs font-medium text-foreground">{item.name}</p>
                <span className="shrink-0 font-mono text-xs tabular-nums">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Separator className="mb-3" />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-foreground-muted">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-foreground-muted">
            <span>{shipping ? SHIPPING_LABELS[shipping.type] : "Envío"}</span>
            <span className="font-mono tabular-nums">
              {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "—"}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-base pt-1">
            <span>Total</span>
            <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-4 flex flex-col gap-1.5 text-xs text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Pago 100% seguro · SSL cifrado
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Llega en 5-7 días hábiles (estándar)
          </span>
        </div>
      </div>
    </div>
  );
}
