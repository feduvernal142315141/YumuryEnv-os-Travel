"use client";

import { mockOrders } from "@/lib/mock-data/orders";
import { OrderStatusBadge } from "@/components/tracking";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Search, Package } from "lucide-react";

type Tab = "active" | "delivered" | "all";

export default function PedidosPage() {
  const [tab, setTab] = useState<Tab>("active");
  const [search, setSearch] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesTab =
      tab === "all" ||
      (tab === "active" && order.status !== "delivered") ||
      (tab === "delivered" && order.status === "delivered");

    const matchesSearch =
      !search ||
      order.number.toLowerCase().includes(search.toLowerCase()) ||
      order.recipient.alias.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "active", label: "En tránsito", count: mockOrders.filter((o) => o.status !== "delivered").length },
    { key: "delivered", label: "Entregados", count: mockOrders.filter((o) => o.status === "delivered").length },
    { key: "all", label: "Todos", count: mockOrders.length },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-h2 font-bold text-foreground">Mis Pedidos</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Historial y seguimiento de tus envíos
        </p>
      </motion.div>

      {/* Search */}
      <div className="mt-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por número de pedido o destinatario..."
          className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 rounded-xl bg-background-secondary p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              tab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {t.label}
            <span className="ml-1.5 text-xs opacity-60">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="mt-6 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Package className="h-12 w-12 text-foreground-muted mb-3" />
            <p className="text-sm text-foreground-muted">No hay pedidos en esta categoría</p>
          </div>
        ) : (
          filteredOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/pedido/${order.id}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:scale-[1.01]"
              >
                {/* Thumbnails */}
                <div className="flex -space-x-2 shrink-0">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.productImage}
                      alt={item.productName}
                      className="h-11 w-11 rounded-lg border-2 border-card object-cover"
                    />
                  ))}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {order.number}
                    </p>
                    <OrderStatusBadge status={order.status} size="sm" />
                  </div>
                  <p className="mt-0.5 text-xs text-foreground-muted">
                    Para {order.recipient.alias} ·{" "}
                    {format(new Date(order.createdAt), "d MMM yyyy", { locale: es })}
                  </p>
                </div>

                {/* Total */}
                <span className="text-sm font-bold text-foreground font-mono shrink-0">
                  ${order.total.toFixed(2)}
                </span>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
