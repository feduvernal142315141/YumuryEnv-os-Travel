import { CreditCard, MapPin, Package, ShoppingBag, type LucideIcon } from "lucide-react";
import { MotionReveal } from "./MotionReveal";

type Step = {
  num: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Elige",
    body: "Productos individuales o combos curados. Yumi te ayuda a armar el envío.",
    Icon: ShoppingBag,
  },
  {
    num: "02",
    title: "Paga",
    body: "Stripe, Visa, Mastercard. Sin sobrecostos sorpresa al final.",
    Icon: CreditCard,
  },
  {
    num: "03",
    title: "Sigue",
    body: "Tracking visual con fotos en cada etapa. Comparte el link con tu familiar.",
    Icon: MapPin,
  },
  {
    num: "04",
    title: "Recibe",
    body: "Entrega directa en cualquier municipio de Matanzas. Sin intermediarios.",
    Icon: Package,
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
      <MotionReveal className="mb-12 text-center md:mb-16">
        <span className="text-overline text-brand-orange">Cómo funciona</span>
        <h2 className="mt-2 text-h1">Así funciona Yumury</h2>
        <p className="mx-auto mt-3 max-w-xl text-body-lg text-foreground-secondary">
          Cuatro pasos simples para conectar con tu familia. Sin sorpresas.
        </p>
      </MotionReveal>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
        {/* Connector line (desktop) */}
        <div
          aria-hidden
          className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
        />

        {steps.map((step, i) => (
          <MotionReveal key={step.num} delay={i * 0.08}>
            <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border-subtle bg-card shadow-md">
                <step.Icon className="h-6 w-6 text-foreground" />
                <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gradient-brand px-1.5 font-mono text-[10px] font-bold text-white shadow-md">
                  {step.num}
                </span>
              </div>
              <h3 className="text-h5 mt-1">{step.title}</h3>
              <p className="max-w-xs text-body-sm text-foreground-secondary">
                {step.body}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
