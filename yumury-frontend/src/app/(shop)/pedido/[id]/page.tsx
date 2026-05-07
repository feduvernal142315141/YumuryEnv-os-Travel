"use client";

import { getOrderById } from "@/lib/mock-data/orders-helpers";
import { useAuthStore } from "@/lib/stores/auth-store";
import { TrackingHero, TrackingTimeline, ShipmentMap } from "@/components/tracking";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function PedidoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const id = params.id as string;

  useEffect(() => {
    if (!user) {
      router.push(`/auth/login?redirect=/pedido/${id}`);
    }
  }, [user, router, id]);

  const order = getOrderById(id);

  if (!user) return null;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-foreground">Pedido no encontrado</p>
        <p className="mt-1 text-sm text-foreground-muted">
          No pudimos encontrar el pedido #{id}
        </p>
        <Link href="/cuenta/pedidos" className="mt-4 text-sm text-primary hover:underline">
          Ver mis pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link
        href="/cuenta/pedidos"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Mis pedidos
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <TrackingHero order={order} />
          <ShipmentMap status={order.status} shippingType={order.items[0]?.productName?.includes("Moto") ? "maritime" : "standard"} />
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Seguimiento del envío
            </h3>
            <TrackingTimeline events={order.trackingEvents} />
          </div>
        </motion.div>

        {/* Right: Order info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:sticky lg:top-24 lg:self-start space-y-4"
        >
          {/* Products */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Productos ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-12 w-12 rounded-lg object-cover border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {item.variant && `${item.variant} · `}×{item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-foreground font-mono">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-foreground-secondary">
                <span>Subtotal</span>
                <span className="font-mono">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground-secondary">
                <span>Envío</span>
                <span className="font-mono">${order.shipping.toFixed(2)}</span>
              </div>
              {order.discount && (
                <div className="flex justify-between text-brand-green">
                  <span>Descuento</span>
                  <span className="font-mono">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-foreground pt-1.5 border-t border-border">
                <span>Total</span>
                <span className="font-mono">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Recipient */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Destinatario</h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{order.recipient.avatar}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{order.recipient.alias}</p>
                <p className="text-xs text-foreground-muted">{order.recipient.relationship}</p>
              </div>
            </div>
            <div className="text-xs text-foreground-secondary space-y-1">
              <p>
                {order.recipient.address.street} #{order.recipient.address.number}
              </p>
              {order.recipient.address.between && (
                <p>{order.recipient.address.between}</p>
              )}
              <p>{order.recipient.address.municipalityLabel}, Matanzas</p>
              <p className="pt-1">{order.recipient.phone}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Pago</h3>
            <div className="flex items-center gap-2 text-sm text-foreground-secondary">
              <CreditCard className="h-4 w-4 text-foreground-muted" />
              <span className="capitalize">{order.payment.brand}</span>
              <span>terminada en {order.payment.last4}</span>
            </div>
            <p className="mt-1 text-xs text-foreground-muted">
              Pagado: {format(new Date(order.createdAt), "d MMM yyyy, HH:mm", { locale: es })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
