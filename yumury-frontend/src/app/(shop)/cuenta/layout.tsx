import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Mi cuenta",
  description: "Dashboard de tu cuenta en Yumury. Gestiona pedidos, familias y configuración.",
  path: "/cuenta",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
