"use client";

import { useFamiliesStore, selectFamilyById } from "@/lib/stores/families-store";
import { FamilyForm } from "@/components/families";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Family } from "@/types";

export default function EditarFamiliaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const family = useFamiliesStore(selectFamilyById(id));
  const updateFamily = useFamiliesStore((s) => s.updateFamily);

  if (!family) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-foreground-muted">Familia no encontrada</p>
        <Link href="/cuenta/familias" className="mt-4 text-sm text-primary hover:underline">
          Volver a Mis Familias
        </Link>
      </div>
    );
  }

  const handleSubmit = (updated: Family) => {
    updateFamily(id, updated);
    toast.success("Datos actualizados ✓");
    router.push(`/cuenta/familias/${id}`);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex items-center gap-1 text-sm text-foreground-muted"
      >
        <Link href="/cuenta/familias" className="hover:text-foreground transition-colors">
          Mis Familias
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/cuenta/familias/${id}`} className="hover:text-foreground transition-colors">
          {family.alias}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Editar</span>
      </motion.nav>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-h3 font-bold text-foreground"
      >
        Editar: {family.alias}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FamilyForm
          initialData={family}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </motion.div>
    </div>
  );
}
