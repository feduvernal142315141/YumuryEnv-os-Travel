import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Cómo funciona",
  description:
    "4 pasos para enviar a Matanzas con Yumury: elige productos, selecciona familiar, paga seguro y sigue tu envío en tiempo real.",
  path: "/como-funciona",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
