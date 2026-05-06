"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";
import { cn } from "@/lib/utils";

type ComboCardProps = {
  combo: Product;
  className?: string;
};

export function ComboCard({ combo, className }: ComboCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const items = combo.comboItems ?? [];
  const discount =
    combo.comparePrice && combo.comparePrice > combo.price
      ? Math.round(((combo.comparePrice - combo.price) / combo.comparePrice) * 100)
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ product: combo, quantity: 1 });
    toast.success(`${combo.name} añadido`, {
      description: `${items.length} productos en este combo`,
    });
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-card transition-shadow hover:shadow-xl",
        className,
      )}
    >
      <Link href={`/producto/${combo.slug}`} className="contents">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={combo.thumbnail}
            alt={combo.name}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1280px) 33vw, 420px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />

          {/* Badge top-left */}
          {combo.comboBadge && (
            <Badge
              variant="gradient"
              className="absolute left-4 top-4 px-3 py-1 text-xs shadow-lg"
            >
              <Sparkles className="h-3 w-3" /> {combo.comboBadge}
            </Badge>
          )}

          {/* Discount top-right */}
          {discount > 0 && (
            <Badge
              variant="soft"
              className="absolute right-4 top-4 font-mono shadow-md"
            >
              −{discount}%
            </Badge>
          )}

          {/* Title overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              {combo.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <p className="line-clamp-2 text-sm text-foreground-secondary">
            {combo.description}
          </p>

          {items.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {items.slice(0, 3).map((item, i) => (
                <li
                  key={`${item.name}-${i}`}
                  className="flex items-start gap-2 text-xs text-foreground-secondary"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <span className="line-clamp-1">
                    <span className="font-mono font-semibold tabular-nums text-foreground">
                      {item.quantity}
                    </span>{" "}
                    <span className="text-foreground-muted">{item.unit}</span> ·{" "}
                    {item.name}
                  </span>
                </li>
              ))}
              {items.length > 3 && (
                <li className="text-xs font-medium text-primary">
                  + {items.length - 3} productos más
                </li>
              )}
            </ul>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-border-subtle pt-4">
            <div className="flex flex-col">
              {combo.comparePrice && combo.comparePrice > combo.price && (
                <span className="font-mono text-xs text-foreground-muted line-through">
                  ${combo.comparePrice.toFixed(2)}
                </span>
              )}
              <span className="font-mono text-2xl font-extrabold tabular-nums leading-none text-foreground">
                ${combo.price.toFixed(2)}
              </span>
            </div>
            <Button
              size="sm"
              onClick={handleAdd}
              className="shrink-0"
              disabled={!combo.inStock}
            >
              <Plus className="h-4 w-4" /> Añadir
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
