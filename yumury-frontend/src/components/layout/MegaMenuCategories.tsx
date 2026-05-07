"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function MegaMenuCategories() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(categories[0]?.slug ?? "alimentos");
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  const activeCategory = categories.find((c) => c.slug === active) ?? categories[0];

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="inline-flex items-center gap-1 text-label hover:text-foreground transition-colors"
        aria-expanded={open}
      >
        Categorías
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[min(960px,90vw)] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-popover shadow-xl">
              <div className="grid grid-cols-[1fr_1.4fr]">
                {/* Column tabs */}
                <ul className="border-r border-border-subtle p-2">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <button
                        onMouseEnter={() => setActive(c.slug)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                          active === c.slug
                            ? "bg-card-hover text-foreground"
                            : "text-foreground-secondary hover:bg-card-hover/60",
                        )}
                      >
                        <span>{c.name}</span>
                        <span className="text-xs text-foreground-muted">
                          {c.productCount}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Active panel */}
                <div className="grid grid-cols-[1fr_180px] gap-6 p-6">
                  <div>
                    <Link
                      href={`/categoria/${activeCategory.slug}`}
                      className="text-overline text-foreground-muted hover:text-foreground"
                    >
                      Ver {activeCategory.name} →
                    </Link>
                    <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                      {activeCategory.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={`/categoria/${activeCategory.slug}?sub=${sub.slug}`}
                            className="group flex flex-col gap-0.5"
                          >
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {sub.name}
                            </span>
                            <span className="line-clamp-1 text-xs text-foreground-muted">
                              {sub.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={activeCategory.image}
                      alt={activeCategory.name}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-0 p-3 text-white">
                      <p className="text-xs font-semibold">
                        {activeCategory.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
