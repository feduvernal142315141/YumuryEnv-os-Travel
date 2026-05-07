import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso de Yumury Envíos & Travel.",
  path: "/terminos",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
