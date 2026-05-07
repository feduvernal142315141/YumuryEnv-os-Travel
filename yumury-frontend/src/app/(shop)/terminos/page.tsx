"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los términos",
    content: `Al acceder y utilizar el sitio web de Yumury Envíos & Travel ("Yumury", "nosotros"), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.\n\nEstos términos se aplican a todos los usuarios del sitio, incluyendo, sin limitación, usuarios que sean navegadores, vendedores, clientes y/o contribuidores de contenido.`,
  },
  {
    id: "definiciones",
    title: "2. Definiciones",
    content: `"Servicio" se refiere a la plataforma de envíos operada por Yumury.\n"Usuario" se refiere a cualquier persona que acceda o utilice el Servicio.\n"Pedido" se refiere a una solicitud de envío realizada a través de la plataforma.\n"Destinatario" se refiere a la persona en Cuba que recibirá el envío.\n"Familia" se refiere a un perfil de destinatario guardado en la plataforma.`,
  },
  {
    id: "uso",
    title: "3. Uso del servicio",
    content: `Usted se compromete a utilizar el Servicio únicamente para fines legales y de acuerdo con estos Términos. No debe utilizar el Servicio para enviar artículos prohibidos, ilegales o restringidos.\n\nNos reservamos el derecho de rechazar cualquier pedido que consideremos inapropiado, ilegal o que viole nuestras políticas.`,
  },
  {
    id: "productos",
    title: "4. Productos y precios",
    content: `Los precios de los productos están en dólares estadounidenses (USD) y están sujetos a cambio sin previo aviso. Hacemos todo lo posible por mantener los precios actualizados y precisos.\n\nLas imágenes de los productos son representativas y pueden diferir ligeramente del producto real. Los productos están sujetos a disponibilidad.`,
  },
  {
    id: "pedidos",
    title: "5. Pedidos y pagos",
    content: `Al realizar un pedido, usted acepta proporcionar información de pago precisa y completa. Los pagos se procesan de forma segura a través de Stripe. No almacenamos datos de tarjeta de crédito en nuestros servidores.\n\nUna vez confirmado el pedido, el cargo se realiza inmediatamente. Si por algún motivo no podemos procesar el envío, se le reembolsará el monto total.`,
  },
  {
    id: "envios",
    title: "6. Envíos y entregas",
    content: `Los tiempos de entrega son estimados y pueden variar según el método de envío seleccionado y el municipio de destino. Estándar: 5-7 días, Express: 3-5 días, Marítimo: 4-7 semanas.\n\nYumury no es responsable por demoras causadas por situaciones fuera de nuestro control, incluyendo pero no limitado a condiciones climáticas, restricciones aduaneras o problemas logísticos en el destino.`,
  },
  {
    id: "garantia",
    title: "7. Garantía Yumury",
    content: `Nuestra Garantía Yumury cubre: pedidos que llegan incompletos, productos dañados durante el transporte y pedidos que no llegan a su destino. En estos casos, realizaremos un reembolso completo o reenvío sin costo adicional.\n\nPara solicitar la garantía, el usuario debe contactarnos dentro de los 7 días siguientes a la fecha de entrega estimada con el número de pedido y evidencia del problema.`,
  },
  {
    id: "propiedad",
    title: "8. Propiedad intelectual",
    content: `Todo el contenido del sitio web de Yumury, incluyendo pero no limitado a textos, gráficos, logos, íconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Yumury o de sus proveedores de contenido y está protegido por leyes de propiedad intelectual.\n\nNo se permite la reproducción, distribución o modificación de ningún contenido sin autorización previa por escrito.`,
  },
  {
    id: "limitacion",
    title: "9. Limitación de responsabilidad",
    content: `En la máxima medida permitida por la ley aplicable, Yumury no será responsable por daños indirectos, incidentales, especiales, consecuenciales o punitivos, o cualquier pérdida de beneficios o ingresos.\n\nNuestra responsabilidad total no excederá el monto pagado por usted por el pedido en cuestión.`,
  },
  {
    id: "contacto",
    title: "10. Contacto",
    content: `Para preguntas sobre estos Términos y Condiciones, puede contactarnos en:\n\nEmail: legal@yumuryenvios.com\nTeléfono: +1 (786) 555-0100\nDirección: 1234 SW 8th Street, Miami, FL 33135`,
  },
];

export default function TerminosPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <h1 className="text-h1 md:text-display-lg">Términos y Condiciones</h1>
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
