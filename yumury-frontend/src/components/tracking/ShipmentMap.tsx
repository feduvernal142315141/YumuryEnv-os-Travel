"use client";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import { motion } from "framer-motion";
import { Check, Plane, Ship } from "lucide-react";

type Props = {
  status: OrderStatus;
  shippingType?: "standard" | "express" | "maritime";
};

// Progress mapping: 0=Miami, 0.5=mid-flight, 1=Matanzas
function getProgress(status: OrderStatus): number {
  switch (status) {
    case "pending":
    case "confirmed":
    case "preparing":
      return 0;
    case "shipped":
      return 0.4;
    case "in-customs":
      return 0.6;
    case "in-warehouse":
      return 0.8;
    case "out-for-delivery":
      return 0.9;
    case "delivered":
      return 1;
    default:
      return 0;
  }
}

export function ShipmentMap({ status, shippingType = "standard" }: Props) {
  const progress = getProgress(status);
  const isMaritime = shippingType === "maritime";
  const isDelivered = status === "delivered";

  // Path coordinates: Miami (80,30) → curve → Havana (55,70) → Matanzas (70,75)
  const pathD = "M 80 30 C 70 45, 55 55, 55 70 C 55 72, 62 74, 70 75";
  const pathLength = 120; // approximate

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-4"
    >
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        Ruta del envío
      </h4>

      <svg
        viewBox="0 0 100 90"
        className="h-auto w-full max-h-[200px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Water background */}
        <rect width="100" height="90" rx="4" fill="currentColor" className="text-blue-50 dark:text-blue-950/30" />

        {/* Florida shape (simplified) */}
        <path
          d="M 72 5 L 90 5 L 92 15 L 88 25 L 82 35 L 78 32 L 74 20 Z"
          fill="currentColor"
          className="text-brand-green-100 dark:text-brand-green-900/40"
          stroke="currentColor"
          strokeWidth="0.5"
        />

        {/* Cuba shape (simplified) */}
        <path
          d="M 20 62 C 30 58, 50 60, 75 65 C 80 66, 82 68, 80 70 C 75 73, 50 76, 30 74 C 22 73, 18 68, 20 62 Z"
          fill="currentColor"
          className="text-brand-green-100 dark:text-brand-green-900/40"
          stroke="currentColor"
          strokeWidth="0.5"
        />

        {/* Route path (background - gray) */}
        <path
          d={pathD}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 2"
          className="text-border"
          fill="none"
        />

        {/* Route path (progress - green) */}
        <motion.path
          d={pathD}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-brand-green"
          fill="none"
          strokeDasharray={pathLength}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: pathLength * (1 - progress) }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />

        {/* Miami marker */}
        <circle cx="80" cy="30" r="3" fill="currentColor" className="text-brand-green" />
        <text x="80" y="26" textAnchor="middle" className="text-[3.5px] fill-foreground-secondary font-medium">
          Miami
        </text>

        {/* Matanzas marker */}
        <circle cx="70" cy="75" r="3" fill="currentColor" className={isDelivered ? "text-brand-green" : "text-border"} />
        <text x="70" y="81" textAnchor="middle" className="text-[3.5px] fill-foreground-secondary font-medium">
          Matanzas
        </text>

        {/* Havana reference */}
        <circle cx="55" cy="70" r="1.5" fill="currentColor" className="text-foreground-muted/50" />
        <text x="55" y="67" textAnchor="middle" className="text-[3px] fill-foreground-muted">
          Habana
        </text>

        {/* Moving marker (current position) */}
        {!isDelivered && progress > 0 && (
          <>
            <motion.circle
              cx={80 - progress * 10}
              cy={30 + progress * 45}
              r="4"
              fill="currentColor"
              className="text-brand-green"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.circle
              cx={80 - progress * 10}
              cy={30 + progress * 45}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-brand-green"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </>
        )}

        {/* Delivered check */}
        {isDelivered && (
          <circle cx="70" cy="75" r="4" fill="currentColor" className="text-brand-green" />
        )}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between text-xs text-foreground-muted">
        <span className="flex items-center gap-1">
          {isMaritime ? <Ship className="h-3 w-3" /> : <Plane className="h-3 w-3" />}
          {isMaritime ? "Vía marítima" : "Vía aérea"}
        </span>
        {isDelivered ? (
          <span className="flex items-center gap-1 text-brand-green font-medium">
            <Check className="h-3 w-3" /> Entregado
          </span>
        ) : (
          <span>{Math.round(progress * 100)}% completado</span>
        )}
      </div>
    </motion.div>
  );
}
