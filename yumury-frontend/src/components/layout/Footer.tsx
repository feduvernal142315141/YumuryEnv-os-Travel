import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Column = {
  title: string;
  links: { label: string; href: string }[];
};

const columns: Column[] = [
  {
    title: "Productos",
    links: [
      { label: "Alimentos", href: "/categoria/alimentos" },
      { label: "Combos curados", href: "/categoria/combos" },
      { label: "Electrodomésticos", href: "/categoria/electrodomesticos" },
      { label: "Vehículos", href: "/categoria/vehiculos" },
      { label: "Buscar todo", href: "/buscar" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Preguntas frecuentes", href: "/faq" },
      { label: "Tracking de envío", href: "/tracking/pub_a3f5g7h9" },
      { label: "Contacto", href: "/contacto" },
      { label: "Yumi (asistente)", href: "/yumi" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", href: "/sobre-nosotros" },
      { label: "Mis familias", href: "/cuenta/familias" },
      { label: "Términos", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="h-1 w-full bg-gradient-brand" />
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          {/* Brand column */}
          <div className="space-y-5">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="text-gradient-brand">Yumury</span>
              <span className="ml-1.5 text-base font-medium opacity-70">Envíos & Travel</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed opacity-75">
              La forma más confiable de enviar a Matanzas, Cuba. Combos curados, tracking
              visual con fotos y soporte humano en Miami y Matanzas.
            </p>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-70" />
                <a href="tel:+17868587480" className="hover:opacity-100">
                  +1 786-858-7480
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-70" />
                <a href="mailto:hola@yumuryenvios.com" className="hover:opacity-100">
                  hola@yumuryenvios.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 opacity-70" />
                <span>1450 NW 87th Ave, Miami, FL 33172</span>
              </li>
            </ul>
          </div>

          {/* Desktop columns */}
          <div className="hidden md:contents">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-overline opacity-70">{col.title}</h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="opacity-80 transition-opacity hover:opacity-100"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile accordion */}
          <Accordion type="single" collapsible className="md:hidden">
            {columns.map((col) => (
              <AccordionItem
                key={col.title}
                value={col.title}
                className="border-b-background/15"
              >
                <AccordionTrigger className="text-base hover:text-background/80">
                  {col.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-sm opacity-80">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} Yumury Envíos & Travel · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-3">
            <SocialIcon
              href="https://facebook.com/yumury"
              label="Facebook"
              icon={<Facebook className="h-4 w-4" />}
            />
            <SocialIcon
              href="https://instagram.com/yumury"
              label="Instagram"
              icon={<Instagram className="h-4 w-4" />}
            />
            <SocialIcon
              href="https://wa.me/17868587480"
              label="WhatsApp"
              icon={<MessageCircle className="h-4 w-4" />}
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
            <span>Visa</span>
            <span aria-hidden>·</span>
            <span>Mastercard</span>
            <span aria-hidden>·</span>
            <span>Amex</span>
            <span aria-hidden>·</span>
            <span>Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 transition-colors hover:bg-background/10"
    >
      {icon}
    </a>
  );
}
