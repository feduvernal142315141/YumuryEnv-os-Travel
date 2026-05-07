"use client";

import { getOrderByPublicId } from "@/lib/mock-data/orders-helpers";
import { TrackingHero, TrackingTimeline, ShipmentMap } from "@/components/tracking";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";

export default function PublicTrackingPage() {
  const params = useParams();
  const publicId = params.publicId as string;
  const order = getOrderByPublicId(publicId);

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <Package className="h-16 w-16 text-foreground-muted mb-4" />
        <h1 className="text-xl font-bold text-foreground">Envío no encontrado</h1>
        <p className="mt-2 text-sm text-foreground-secondary text-center">
          El link de seguimiento no es válido o ha expirado.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md"
        >
          Conoce Yumury
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-green to-brand-green-light">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            Yumury · Seguimiento de envío
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <TrackingHero order={order} isPublic />
          <ShipmentMap status={order.status} />

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Estado del envío
            </h3>
            <TrackingTimeline events={order.trackingEvents} />
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-foreground-secondary mb-3">
              ¿Quieres enviar tú también a Matanzas?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
            >
              Conoce Yumury →
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
