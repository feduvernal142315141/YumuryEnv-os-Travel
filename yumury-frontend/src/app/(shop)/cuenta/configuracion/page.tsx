"use client";

import { useAuthStore, useFamiliesStore } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  Heart,
  Settings,
  LogOut,
  User,
  Bell,
  Globe,
  Shield,
  AlertTriangle,
  Download,
  Trash2,
  Lock,
  Mail,
} from "lucide-react";

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
/*  Toggle switch component                                           */
/* ------------------------------------------------------------------ */
function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl px-1 py-3 text-left transition-colors hover:bg-card-hover"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-foreground-muted">{description}</p>
        )}
      </div>
      <div
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
          checked ? "bg-primary" : "bg-foreground-muted/30"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-[22px]" : "translate-x-[2px]"
          )}
        />
      </div>
    </button>
  );
}

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
/*  Main settings page                                                */
/* ------------------------------------------------------------------ */
export default function ConfiguracionPage() {
  const { user, logout } = useAuthStore();
  const { families } = useFamiliesStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Hydration guard for Zustand persisted stores
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // --- Form state: Informaci\u00f3n personal ---
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("********");

  // --- Notification toggles ---
  const [emailPedido, setEmailPedido] = useState(true);
  const [smsTracking, setSmsTracking] = useState(true);
  const [promociones, setPromociones] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [digestFreq, setDigestFreq] = useState("semanal");

  // --- Idioma y regi\u00f3n ---
  const [language, setLanguage] = useState("es");

  // --- Privacidad ---
  const [showTestimonios, setShowTestimonios] = useState(true);
  const [shareData, setShareData] = useState(true);

  // --- Delete account dialog ---
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Sync form state with user data once hydrated
  useEffect(() => {
    if (user) {
      setNombre(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // --- Loading skeleton ---
  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-12 sm:px-6">
        <div className="h-8 w-48 rounded-lg bg-card" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-card" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return <LoginPrompt />;

  const firstName = user.name.split(" ")[0];

  function handleSave() {
    toast("Cambios guardados", {
      description: "Tu configuraci\u00f3n ha sido actualizada.",
    });
  }

  function handleDeleteAccount() {
    if (deleteConfirmText !== "ELIMINAR") return;
    logout();
    setDeleteDialogOpen(false);
    toast("Cuenta eliminada", {
      description: "Tu cuenta ha sido eliminada exitosamente.",
    });
    router.push("/");
  }

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
                    item.key === "configuracion"
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
                    item.key === "configuracion"
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
          {/* ---- Page header ---- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-h3 font-bold text-foreground">
              Configuraci&oacute;n
            </h1>
            <p className="mt-1 text-sm text-foreground-secondary">
              Administra tu cuenta, notificaciones y preferencias.
            </p>
          </motion.div>

          {/* ---- Accordion sections ---- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <Accordion
              type="multiple"
              defaultValue={["personal"]}
              className="rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* ================================================ */}
              {/* 1. Informaci\u00f3n personal                              */}
              {/* ================================================ */}
              <AccordionItem value="personal" className="border-b border-border px-5 sm:px-6">
                <AccordionTrigger className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                      <User className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      Informaci&oacute;n personal
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 pb-2">
                    {/* Avatar display */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          Miembro desde{" "}
                          {new Date(user.joinedAt).toLocaleDateString("es-ES", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Name field */}
                    <div className="space-y-2">
                      <Label htmlFor="settings-nombre">Nombre</Label>
                      <Input
                        id="settings-nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-2">
                      <Label htmlFor="settings-email">Email</Label>
                      <Input
                        id="settings-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                      />
                    </div>

                    {/* Password field (masked) */}
                    <div className="space-y-2">
                      <Label htmlFor="settings-password">
                        Contrase&ntilde;a
                      </Label>
                      <Input
                        id="settings-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                      />
                    </div>

                    <Button onClick={handleSave} size="sm">
                      Guardar cambios
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* ================================================ */}
              {/* 2. Notificaciones                                 */}
              {/* ================================================ */}
              <AccordionItem value="notifications" className="border-b border-border px-5 sm:px-6">
                <AccordionTrigger className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-orange/10">
                      <Bell className="h-4.5 w-4.5 text-brand-orange" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      Notificaciones
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pb-2">
                    <ToggleSwitch
                      checked={emailPedido}
                      onChange={setEmailPedido}
                      label="Email de pedido"
                      description="Recibe confirmaciones y actualizaciones de tus pedidos"
                    />
                    <ToggleSwitch
                      checked={smsTracking}
                      onChange={setSmsTracking}
                      label="SMS de tracking"
                      description="Notificaciones por SMS cuando tu env\u00edo cambie de estado"
                    />
                    <ToggleSwitch
                      checked={promociones}
                      onChange={setPromociones}
                      label="Promociones"
                      description="Ofertas especiales y descuentos exclusivos"
                    />
                    <ToggleSwitch
                      checked={newsletter}
                      onChange={setNewsletter}
                      label="Newsletter"
                      description="Novedades semanales y tips para tus env\u00edos"
                    />

                    {/* Digest frequency */}
                    <div className="mt-4 space-y-2 pt-3 border-t border-border-subtle">
                      <Label htmlFor="digest-freq">
                        Frecuencia de digest
                      </Label>
                      <Select
                        id="digest-freq"
                        value={digestFreq}
                        onChange={(e) => setDigestFreq(e.target.value)}
                      >
                        <SelectItem value="diario">Diario</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="nunca">Nunca</SelectItem>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleSave} size="sm">
                        Guardar cambios
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* ================================================ */}
              {/* 3. Idioma y regi\u00f3n                                   */}
              {/* ================================================ */}
              <AccordionItem value="locale" className="border-b border-border px-5 sm:px-6">
                <AccordionTrigger className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green/10">
                      <Globe className="h-4.5 w-4.5 text-brand-green" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      Idioma y regi&oacute;n
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 pb-2">
                    {/* Language */}
                    <div className="space-y-2">
                      <Label htmlFor="settings-lang">Idioma</Label>
                      <Select
                        id="settings-lang"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <SelectItem value="es">Espa&ntilde;ol</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </Select>
                    </div>

                    {/* Theme */}
                    <div className="space-y-2">
                      <Label htmlFor="settings-theme">Tema</Label>
                      <Select
                        id="settings-theme"
                        value={theme ?? "system"}
                        onChange={(e) => setTheme(e.target.value)}
                      >
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </Select>
                    </div>

                    {/* Currency */}
                    <div className="space-y-2">
                      <Label htmlFor="settings-currency">Moneda</Label>
                      <Select id="settings-currency" value="usd" disabled>
                        <SelectItem value="usd">USD ($)</SelectItem>
                      </Select>
                      <p className="text-xs text-foreground-muted">
                        Todos los precios se muestran en d&oacute;lares
                        estadounidenses.
                      </p>
                    </div>

                    <Button onClick={handleSave} size="sm">
                      Guardar cambios
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* ================================================ */}
              {/* 4. Privacidad                                     */}
              {/* ================================================ */}
              <AccordionItem value="privacy" className="border-b border-border px-5 sm:px-6">
                <AccordionTrigger className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-yellow/10">
                      <Shield className="h-4.5 w-4.5 text-brand-yellow" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      Privacidad
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pb-2">
                    <ToggleSwitch
                      checked={showTestimonios}
                      onChange={setShowTestimonios}
                      label="Permitir que mis testimonios se muestren"
                      description="Tus rese\u00f1as podr\u00e1n ser visibles en la p\u00e1gina principal"
                    />
                    <ToggleSwitch
                      checked={shareData}
                      onChange={setShareData}
                      label="Compartir datos para mejorar el servicio"
                      description="Datos an\u00f3nimos de uso para mejorar la experiencia"
                    />

                    <div className="pt-4">
                      <Button onClick={handleSave} size="sm">
                        Guardar cambios
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* ================================================ */}
              {/* 5. Zona de peligro                                */}
              {/* ================================================ */}
              <AccordionItem value="danger" className="border-0 px-5 sm:px-6">
                <AccordionTrigger className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40">
                      <AlertTriangle className="h-4.5 w-4.5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                      Zona de peligro
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
                    <p className="text-sm text-foreground-secondary">
                      Estas acciones son irreversibles. Proc&eacute;de con
                      cuidado.
                    </p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
                        onClick={() => {
                          toast("Descarga iniciada", {
                            description:
                              "Recibir\u00e1s un email con tus datos en las pr\u00f3ximas 24 horas.",
                          });
                        }}
                      >
                        <Download className="mr-1.5 h-4 w-4" />
                        Descargar mis datos
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteDialogOpen(true)}
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" />
                        Eliminar mi cuenta
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

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

      {/* ============================================ */}
      {/* DELETE ACCOUNT CONFIRMATION DIALOG           */}
      {/* ============================================ */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-center">
              &iquest;Est&aacute;s seguro?
            </DialogTitle>
            <DialogDescription className="text-center">
              Esta acci&oacute;n eliminar&aacute; permanentemente tu cuenta,
              incluyendo tus familias guardadas, historial de pedidos y toda tu
              informaci&oacute;n. Esta acci&oacute;n no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="delete-confirm" className="text-sm">
                Escribe{" "}
                <span className="font-mono font-bold text-red-600 dark:text-red-400">
                  ELIMINAR
                </span>{" "}
                para confirmar
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="ELIMINAR"
                className="font-mono"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row-reverse">
              <Button
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto"
                disabled={deleteConfirmText !== "ELIMINAR"}
                onClick={handleDeleteAccount}
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Eliminar cuenta permanentemente
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setDeleteConfirmText("");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
