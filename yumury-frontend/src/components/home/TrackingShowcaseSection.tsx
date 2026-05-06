import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, MapPin, Share2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "./MotionReveal";

type EventDot = {
  title: string;
  location: string;
  time: string;
  status: "completed" | "current" | "pending";
  photo?: string;
};

const events: EventDot[] = [
  {
    title: "Pedido confirmado",
    location: "Miami, FL",
    time: "Mié 12 · 09:14",
    status: "completed",
    photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
  },
  {
    title: "Empacado en almacén",
    location: "Miami warehouse",
    time: "Jue 13 · 11:42",
    status: "completed",
    photo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400",
  },
  {
    title: "En tránsito a Cuba",
    location: "Miami → Matanzas",
    time: "Vie 14 · 18:00",
    status: "current",
  },
  {
    title: "En almacén Matanzas",
    location: "Matanzas, Cuba",
    time: "Lun 17 · estimado",
    status: "pending",
  },
  {
    title: "Entregado",
    location: "Cárdenas, Matanzas",
    time: "Mar 18 · estimado",
    status: "pending",
  },
];

const features: { Icon: LucideIcon; label: string }[] = [
  { Icon: Camera, label: "Fotos reales en cada etapa" },
  { Icon: Share2, label: "Link público para tu familia" },
  { Icon: MapPin, label: "Ubicación viva en Matanzas" },
];

export function TrackingShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-background-secondary/40 py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <MotionReveal>
          <span className="text-overline text-brand-orange">Feature exclusiva</span>
          <h2 className="mt-2 text-h1">
            Ve cada paso del envío con fotos reales
          </h2>
          <p className="mt-4 text-body-lg text-foreground-secondary">
            Tracking visual con fotos tomadas en cada etapa: salida del almacén,
            llegada a Cuba, entrega final. No más mensajes vagos al WhatsApp.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {features.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-card border border-border-subtle">
                  <Icon className="h-4 w-4 text-brand-green" />
                </span>
                <span className="font-medium text-foreground">{label}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="default" size="lg" className="mt-8">
            <Link href="/tracking/pub_a3f5g7h9">
              Ver demo de tracking <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </MotionReveal>

        {/* Visual: timeline mock */}
        <MotionReveal delay={0.1}>
          <div className="relative rounded-3xl border border-border-subtle bg-card p-6 shadow-xl md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-overline text-foreground-muted">Pedido #YM-2845</p>
                <p className="text-h5">Combo Familiar Premium</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-subtle px-3 py-1 text-xs font-semibold text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                En curso
              </span>
            </div>

            <ol className="relative mt-6 space-y-5 border-l-2 border-border-subtle pl-6">
              {events.map((ev, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute -left-[33px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      ev.status === "completed"
                        ? "border-brand-green bg-brand-green"
                        : ev.status === "current"
                          ? "border-brand-orange bg-card animate-pulse"
                          : "border-border-subtle bg-card"
                    }`}
                  >
                    {ev.status === "completed" && (
                      <span className="h-2 w-2 rounded-full bg-card" />
                    )}
                    {ev.status === "current" && (
                      <span className="h-2 w-2 rounded-full bg-brand-orange" />
                    )}
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${
                          ev.status === "pending" ? "text-foreground-muted" : ""
                        }`}
                      >
                        {ev.title}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {ev.location} · {ev.time}
                      </p>
                    </div>
                    {ev.photo && (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={ev.photo}
                          alt={ev.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
              <p className="text-xs text-foreground-muted">
                Compartible vía link público
              </p>
              <Button size="sm" variant="outline">
                <Share2 className="h-3.5 w-3.5" /> Compartir
              </Button>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
