"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";

export function FamilyEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-50 to-brand-yellow-50 dark:from-brand-green-900/20 dark:to-brand-yellow/10">
        <span className="text-5xl">💚</span>
      </div>

      <h3 className="text-xl font-bold text-foreground">
        Aún no tienes familias guardadas
      </h3>
      <p className="mt-2 max-w-sm text-sm text-foreground-secondary">
        Guarda los datos de tu mamá, abuela o quien quieras para enviarles con
        un click
      </p>

      <Link
        href="/cuenta/familias/nueva"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-yellow to-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
      >
        <Plus className="h-4 w-4" />
        Añadir mi primera familia
      </Link>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-foreground-muted">
        <Heart className="h-3.5 w-3.5 text-brand-red" />
        Con sus datos guardados, reordenar es 10× más rápido
      </p>
    </motion.div>
  );
}
