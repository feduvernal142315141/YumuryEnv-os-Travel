import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Política de privacidad",
  description: "Política de privacidad y tratamiento de datos de Yumury Envíos & Travel.",
  path: "/privacidad",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
