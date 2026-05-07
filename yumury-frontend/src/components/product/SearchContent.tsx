"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters, DEFAULT_FILTERS, type FilterState } from "@/components/product/ProductFilters";
import { allProducts, getBestsellers } from "@/lib/mock-data";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";

const SORT_OPTIONS = [
  { value: "relevance", label: "Más relevantes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const fuse = new Fuse(allProducts, {
  keys: [
    { name: "name", weight: 2 },
    { name: "description", weight: 1 },
    { name: "brand", weight: 1 },
    { name: "tags", weight: 0.8 },
    { name: "subcategory", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
});

const SUGGESTIONS = [
  "arroz", "pollo", "combo familiar", "EcoFlow", "moto eléctrica",
  "refrigerador", "aceite", "café",
];

function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const results = fuse.search(query);
  return results.map((r) => r.item);
}

function sortProducts(products: Product[], sort: SortValue): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc": return copy.sort((a, b) => a.price - b.price);
    case "price-desc": return copy.sort((a, b) => b.price - a.price);
    case "rating": return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default: return copy;
  }
}

function applyFilters(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    if (filters.subcategories.length > 0 && !filters.subcategories.includes(p.subcategory))
      return false;
    if (filters.brands.length > 0 && (!p.brand || !filters.brands.includes(p.brand)))
      return false;
    if (p.price < filters.minPrice) return false;
    if (filters.maxPrice < 10000 && p.price > filters.maxPrice) return false;
    if (filters.minRating > 0 && (p.rating ?? 0) < filters.minRating) return false;
    if (filters.inStockOnly && !p.inStock) return false;
    return true;
  });
}

type SearchContentProps = {
  initialQuery: string;
};

export function SearchContent({ initialQuery }: SearchContentProps) {
  const router = useRouter();
  const sp = useSearchParams();
  const [query, setQuery] = React.useState(initialQuery);
  const [inputValue, setInputValue] = React.useState(initialQuery);
  const [sort, setSort] = React.useState<SortValue>("relevance");
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  // Sync query from URL
  React.useEffect(() => {
    const q = sp.get("q") ?? "";
    setQuery(q);
    setInputValue(q);
  }, [sp]);

  const searchResults = React.useMemo(() => searchProducts(query), [query]);
  const filtered = React.useMemo(() => applyFilters(searchResults, filters), [searchResults, filters]);
  const sorted = React.useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleSuggestion = (s: string) => {
    router.push(`/buscar?q=${encodeURIComponent(s)}`);
  };

  const bestsellers = getBestsellers(8);

  const filterPanel = (
    <ProductFilters
      products={query ? searchResults : allProducts}
      filters={filters}
      onFiltersChange={setFilters}
      resultCount={sorted.length}
    />
  );

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
            <input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Buscar productos, combos, categorías…"
              className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder-foreground-muted shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              autoFocus={!initialQuery}
            />
          </div>
          <Button type="submit" size="lg" className="shrink-0 gap-2">
            Buscar
          </Button>
        </form>

        {query ? (
          <div>
            <h1 className="text-h3 font-bold text-foreground">
              Resultados para{" "}
              <span className="text-gradient-brand">&ldquo;{query}&rdquo;</span>
            </h1>
            <p className="mt-1 text-sm text-foreground-muted">
              {sorted.length} resultado{sorted.length !== 1 ? "s" : ""} encontrados
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-h3 font-bold text-foreground">
              Buscar en el catálogo
            </h1>
            <p className="mt-1 text-sm text-foreground-muted">
              {allProducts.length} productos disponibles para enviar a Matanzas
            </p>
          </div>
        )}
      </div>

      {/* No results state */}
      {query && sorted.length === 0 && (
        <div className="mb-12 rounded-2xl border border-border-subtle bg-card p-8 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-foreground-muted" />
          <h2 className="text-lg font-semibold text-foreground">
            No encontramos resultados para &ldquo;{query}&rdquo;
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Intenta con otra palabra o prueba una de estas sugerencias:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/80"
              >
                <Sparkles className="h-3 w-3 text-brand-orange" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty query: show suggestions + bestsellers */}
      {!query && (
        <div className="mb-12 space-y-8">
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground-muted">
              Búsquedas populares
            </h2>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-foreground-muted" />
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-h4 font-bold text-foreground">Lo más enviado</h2>
            <ProductGrid products={bestsellers} />
          </div>
        </div>
      )}

      {/* Results with filters */}
      {query && sorted.length > 0 && (
        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto p-5">
                <SheetHeader className="mb-4">
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                {filterPanel}
              </SheetContent>
            </Sheet>

            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              className="ml-auto w-48 text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border border-border-subtle bg-card p-5">
                {filterPanel}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <ProductGrid products={sorted} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
