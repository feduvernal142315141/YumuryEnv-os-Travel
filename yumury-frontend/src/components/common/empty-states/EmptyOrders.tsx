"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-16 px-4 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-green-50 dark:bg-brand-green-900/20">
        <Package className="h-10 w-10 text-brand-green" />
      </div>

      <h3 className="mt-6 text-h4 font-bold text-foreground">
        Aún no has hecho pedidos
      </h3>
      <p className="mt-2 max-w-sm text-sm text-foreground-secondary">
        Cuando hagas tu primer envío a Matanzas, lo verás aquí con todo el
        tracking en tiempo real.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/categoria/alimentos">
            Explorar catálogo <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/como-funciona">Ver cómo funciona</Link>
        </Button>
      </div>
    </motion.div>
  );
}
