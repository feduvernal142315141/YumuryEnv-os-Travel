import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre envíos, pagos, tracking y más en Yumury Envíos.",
  path: "/faq",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
