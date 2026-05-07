"use client";

import { motion } from "framer-motion";
import { FilterX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyCategoryProps = {
  onClearFilters?: () => void;
};

export function EmptyCategory({ onClearFilters }: EmptyCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-16 px-4 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow-50 dark:bg-brand-yellow/10">
        <FilterX className="h-10 w-10 text-brand-yellow-deep" />
      </div>

      <h3 className="mt-6 text-h4 font-bold text-foreground">
        No hay productos con estos filtros
      </h3>
      <p className="mt-2 max-w-sm text-sm text-foreground-secondary">
        Prueba con menos filtros o limpia la selección para ver todos los
        productos de esta categoría.
      </p>

      {onClearFilters && (
        <Button onClick={onClearFilters} variant="outline" className="mt-6">
          <RotateCcw className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </motion.div>
  );
}
