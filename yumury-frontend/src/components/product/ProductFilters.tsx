"use client";

import * as React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export type FilterState = {
  subcategories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  tags: string[];
};

export const DEFAULT_FILTERS: FilterState = {
  subcategories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  inStockOnly: false,
  tags: [],
};

type ProductFiltersProps = {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
  className?: string;
};

const RATING_OPTIONS = [
  { label: "4.5★ o más", value: 4.5 },
  { label: "4★ o más", value: 4 },
  { label: "3★ o más", value: 3 },
];

export function ProductFilters({
  products,
  filters,
  onFiltersChange,
  resultCount,
  className,
}: ProductFiltersProps) {
  // Derive dynamic filter options from products
  const subcategories = React.useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of products) {
      if (!seen.has(p.subcategory)) seen.set(p.subcategory, p.subcategory);
    }
    return Array.from(seen.values());
  }, [products]);

  const brands = React.useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) {
      if (p.brand) seen.add(p.brand);
    }
    return Array.from(seen).sort();
  }, [products]);

  const maxProductPrice = React.useMemo(
    () => Math.max(...products.map((p) => p.price), 100),
    [products],
  );

  const hasActiveFilters =
    filters.subcategories.length > 0 ||
    filters.brands.length > 0 ||
    filters.minRating > 0 ||
    filters.inStockOnly ||
    filters.tags.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < maxProductPrice;

  const set = (partial: Partial<FilterState>) =>
    onFiltersChange({ ...filters, ...partial });

  const toggleArrayFilter = (
    key: "subcategories" | "brands" | "tags",
    value: string,
  ) => {
    const arr = filters[key];
    set({ [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] });
  };

  const clearAll = () =>
    onFiltersChange({ ...DEFAULT_FILTERS, maxPrice: maxProductPrice });

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-foreground-muted" />
          <span className="text-sm font-semibold text-foreground">Filtros</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {filters.subcategories.length +
                filters.brands.length +
                (filters.minRating > 0 ? 1 : 0) +
                (filters.inStockOnly ? 1 : 0) +
                filters.tags.length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-brand-red hover:underline"
          >
            <X className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      <p className="mb-2 text-xs text-foreground-muted">
        {resultCount} resultado{resultCount !== 1 ? "s" : ""}
      </p>

      <Accordion type="multiple" defaultValue={["subcategories", "price"]} className="space-y-0">
        {/* Subcategory filter */}
        {subcategories.length > 1 && (
          <AccordionItem value="subcategories" className="border-border-subtle">
            <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
              Subcategoría
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-2">
                {subcategories.map((sub) => {
                  const count = products.filter((p) => p.subcategory === sub).length;
                  return (
                    <FilterCheckboxRow
                      key={sub}
                      id={`sub-${sub}`}
                      checked={filters.subcategories.includes(sub)}
                      onCheckedChange={() => toggleArrayFilter("subcategories", sub)}
                      label={sub
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                      count={count}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Brand filter */}
        {brands.length > 0 && (
          <AccordionItem value="brands" className="border-border-subtle">
            <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
              Marca
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="space-y-2">
                {brands.map((brand) => {
                  const count = products.filter((p) => p.brand === brand).length;
                  return (
                    <FilterCheckboxRow
                      key={brand}
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => toggleArrayFilter("brands", brand)}
                      label={brand}
                      count={count}
                    />
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price range */}
        <AccordionItem value="price" className="border-border-subtle">
          <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
            Precio
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] text-foreground-muted">Min</label>
                  <PriceInput
                    value={filters.minPrice}
                    onChange={(v) => set({ minPrice: Math.min(v, filters.maxPrice - 1) })}
                    min={0}
                    max={filters.maxPrice - 1}
                    placeholder="$0"
                  />
                </div>
                <span className="mt-5 text-foreground-muted">—</span>
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] text-foreground-muted">Max</label>
                  <PriceInput
                    value={filters.maxPrice >= maxProductPrice ? undefined : filters.maxPrice}
                    onChange={(v) => set({ maxPrice: Math.max(v, filters.minPrice + 1) })}
                    min={filters.minPrice + 1}
                    max={99999}
                    placeholder={`$${maxProductPrice.toFixed(0)}`}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-border-subtle">
          <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
            Calificación
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="space-y-2">
              {RATING_OPTIONS.map((opt) => (
                <FilterCheckboxRow
                  key={opt.value}
                  id={`rating-${opt.value}`}
                  checked={filters.minRating === opt.value}
                  onCheckedChange={() =>
                    set({ minRating: filters.minRating === opt.value ? 0 : opt.value })
                  }
                  label={opt.label}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability */}
        <AccordionItem value="stock" className="border-border-subtle border-b-0">
          <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
            Disponibilidad
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <FilterCheckboxRow
              id="in-stock"
              checked={filters.inStockOnly}
              onCheckedChange={(v) => set({ inStockOnly: v })}
              label="Solo en stock"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function FilterCheckboxRow({
  id,
  checked,
  onCheckedChange,
  label,
  count,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label: string;
  count?: number;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-foreground-muted">({count})</span>
      )}
    </label>
  );
}

function PriceInput({
  value,
  onChange,
  min,
  max,
  placeholder,
}: {
  value?: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  placeholder: string;
}) {
  const [raw, setRaw] = React.useState(value !== undefined ? String(value) : "");

  React.useEffect(() => {
    setRaw(value !== undefined ? String(value) : "");
  }, [value]);

  return (
    <input
      type="number"
      value={raw}
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={(e) => setRaw(e.target.value)}
      onBlur={() => {
        const num = parseFloat(raw);
        if (!isNaN(num) && num >= min && num <= max) onChange(num);
        else setRaw(value !== undefined ? String(value) : "");
      }}
      className="h-8 w-full rounded-md border border-border bg-background px-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
    />
  );
}
