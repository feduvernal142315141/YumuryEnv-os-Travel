"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectItem } from "@/components/ui/select";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters, type FilterState } from "@/components/product/ProductFilters";
import type { Product, Category } from "@/types";
import { CategoryHero } from "@/components/product/CategoryHero";

type CategoryContentProps = {
  products: Product[];
  category: Category;
};

const SORT_OPTIONS = [
  { value: "popular", label: "Más vendidos" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "newest", label: "Más nuevos" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const PAGE_SIZE = 12;

function sortProducts(products: Product[], sort: SortValue): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "newest":
      return copy.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    case "popular":
    default:
      return copy.sort((a, b) => (a.bestseller === b.bestseller ? 0 : a.bestseller ? -1 : 1));
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

export function CategoryContent({ products, category }: CategoryContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // Read initial state from URL
  const initialFilters = React.useMemo<FilterState>(() => {
    const subs = sp.getAll("sub");
    const brands = sp.getAll("brand");
    const minPrice = parseFloat(sp.get("min") ?? "0") || 0;
    const maxPrice = parseFloat(sp.get("max") ?? "10000") || 10000;
    const minRating = parseFloat(sp.get("rating") ?? "0") || 0;
    const inStockOnly = sp.get("stock") === "1";
    return { subcategories: subs, brands, minPrice, maxPrice, minRating, inStockOnly, tags: [] };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [filters, setFilters] = React.useState<FilterState>(initialFilters);
  const [sort, setSort] = React.useState<SortValue>(
    (sp.get("sort") as SortValue | null) ?? "popular",
  );
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const loaderRef = React.useRef<HTMLDivElement>(null);

  // Active sub from hero chips = first subcategory filter
  const activeSubSlug = filters.subcategories[0] ?? undefined;

  // Sync URL on filter/sort changes
  const syncUrl = React.useCallback(
    (f: FilterState, s: SortValue) => {
      const params = new URLSearchParams();
      f.subcategories.forEach((v) => params.append("sub", v));
      f.brands.forEach((v) => params.append("brand", v));
      if (f.minPrice > 0) params.set("min", String(f.minPrice));
      if (f.maxPrice < 10000) params.set("max", String(f.maxPrice));
      if (f.minRating > 0) params.set("rating", String(f.minRating));
      if (f.inStockOnly) params.set("stock", "1");
      if (s !== "popular") params.set("sort", s);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname],
  );

  const handleFiltersChange = (f: FilterState) => {
    setFilters(f);
    setVisibleCount(PAGE_SIZE);
    syncUrl(f, sort);
  };

  const handleSortChange = (s: SortValue) => {
    setSort(s);
    setVisibleCount(PAGE_SIZE);
    syncUrl(filters, s);
  };

  const handleSubcategoryClick = (slug: string) => {
    const next: FilterState = {
      ...filters,
      subcategories: slug === "all" ? [] : [slug],
    };
    handleFiltersChange(next);
  };

  // Derived filtered + sorted products
  const filtered = React.useMemo(
    () => sortProducts(applyFilters(products, filters), sort),
    [products, filters, sort],
  );

  // Infinite scroll via IntersectionObserver
  React.useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < filtered.length) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length, visibleCount]);

  const visible = filtered.slice(0, visibleCount);

  const filterPanel = (
    <ProductFilters
      products={products}
      filters={filters}
      onFiltersChange={handleFiltersChange}
      resultCount={filtered.length}
    />
  );

  return (
    <div>
      <CategoryHero
        category={category}
        activeSubSlug={activeSubSlug}
        onSubcategoryClick={handleSubcategoryClick}
      />

      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-foreground-muted">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            producto{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {(filters.subcategories.length +
                    filters.brands.length +
                    (filters.minRating > 0 ? 1 : 0) +
                    (filters.inStockOnly ? 1 : 0)) > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {filters.subcategories.length +
                        filters.brands.length +
                        (filters.minRating > 0 ? 1 : 0) +
                        (filters.inStockOnly ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto p-5">
                <SheetHeader className="mb-4">
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                {filterPanel}
              </SheetContent>
            </Sheet>

            {/* Sort dropdown */}
            <Select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortValue)}
              className="w-48 text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Main layout: sidebar + grid */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border-subtle bg-card p-5">
              {filterPanel}
            </div>
          </aside>

          {/* Product grid */}
          <div className="min-w-0 flex-1">
            <ProductGrid products={visible} />

            {/* Infinite scroll sentinel */}
            <div ref={loaderRef} className="py-4" />

            {/* Load more hint */}
            {visibleCount < filtered.length && (
              <div className="mt-2 text-center">
                <p className="text-xs text-foreground-muted">
                  Mostrando {visibleCount} de {filtered.length} — cargando más...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
