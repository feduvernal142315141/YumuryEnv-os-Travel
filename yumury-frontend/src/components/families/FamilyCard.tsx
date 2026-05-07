"use client";

import { cn } from "@/lib/utils";
import type { Family } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  MapPin,
  Phone,
  AlertTriangle,
  Package,
  RotateCcw,
  History,
  Pencil,
} from "lucide-react";

type FamilyCardProps = {
  family: Family;
  index?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onReorder?: () => void;
};

export function FamilyCard({
  family,
  index = 0,
  onEdit,
  onReorder,
}: FamilyCardProps) {
  const lastOrderText = family.stats?.lastOrderDate
    ? `Último envío: ${formatDistanceToNow(new Date(family.stats.lastOrderDate), { addSuffix: true, locale: es })}`
    : "Sin envíos aún";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card p-6",
        "shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out"
      )}
    >
      {/* Avatar */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow-50 to-brand-orange-50 text-4xl dark:from-brand-green-900/30 dark:to-brand-orange/10">
        {family.avatar}
      </div>

      {/* Name & relationship */}
      <h3 className="text-center text-lg font-bold text-foreground">
        {family.alias}
      </h3>
      <p className="mt-0.5 text-center text-sm text-foreground-secondary">
        {family.relationship}
        {family.age ? ` · ${family.age} años` : ""}
      </p>

      {/* Address */}
      <div className="mt-4 flex items-start gap-2 text-sm text-foreground-secondary">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" />
        <span>
          {family.address.municipalityLabel} · {family.address.street} #{family.address.number}
        </span>
      </div>

      {/* Phone */}
      <div className="mt-2 flex items-center gap-2 text-sm text-foreground-secondary">
        <Phone className="h-4 w-4 shrink-0 text-foreground-muted" />
        <span>{family.phone}</span>
      </div>

      {/* Alert badges */}
      {family.alerts && family.alerts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {family.alerts.map((alert) => (
            <span
              key={alert}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                alert.toLowerCase().includes("diabét")
                  ? "bg-brand-red-50 text-brand-red-deep dark:bg-brand-red/10 dark:text-brand-red-light"
                  : "bg-brand-orange-50 text-brand-orange-deep dark:bg-brand-orange/10 dark:text-brand-orange-light"
              )}
            >
              <AlertTriangle className="h-3 w-3" />
              {alert}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-xs text-foreground-muted">{lastOrderText}</p>
        {family.stats && (
          <p className="mt-0.5 text-xs text-foreground-muted">
            <Package className="mr-1 inline h-3 w-3" />
            {family.stats.totalOrdersReceived} pedidos · ${family.stats.totalReceived.toFixed(0)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onReorder}
          className="flex-1 rounded-lg bg-gradient-to-r from-brand-yellow to-brand-orange px-3 py-2 text-xs font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
        >
          <RotateCcw className="mr-1 inline h-3.5 w-3.5" />
          Reordenar
        </button>
        <Link
          href={`/cuenta/familias/${family.id}`}
          className="flex items-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground-secondary transition-colors hover:bg-card-hover"
        >
          <History className="mr-1 h-3.5 w-3.5" />
          Historial
        </Link>
        <button
          onClick={onEdit}
          className="flex items-center rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground-secondary transition-colors hover:bg-card-hover"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
