"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    id: "datos",
    title: "1. Datos que recopilamos",
    content: `Recopilamos información que usted nos proporciona directamente: nombre, dirección de correo electrónico, número de teléfono, direcciones de envío, información de pago e historial de pedidos.\n\nTambién recopilamos automáticamente información técnica: dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia en el sitio.`,
  },
  {
    id: "uso",
    title: "2. Cómo usamos tu información",
    content: `Utilizamos su información para: procesar y gestionar sus pedidos, comunicarnos sobre el estado de sus envíos, mejorar nuestros servicios, enviar comunicaciones de marketing (con su consentimiento), y prevenir fraude.\n\nNo vendemos ni alquilamos su información personal a terceros.`,
  },
  {
    id: "compartir",
    title: "3. Compartir datos",
    content: `Compartimos información con: procesadores de pago (Stripe), proveedores de logística y envío, proveedores de servicios de análisis, y autoridades legales cuando sea requerido por ley.\n\nTodos nuestros proveedores están obligados a proteger su información bajo estándares de seguridad equivalentes.`,
  },
  {
    id: "cookies",
    title: "4. Cookies",
    content: `Utilizamos cookies para: mantener su sesión activa, recordar sus preferencias (idioma, tema), analizar el uso del sitio, y mejorar la experiencia de navegación.\n\nPuede configurar su navegador para rechazar cookies, pero esto puede limitar algunas funciones del sitio.`,
  },
  {
    id: "seguridad",
    title: "5. Seguridad",
    content: `Implementamos medidas de seguridad técnicas y organizativas para proteger su información: cifrado SSL/TLS en todas las comunicaciones, procesamiento de pagos conforme a PCI DSS a través de Stripe, acceso restringido a datos personales, y monitoreo continuo de nuestros sistemas.\n\nNo almacenamos datos de tarjetas de crédito en nuestros servidores.`,
  },
  {
    id: "derechos",
    title: "6. Tus derechos",
    content: `Usted tiene derecho a: acceder a sus datos personales, rectificar datos inexactos, solicitar la eliminación de sus datos, retirar su consentimiento para comunicaciones de marketing, y solicitar una copia portátil de sus datos.\n\nPara ejercer cualquiera de estos derechos, contáctenos en privacy@yumuryenvios.com.`,
  },
  {
    id: "retencion",
    title: "7. Retención de datos",
    content: `Conservamos su información personal durante el tiempo necesario para cumplir con los fines descritos en esta política. Los datos de pedidos se conservan por 5 años con fines contables y legales. Los datos de cuenta se eliminan 30 días después de la solicitud de eliminación.`,
  },
  {
    id: "cambios",
    title: "8. Cambios a esta política",
    content: `Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página con una nueva fecha de actualización. Le notificaremos por correo electrónico sobre cambios significativos.`,
  },
  {
    id: "contacto",
    title: "9. Contacto",
    content: `Para preguntas sobre esta Política de Privacidad:\n\nEmail: privacy@yumuryenvios.com\nTeléfono: +1 (786) 555-0100\nDirección: 1234 SW 8th Street, Miami, FL 33135`,
  },
];

export default function PrivacidadPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <h1 className="text-h1 md:text-display-lg">Política de Privacidad</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Última actualización: 1 de mayo, 2025
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        {/* TOC */}
        <nav className="hidden lg:block sticky top-24 self-start space-y-0.5">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "block rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                activeSection === s.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground-muted hover:text-foreground hover:bg-card-hover",
              )}
            >
              {s.title}
            </a>
          ))}
        </nav>

        {/* Content */}
        <div className="space-y-10">
          {sections.map((s) => (
            <motion.section
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease }}
              className="scroll-mt-24"
            >
              <h2 className="text-h4 font-bold">{s.title}</h2>
              <div className="mt-3 text-sm text-foreground-secondary leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
