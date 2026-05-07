import Link from "next/link";
import { Search, Home, Package, Users, MapPin, HelpCircle } from "lucide-react";

const suggestions = [
  { label: "Catálogo", href: "/categoria/alimentos", icon: Package },
  { label: "Mis Familias", href: "/cuenta/familias", icon: Users },
  { label: "Tracking", href: "/tracking/pub_a3f5g7h9", icon: MapPin },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center bg-background">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(21,128,61,0.25), rgba(234,138,28,0.15), transparent)",
        }}
      />

      {/* 404 number */}
      <div className="relative">
        <span className="text-[120px] font-extrabold leading-none text-foreground/5 sm:text-[180px]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-green-50 dark:bg-brand-green-900/20">
            <Search className="h-10 w-10 text-brand-green" />
          </div>
        </div>
      </div>

      <h1 className="mt-4 text-h2 font-bold text-foreground">
        Esta página no existe
      </h1>
      <p className="mt-2 max-w-md text-body text-foreground-secondary">
        Pero no te preocupes, te ayudamos a encontrar lo que buscas.
      </p>

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {suggestions.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-md hover:scale-[1.02]"
          >
            <s.icon className="h-5 w-5 text-primary" />
            {s.label}
          </Link>
        ))}
      </div>

      {/* Home CTA */}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
      >
        <Home className="h-4 w-4" />
        Ir al inicio
      </Link>
    </div>
  );
}
