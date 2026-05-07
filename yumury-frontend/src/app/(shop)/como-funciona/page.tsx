"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Users,
  CreditCard,
  MapPin,
  ArrowRight,
  Shield,
  Truck,
  Package,
  RefreshCw,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories } from "@/lib/mock-data/faq";

const ease = [0.16, 1, 0.3, 1] as const;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  CreditCard,
  Package,
  MapPin,
  User,
  RefreshCw,
};

const steps = [
  {
    num: 1,
    title: "Elige lo que vas a enviar",
    body: "Catálogo curado de 160+ productos: alimentos, electrodomésticos, motos eléctricas. Combos para cada situación — apagones, cumpleaños, emergencias.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    imageAlt: "Productos de alimentos frescos",
    icon: ShoppingBag,
    cta: { label: "Explorar catálogo", href: "/categoria/alimentos" },
  },
  {
    num: 2,
    title: "Selecciona a tu familiar",
    body: "Guarda los datos de tus seres queridos una vez: nombre, dirección, teléfono, preferencias. Reordena en un click sin volver a escribir nada.",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    imageAlt: "Familia sonriente",
    icon: Users,
    cta: { label: "Conoce Mis Familias", href: "/cuenta/familias" },
  },
  {
    num: 3,
    title: "Paga seguro",
    body: "Pago 100% seguro con Stripe. Visa, Mastercard, American Express. No almacenamos datos de tarjeta. Sin costos ocultos.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    imageAlt: "Pago seguro con tarjeta",
    icon: CreditCard,
  },
  {
    num: 4,
    title: "Sigue tu envío en tiempo real",
    body: "Tracking visual con fotos en cada etapa: confirmación, preparación, tránsito, entrega. Comparte el link con tu familia por WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80",
    imageAlt: "Persona revisando tracking en su teléfono",
    icon: MapPin,
    cta: { label: "Ver demo de tracking", href: "/tracking/pub_a3f5g7h9" },
  },
];

export default function ComoFuncionaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(244,184,28,0.3), rgba(220,38,38,0.15), transparent)",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-display-lg md:text-display-xl"
          >
            Cómo enviar a{" "}
            <span className="text-gradient-brand">Matanzas</span> con Yumury
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="mt-4 text-body-lg text-foreground-secondary"
          >
            4 pasos. Sin sorpresas. Sin estrés.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, i) => {
        const reversed = i % 2 === 1;
        const Icon = step.icon;
        return (
          <section
            key={step.num}
            className="border-t border-border py-16 md:py-24"
          >
            <div
              className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16 ${
                reversed ? "md:[direction:rtl]" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="md:[direction:ltr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mt-4 block text-overline text-primary">
                  Paso {step.num}
                </span>
                <h2 className="mt-2 text-h2">{step.title}</h2>
                <p className="mt-4 text-body-lg text-foreground-secondary leading-relaxed">
                  {step.body}
                </p>
                {step.cta && (
                  <Button asChild className="mt-6">
                    <Link href={step.cta.href}>
                      {step.cta.label}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.1 }}
                className="md:[direction:ltr]"
              >
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={600}
                    height={450}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <h2 className="text-h2">Preguntas frecuentes</h2>
            <p className="mt-2 text-foreground-secondary">
              Todo lo que necesitas saber antes de enviar
            </p>
          </motion.div>

          <div className="mt-10 space-y-6">
            {faqCategories.map((cat) => {
              const CatIcon = iconMap[cat.icon];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {CatIcon && (
                      <CatIcon className="h-4 w-4 text-primary" />
                    )}
                    <h3 className="text-label font-semibold">{cat.name}</h3>
                  </div>
                  <Accordion type="single" collapsible>
                    {cat.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left text-sm">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-foreground-secondary">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/faq">
                Ver todas las preguntas <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-brand py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <Shield className="mx-auto h-10 w-10 mb-4 opacity-80" />
            <h2 className="text-h1 text-white">Empieza a enviar hoy</h2>
            <p className="mt-3 text-lg text-white/80">
              Tu familia en Matanzas te espera. Sin complicaciones.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white text-brand-green hover:bg-white/90 shadow-xl"
            >
              <Link href="/categoria/alimentos">
                Ir al catálogo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
