"use client";

import { useFamiliesStore } from "@/lib/stores/families-store";
import { mockOrders } from "@/lib/mock-data/orders";
import { FamilyCard, FamilyEmpty } from "@/components/families";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Users, Package, DollarSign } from "lucide-react";

export default function FamiliasPage() {
  const router = useRouter();
  const { families, deleteFamily } = useFamiliesStore();

  const totalOrders = families.reduce(
    (sum, f) => sum + (f.stats?.totalOrdersReceived || 0),
    0
  );
  const totalSpent = families.reduce(
    (sum, f) => sum + (f.stats?.totalReceived || 0),
    0
  );

  const handleDelete = (id: string, alias: string) => {
    if (window.confirm(`¿Eliminar a ${alias}? Esta acción no se puede deshacer.`)) {
      deleteFamily(id);
      toast.success(`${alias} eliminado`);
    }
  };

  const handleReorder = (alias: string, familyId: string) => {
    const lastOrder = mockOrders.find((o) => o.recipient.id === familyId);
    if (lastOrder) {
      toast.success(`Reordenando último pedido de ${alias}...`);
      router.push("/carrito");
    } else {
      toast("No hay pedidos previos para reordenar");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-h2 font-bold text-foreground">Mis Familias</h1>
        <p className="mt-1 text-body text-foreground-secondary">
          Tus seres queridos en Matanzas, siempre listos
        </p>

        {families.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground-secondary">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              {families.length} familias
            </span>
            <span className="flex items-center gap-1.5">
              <Package className="h-4 w-4 text-brand-orange" />
              {totalOrders} pedidos enviados
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-brand-green" />
              ${totalSpent.toFixed(0)} total
            </span>
          </div>
        )}

        <Link
          href="/cuenta/familias/nueva"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Añadir familia
        </Link>
      </motion.div>

      {/* Content */}
      {families.length === 0 ? (
        <FamilyEmpty />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family, i) => (
            <FamilyCard
              key={family.id}
              family={family}
              index={i}
              onEdit={() => router.push(`/cuenta/familias/${family.id}/editar`)}
              onDelete={() => handleDelete(family.id, family.alias)}
              onReorder={() => handleReorder(family.alias, family.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
