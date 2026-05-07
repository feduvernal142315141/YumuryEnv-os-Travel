import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contacto",
  description:
    "Contáctanos por WhatsApp, email o teléfono. Estamos aquí para ayudarte con tus envíos a Matanzas.",
  path: "/contacto",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
