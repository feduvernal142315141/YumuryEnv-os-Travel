import { Eye, HeartHandshake, RefreshCcw, ShieldCheck, type LucideIcon } from "lucide-react";
import { MotionReveal } from "./MotionReveal";

type Guarantee = {
  Icon: LucideIcon;
  title: string;
  body: string;
  tint: string;
};

const guarantees: Guarantee[] = [
  {
    Icon: ShieldCheck,
    title: "Reembolso automático",
    body: "Si tu pedido no llega en el plazo, te devolvemos el 100%.",
    tint: "text-brand-green",
  },
  {
    Icon: RefreshCcw,
    title: "Reemplazo gratis",
    body: "Si llega dañado o no funciona, lo reemplazamos sin costo.",
    tint: "text-brand-orange",
  },
  {
    Icon: Eye,
    title: "Tracking transparente",
    body: "Sabes exactamente dónde está tu envío con fotos en cada etapa.",
    tint: "text-brand-red",
  },
  {
    Icon: HeartHandshake,
    title: "Soporte humano",
    body: "Equipo real en Miami y Matanzas, no bots. WhatsApp, email, teléfono.",
    tint: "text-brand-yellow-deep",
  },
];

export function GuaranteeSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
      <MotionReveal className="mb-12 max-w-2xl text-center mx-auto md:mb-16">
        <span className="text-overline text-brand-orange">Garantía Yumury</span>
        <h2 className="mt-2 text-h1">Si algo sale mal, lo arreglamos</h2>
        <p className="mt-3 text-body-lg text-foreground-secondary">
          No es un eslogan. Es la única forma en que la diáspora puede confiar en
          enviar a Cuba. Cada envío respaldado.
        </p>
      </MotionReveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guarantees.map((g, i) => (
          <MotionReveal key={g.title} delay={i * 0.06}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-border-subtle bg-card p-6 transition-shadow hover:shadow-lg">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-card-hover ${g.tint}`}>
                <g.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-h5">{g.title}</h3>
              <p className="mt-2 text-body-sm text-foreground-secondary">{g.body}</p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
