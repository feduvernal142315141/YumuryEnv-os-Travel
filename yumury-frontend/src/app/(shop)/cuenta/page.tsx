"use client";

import { useAuthStore, useFamiliesStore } from "@/lib/stores";
import { mockOrders } from "@/lib/mock-data/orders";
import { OrderStatusBadge } from "@/components/tracking";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Package,
  DollarSign,
  Users,
  Truck,
  LayoutDashboard,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  RotateCcw,
  UserPlus,
  MapPin,
  MessageCircle,
  ArrowRight,
  Lock,
  Mail,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated counter component                                        */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplayValue(Number(v)));
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => {
      unsub();
      controls.stop();
    };
  }, [value, motionValue, rounded, duration, decimals]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : displayValue}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar navigation items                                          */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { key: "resumen", label: "Resumen", icon: LayoutDashboard, href: "/cuenta" },
  { key: "pedidos", label: "Pedidos", icon: Package, href: "/cuenta/pedidos" },
  { key: "familias", label: "Familias", icon: Heart, href: "/cuenta/familias" },
  {
    key: "configuracion",
    label: "Configuraci\u00f3n",
    icon: Settings,
    href: "/cuenta/configuracion",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Login prompt (shown when no user)                                 */
/* ------------------------------------------------------------------ */
function LoginPrompt() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-lg"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mt-5 text-h4 font-bold text-foreground">
          Inicia sesi&oacute;n para continuar
        </h2>
        <p className="mt-2 text-sm text-foreground-secondary">
          Accede a tu cuenta para ver tus pedidos, familias y m&aacute;s.
        </p>
        <Button asChild className="mt-6 w-full" size="lg">
          <Link href="/auth/login">
            <Mail className="mr-2 h-4 w-4" />
            Iniciar sesi&oacute;n
          </Link>
        </Button>
        <p className="mt-4 text-xs text-foreground-muted">
          &iquest;No tienes cuenta?{" "}
          <Link href="/auth/registro" className="text-primary hover:underline">
            Reg&iacute;strate gratis
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main dashboard component                                          */
/* ------------------------------------------------------------------ */
export default function CuentaPage() {
  const { user, logout } = useAuthStore();
  const { families } = useFamiliesStore();
  const router = useRouter();

  // Hydration guard for Zustand persisted stores
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-12 sm:px-6">
        <div className="h-8 w-48 rounded-lg bg-card" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-card" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return <LoginPrompt />;

  const firstName = user.name.split(" ")[0];
  const activeOrders = mockOrders.filter((o) => o.status !== "delivered");
  const recentOrders = mockOrders.slice(0, 3);

  const stats = [
    {
      label: "Total pedidos",
      value: user.totalOrders,
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total enviado",
      value: user.totalSpent,
      icon: DollarSign,
      prefix: "$",
      decimals: 2,
      color: "text-brand-green",
      bgColor: "bg-brand-green/10",
    },
    {
      label: "Familias guardadas",
      value: families.length,
      icon: Users,
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/10",
    },
    {
      label: "Pedidos activos",
      value: activeOrders.length,
      icon: Truck,
      color: "text-brand-red",
      bgColor: "bg-brand-red/10",
    },
  ];

  const quickActions = [
    {
      label: "Reordenar \u00faltimo pedido",
      description: "Vuelve a pedir lo mismo en un clic",
      icon: RotateCcw,
      href: "/carrito",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "A\u00f1adir nueva familia",
      description: "Agrega un nuevo destinatario",
      icon: UserPlus,
      href: "/cuenta/familias/nueva",
      color: "text-brand-orange",
      bgColor: "bg-brand-orange/10",
    },
    {
      label: "Ver tracking activo",
      description: "Sigue tus env\u00edos en tiempo real",
      icon: MapPin,
      href: activeOrders[0]
        ? `/pedido/${activeOrders[0].id}`
        : "/cuenta/pedidos",
      color: "text-brand-green",
      bgColor: "bg-brand-green/10",
    },
    {
      label: "Hablar con Yumi",
      description: "Asistente virtual 24/7",
      icon: MessageCircle,
      href: "/yumi",
      color: "text-brand-yellow",
      bgColor: "bg-brand-yellow/10",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* ============================================ */}
        {/* LEFT SIDEBAR                                 */}
        {/* ============================================ */}
        <aside className="shrink-0 lg:sticky lg:top-24 lg:h-fit lg:w-56">
          {/* Mobile: horizontal scroll nav */}
          <div className="lg:hidden">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
              {/* Avatar chip */}
              <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
                <span className="text-xl">{user.avatar}</span>
                <span className="text-sm font-semibold text-foreground">
                  {firstName}
                </span>
              </div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    item.key === "resumen"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: vertical sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="hidden rounded-2xl border border-border bg-card p-5 shadow-sm lg:block"
          >
            {/* Avatar & info */}
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl">{user.avatar}</span>
              <h3 className="mt-2 text-sm font-bold text-foreground">
                {user.name}
              </h3>
              <p className="mt-0.5 text-xs text-foreground-muted truncate max-w-full">
                {user.email}
              </p>
            </div>

            {/* Nav links */}
            <nav className="mt-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    item.key === "resumen"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground-secondary hover:bg-card-hover hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-6 border-t border-border pt-4">
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesi&oacute;n
              </button>
            </div>
          </motion.div>
        </aside>

        {/* ============================================ */}
        {/* MAIN CONTENT                                 */}
        {/* ============================================ */}
        <main className="min-w-0 flex-1">
          {/* ---- Welcome card ---- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-gradient-to-br from-primary/5 via-card to-brand-yellow/5 border border-border p-6 shadow-sm"
          >
            <h1 className="text-h3 font-bold text-foreground">
              &iexcl;Hola, {firstName}!{" "}
              <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">
                &#x1F44B;
              </span>
            </h1>
            <p className="mt-1 text-sm text-foreground-secondary">
              Bienvenido de vuelta a Yumury Env&iacute;os. Aqu&iacute; tienes un
              resumen de tu actividad.
            </p>
          </motion.div>

          {/* ---- Stats grid ---- */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      stat.bgColor
                    )}
                  >
                    <Icon className={cn("h-4.5 w-4.5", stat.color)} />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      decimals={stat.decimals}
                      duration={1.4}
                    />
                  </p>
                  <p className="mt-0.5 text-xs text-foreground-muted">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ---- Pedidos recientes ---- */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-h5 font-bold text-foreground">
                Pedidos recientes
              </h2>
              <Link
                href="/cuenta/pedidos"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Ver todos
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {recentOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.55 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={`/pedido/${order.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20"
                  >
                    {/* Product thumbnails */}
                    <div className="flex -space-x-2 shrink-0">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.productImage}
                          alt={item.productName}
                          className="h-11 w-11 rounded-xl border-2 border-card object-cover"
                        />
                      ))}
                    </div>

                    {/* Order info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {order.number}
                        </p>
                        <OrderStatusBadge status={order.status} size="sm" />
                      </div>
                      <p className="mt-0.5 text-xs text-foreground-muted">
                        Para {order.recipient.alias} &middot;{" "}
                        {format(new Date(order.createdAt), "d MMM yyyy", {
                          locale: es,
                        })}
                      </p>
                      {order.estimatedDelivery &&
                        order.status !== "delivered" && (
                          <p className="mt-0.5 text-xs text-foreground-muted">
                            Entrega estimada:{" "}
                            {format(
                              new Date(order.estimatedDelivery),
                              "d MMM",
                              { locale: es }
                            )}
                          </p>
                        )}
                    </div>

                    {/* Price */}
                    <span className="shrink-0 text-sm font-bold text-foreground font-mono">
                      ${order.total.toFixed(2)}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ---- Acciones rapidas ---- */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <h2 className="text-h5 font-bold text-foreground">
              Acciones r&aacute;pidas
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                        action.bgColor
                      )}
                    >
                      <Icon className={cn("h-5 w-5", action.color)} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {action.label}
                    </p>
                    <p className="mt-0.5 text-xs text-foreground-muted">
                      {action.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.section>

          {/* ---- Mis familias preview ---- */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-h5 font-bold text-foreground">
                Mis Familias
              </h2>
              <Link
                href="/cuenta/familias"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Ver todas
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {families.length === 0 ? (
              <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 py-12">
                <Users className="h-10 w-10 text-foreground-muted" />
                <p className="mt-3 text-sm font-medium text-foreground-secondary">
                  A&uacute;n no tienes familias guardadas
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href="/cuenta/familias/nueva">
                    <UserPlus className="mr-1.5 h-4 w-4" />
                    A&ntilde;adir familia
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {families.slice(0, 3).map((family, i) => (
                  <motion.div
                    key={family.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.75 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={`/cuenta/familias/${family.id}`}
                      className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        {family.avatar}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {family.alias}
                        </p>
                        <p className="text-xs text-foreground-muted truncate">
                          {family.address.municipalityLabel} &middot;{" "}
                          {family.relationship}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* ---- Mobile logout ---- */}
          <div className="mt-10 border-t border-border pt-6 lg:hidden">
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesi&oacute;n
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
