import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sobre nosotros",
  description:
    "Conectamos familias entre Miami y Matanzas. Conoce nuestra misión, valores y equipo.",
  path: "/sobre-nosotros",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
