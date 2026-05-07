"use client";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  Shield,
  MapPin,
  Warehouse,
} from "lucide-react";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  confirmed: {
    label: "Confirmado",
    icon: CheckCircle2,
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  preparing: {
    label: "Preparando",
    icon: Package,
    className: "bg-brand-orange-50 text-brand-orange-deep dark:bg-brand-orange/10 dark:text-brand-orange-light",
  },
  shipped: {
    label: "En tránsito",
    icon: Truck,
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  "in-customs": {
    label: "En aduana",
    icon: Shield,
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  "in-warehouse": {
    label: "En almacén",
    icon: Warehouse,
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  "out-for-delivery": {
    label: "En reparto",
    icon: MapPin,
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  delivered: {
    label: "Entregado",
    icon: CheckCircle2,
    className: "bg-brand-green-100 text-brand-green-700 dark:bg-brand-green/10 dark:text-brand-green-light",
  },
  incident: {
    label: "Incidente",
    icon: Shield,
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
};

type Props = {
  status: OrderStatus;
  size?: "sm" | "md" | "lg";
};

export function OrderStatusBadge({ status, size = "md" }: Props) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-sm gap-2",
  };

  const iconSizes = { sm: "h-3 w-3", md: "h-3.5 w-3.5", lg: "h-4 w-4" };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        sizeClasses[size],
        config.className
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
}
