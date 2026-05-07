"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

type CategoryHeroProps = {
  category: Category;
  activeSubSlug?: string;
  onSubcategoryClick?: (slug: string) => void;
};

export function CategoryHero({
  category,
  activeSubSlug,
  onSubcategoryClick,
}: CategoryHeroProps) {
  return (
    <div className="relative h-48 overflow-hidden sm:h-60">
      <Image
        src={category.image}
        alt={category.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="relative flex h-full flex-col justify-between px-4 py-4 sm:px-6 sm:py-5">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-white/80" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="h-3 w-3" />
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/categorias" className="hover:text-white transition-colors">
            Categorías
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-medium">{category.name}</span>
        </nav>

        {/* Title + subcategory chips */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-2xl font-bold text-white sm:text-3xl"
          >
            {category.name}
          </motion.h1>

          {/* Subcategory chips horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => onSubcategoryClick?.("all")}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                !activeSubSlug || activeSubSlug === "all"
                  ? "bg-white text-foreground shadow-md"
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30",
              )}
            >
              Todos
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => onSubcategoryClick?.(sub.slug)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                  activeSubSlug === sub.slug
                    ? "bg-white text-foreground shadow-md"
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30",
                )}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
