"use client";

import { cn } from "@/lib/utils";
import type { Order } from "@/types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Share2, MessageCircle } from "lucide-react";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ShareTrackingButton } from "./ShareTrackingButton";
import { useState } from "react";

type Props = {
  order: Order;
  isPublic?: boolean;
};

export function TrackingHero({ order, isPublic = false }: Props) {
  const [showShare, setShowShare] = useState(false);

  const etaDate = new Date(order.estimatedDelivery);
  const etaFormatted = format(etaDate, "EEEE d 'de' MMMM", { locale: es });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green-50/50 to-transparent dark:from-brand-green-900/10 dark:to-transparent" />

      <div className="relative">
        {/* Status + Order number */}
        <div className="flex flex-wrap items-center gap-3">
          <OrderStatusBadge status={order.status} size="lg" />
          <span className="text-sm text-foreground-muted">
            {order.number}
          </span>
        </div>

        {/* ETA */}
        {order.status !== "delivered" && (
          <p className="mt-3 text-lg font-semibold text-foreground">
            Llega el {etaFormatted}
          </p>
        )}
        {order.status === "delivered" && (
          <p className="mt-3 text-lg font-semibold text-brand-green">
            ¡Pedido entregado! ✓
          </p>
        )}

        {/* Recipient */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl">{order.recipient.avatar}</span>
          <span className="text-sm text-foreground-secondary">
            Para <strong>{order.recipient.alias}</strong> en{" "}
            {order.recipient.address.municipalityLabel}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:bg-card-hover"
          >
            <Share2 className="h-4 w-4" />
            Compartir tracking
          </button>
          {!isPublic && (
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:bg-card-hover">
              <MessageCircle className="h-4 w-4" />
              Contactar soporte
            </button>
          )}
        </div>
      </div>

      {showShare && (
        <ShareTrackingButton
          publicTrackingId={order.publicTrackingId}
          recipientAlias={order.recipient.alias}
          onClose={() => setShowShare(false)}
        />
      )}
    </motion.div>
  );
}
