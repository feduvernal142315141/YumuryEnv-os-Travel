import * as React from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import type { ComboItem } from "@/types";
import { getProductById } from "@/lib/mock-data";

type ComboItemsListProps = {
  items: ComboItem[];
  price: number;
  comparePrice?: number;
};

export function ComboItemsList({ items, price, comparePrice }: ComboItemsListProps) {
  const savings = comparePrice && comparePrice > price ? comparePrice - price : 0;
  const savingsPct = comparePrice && comparePrice > price
    ? Math.round((savings / comparePrice) * 100)
    : 0;

  return (
    <section className="space-y-6 rounded-2xl border border-border-subtle bg-card p-6">
      <h2 className="text-h4 font-bold text-foreground">¿Qué incluye este combo?</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => {
          const linkedProduct = item.productId ? getProductById(item.productId) : undefined;
          const imgSrc = linkedProduct?.thumbnail ?? item.image;

          return (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border-subtle bg-background p-3">
              {imgSrc ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={imgSrc} alt={item.name} fill sizes="48px" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Package className="h-5 w-5 text-foreground-muted" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-foreground-muted">
                  {item.quantity} {item.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Savings calculator */}
      {savings > 0 && (
        <div className="rounded-xl border border-brand-green/20 bg-brand-green-50 p-4 dark:bg-brand-green-900/20">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm text-foreground-muted">
                Si compraras cada producto por separado:
              </p>
              <p className="font-mono text-lg font-semibold text-foreground-muted line-through tabular-nums">
                ${comparePrice!.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-brand-green">Con el combo ahorras</p>
              <p className="font-mono text-2xl font-bold tabular-nums text-brand-green">
                ${savings.toFixed(2)}
              </p>
              <p className="text-sm text-brand-green">({savingsPct}% de descuento)</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
