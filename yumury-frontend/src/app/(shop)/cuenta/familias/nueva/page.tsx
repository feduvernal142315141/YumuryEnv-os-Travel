"use client";

import { useFamiliesStore } from "@/lib/stores/families-store";
import { FamilyForm } from "@/components/families";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Family } from "@/types";

export default function NuevaFamiliaPage() {
  const router = useRouter();
  const addFamily = useFamiliesStore((s) => s.addFamily);

  const handleSubmit = (family: Family) => {
    addFamily(family);
    toast.success("¡Familiar guardado! 🎉");
    router.push("/cuenta/familias");
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
        <span className="text-foreground">Nueva familia</span>
      </motion.nav>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-h3 font-bold text-foreground"
      >
        Añadir familiar
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FamilyForm
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
        />
      </motion.div>
    </div>
  );
}
