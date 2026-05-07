"use client";

import * as React from "react";
import type { ProductVariant } from "@/types";
import { cn } from "@/lib/utils";

type VariantSelectorProps = {
  variants: ProductVariant[];
  selectedId: string | undefined;
  onSelect: (variant: ProductVariant) => void;
};

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  if (variants.length === 0) return null;

  const type = variants[0].type;

  if (type === "color") {
    return (
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            title={v.name}
            onClick={() => onSelect(v)}
            disabled={!v.inStock}
            className={cn(
              "relative h-8 w-8 rounded-full border-2 transition-all",
              selectedId === v.id ? "border-primary shadow-md scale-110" : "border-transparent",
              !v.inStock && "opacity-40 cursor-not-allowed",
            )}
            style={{ backgroundColor: v.name.toLowerCase() }}
          >
            {selectedId === v.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (type === "model" && variants.length > 4) {
    // Use a select for many model variants
    return (
      <div className="relative">
        <select
          value={selectedId ?? ""}
          onChange={(e) => {
            const v = variants.find((v) => v.id === e.target.value);
            if (v) onSelect(v);
          }}
          className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-8 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          <option value="" disabled>
            Selecciona modelo
          </option>
          {variants.map((v) => (
            <option key={v.id} value={v.id} disabled={!v.inStock}>
              {v.name}
              {v.priceModifier !== 0
                ? ` (+$${v.priceModifier.toFixed(2)})`
                : ""}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Pills (weight, size, model ≤4)
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => {
        const isSelected = selectedId === v.id;
        return (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            disabled={!v.inStock}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-all",
              isSelected
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border-subtle bg-background text-foreground hover:border-primary/50",
              !v.inStock && "opacity-40 cursor-not-allowed line-through",
            )}
          >
            {v.name}
            {v.priceModifier > 0 && (
              <span className="ml-1 text-xs text-foreground-muted">
                +${v.priceModifier.toFixed(0)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
