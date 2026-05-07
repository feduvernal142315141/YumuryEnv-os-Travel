"use client";

import { useFamiliesStore, selectFamilyById } from "@/lib/stores/families-store";
import { mockOrders } from "@/lib/mock-data/orders";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { format, differenceInDays, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  MapPin,
  Phone,
  AlertTriangle,
  Heart,
  Cake,
  Package,
  Pencil,
  Trash2,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  confirmed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  preparing: "bg-brand-orange-50 text-brand-orange-deep dark:bg-brand-orange/10 dark:text-brand-orange-light",
  shipped: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "in-customs": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "in-warehouse": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "out-for-delivery": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  delivered: "bg-brand-green-100 text-brand-green-700 dark:bg-brand-green/10 dark:text-brand-green-light",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  shipped: "En tránsito",
  "in-customs": "En aduana",
  "in-warehouse": "En almacén",
  "out-for-delivery": "En reparto",
  delivered: "Entregado",
};

export default function FamilyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const family = useFamiliesStore(selectFamilyById(id));
  const deleteFamily = useFamiliesStore((s) => s.deleteFamily);

  if (!family) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-foreground-muted">Familia no encontrada</p>
        <Link href="/cuenta/familias" className="mt-4 text-sm text-primary hover:underline">
          Volver a Mis Familias
        </Link>
      </div>
    );
  }

  const familyOrders = mockOrders.filter((o) => o.recipient.id === family.id);

  const daysUntilBirthday = family.birthday
    ? (() => {
        const now = new Date();
        const bday = new Date(family.birthday);
        const thisYear = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
        if (thisYear < now) thisYear.setFullYear(now.getFullYear() + 1);
        return differenceInDays(thisYear, now);
      })()
    : null;

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar a ${family.alias}? Esta acción no se puede deshacer.`)) {
      deleteFamily(family.id);
      toast.success(`${family.alias} eliminado`);
      router.push("/cuenta/familias");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-foreground-muted">
        <Link href="/cuenta/familias" className="hover:text-foreground transition-colors">
          Mis Familias
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{family.alias}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow-50 to-brand-orange-50 text-5xl dark:from-brand-green-900/30 dark:to-brand-orange/10">
                {family.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-h3 font-bold text-foreground">{family.alias}</h1>
                <p className="text-foreground-secondary">
                  {family.fullName} · {family.relationship}
                  {family.age ? ` · ${family.age} años` : ""}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 text-foreground-muted shrink-0" />
                <span className="text-foreground-secondary">
                  {family.address.street} #{family.address.number}
                  {family.address.between ? `, ${family.address.between}` : ""}
                  <br />
                  {family.address.municipalityLabel}, {family.address.province}
                  {family.address.reference && (
                    <span className="block text-foreground-muted italic mt-0.5">
                      Ref: {family.address.reference}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-foreground-muted" />
                <span className="text-foreground-secondary">
                  {family.phone}
                  {family.altPhone && ` · ${family.altPhone}`}
                </span>
              </div>
            </div>

            {family.alerts && family.alerts.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {family.alerts.map((alert) => (
                  <span
                    key={alert}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-red-50 px-3 py-1 text-xs font-medium text-brand-red-deep dark:bg-brand-red/10 dark:text-brand-red-light"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {alert}
                  </span>
                ))}
              </div>
            )}

            {family.preferences && family.preferences.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {family.preferences.map((pref) => (
                  <span
                    key={pref}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-green-50 px-3 py-1 text-xs font-medium text-brand-green-deep dark:bg-brand-green/10 dark:text-brand-green-light"
                  >
                    <Heart className="h-3 w-3" />
                    {pref}
                  </span>
                ))}
              </div>
            )}

            {family.notes && (
              <p className="mt-4 rounded-lg bg-background-secondary p-3 text-sm text-foreground-secondary italic">
                {family.notes}
              </p>
            )}
          </div>

          {/* Order history */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Historial de envíos
            </h2>
            {familyOrders.length === 0 ? (
              <p className="text-sm text-foreground-muted">
                No hay envíos registrados para {family.alias}
              </p>
            ) : (
              <div className="space-y-3">
                {familyOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/pedido/${order.id}`}
                    className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-card-hover"
                  >
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, i) => (
                        <img
                          key={i}
                          src={item.productImage}
                          alt={item.productName}
                          className="h-10 w-10 rounded-lg border-2 border-card object-cover"
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {order.number}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {format(new Date(order.createdAt), "d MMM yyyy", { locale: es })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        STATUS_COLORS[order.status]
                      )}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      ${order.total.toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Quick actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4 lg:sticky lg:top-24 lg:self-start"
        >
          {/* Birthday card */}
          {daysUntilBirthday !== null && daysUntilBirthday <= 30 && (
            <div className="rounded-xl border border-brand-orange-100 bg-brand-orange-50/50 p-4 dark:border-brand-orange/20 dark:bg-brand-orange/5">
              <div className="flex items-center gap-2">
                <Cake className="h-5 w-5 text-brand-orange" />
                <span className="text-sm font-medium text-brand-orange-deep dark:text-brand-orange-light">
                  {daysUntilBirthday === 0
                    ? "¡Hoy es su cumpleaños!"
                    : `Cumpleaños en ${daysUntilBirthday} días`}
                </span>
              </div>
            </div>
          )}

          {/* Stats */}
          {family.stats && (
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground-secondary">
                Estadísticas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {family.stats.totalOrdersReceived}
                  </p>
                  <p className="text-xs text-foreground-muted">Pedidos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    ${family.stats.totalReceived.toFixed(0)}
                  </p>
                  <p className="text-xs text-foreground-muted">Total</p>
                </div>
              </div>
              {family.stats.lastOrderDate && (
                <p className="mt-3 text-center text-xs text-foreground-muted">
                  Último envío:{" "}
                  {formatDistanceToNow(new Date(family.stats.lastOrderDate), {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => {
                toast.success(`Reordenando último pedido de ${family.alias}...`);
                router.push("/carrito");
              }}
              className="w-full rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red px-4 py-3 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
            >
              <RotateCcw className="mr-2 inline h-4 w-4" />
              Reordenar último pedido
            </button>
            <Link
              href={`/cuenta/familias/${family.id}/editar`}
              className="flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground-secondary transition-colors hover:bg-card-hover"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar datos
            </Link>
            <button
              onClick={handleDelete}
              className="flex w-full items-center justify-center rounded-xl border border-destructive/30 px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar familiar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
