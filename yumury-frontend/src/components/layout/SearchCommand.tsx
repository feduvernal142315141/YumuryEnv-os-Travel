"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Clock, ArrowUpRight } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/ui-store";
import { allProducts, categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const RECENT_KEY = "yumury:recent-searches";
const STARTER_QUERIES = ["Combo familiar", "Pollo congelado", "EcoFlow", "Moto eléctrica"];

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function persistRecent(query: string) {
  if (typeof window === "undefined" || !query.trim()) return;
  const current = readRecent().filter((q) => q.toLowerCase() !== query.toLowerCase());
  const next = [query, ...current].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function SearchCommand() {
  const router = useRouter();
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const [query, setQuery] = React.useState("");
  const [recent, setRecent] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (open) setRecent(readRecent());
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const navigate = (href: string, q?: string) => {
    if (q) persistRecent(q);
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const trimmed = query.trim().toLowerCase();
  const showResults = trimmed.length > 0;

  const matchingProducts = React.useMemo(() => {
    if (!showResults) return [];
    return allProducts
      .filter((p) =>
        [p.name, p.description, p.brand ?? "", ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(trimmed),
      )
      .slice(0, 6);
  }, [trimmed, showResults]);

  const matchingCombos = matchingProducts.filter((p) => p.isCombo);
  const matchingRegular = matchingProducts.filter((p) => !p.isCombo);

  const matchingCategories = React.useMemo(() => {
    if (!showResults) return [];
    return categories
      .flatMap((c) =>
        c.subcategories.map((s) => ({
          name: `${s.name} · ${c.name}`,
          slug: `${c.slug}/${s.slug}`,
          parent: c.name,
        })),
      )
      .filter((s) => s.name.toLowerCase().includes(trimmed))
      .slice(0, 4);
  }, [trimmed, showResults]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Buscar productos, combos, categorías…"
      />
      <CommandList>
        {showResults && matchingProducts.length === 0 && matchingCategories.length === 0 && (
          <CommandEmpty>
            <Search className="mx-auto mb-3 h-8 w-8 text-foreground-muted" />
            <p className="text-sm font-medium text-foreground">
              No encontramos resultados para “{query}”
            </p>
            <p className="mt-1 text-xs text-foreground-muted">
              Prueba con otra palabra o explora las categorías.
            </p>
          </CommandEmpty>
        )}

        {!showResults && (
          <>
            {recent.length > 0 && (
              <CommandGroup heading="Búsquedas recientes">
                {recent.map((q) => (
                  <CommandItem
                    key={q}
                    onSelect={() => setQuery(q)}
                    className="gap-3"
                  >
                    <Clock className="h-4 w-4 text-foreground-muted" />
                    <span className="text-sm">{q}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading="Sugerencias">
              {STARTER_QUERIES.map((q) => (
                <CommandItem key={q} onSelect={() => setQuery(q)}>
                  <Sparkles className="h-4 w-4 text-brand-orange" />
                  <span className="text-sm">{q}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {matchingRegular.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Productos">
              {matchingRegular.map((p) => (
                <CommandItem
                  key={p.id}
                  value={`${p.name} ${p.description}`}
                  onSelect={() => navigate(`/producto/${p.slug}`, query)}
                  className="gap-3"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={p.thumbnail} alt={p.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{p.name}</span>
                    {p.brand && (
                      <span className="text-xs text-foreground-muted">{p.brand}</span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums">
                    ${p.price.toFixed(2)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {matchingCombos.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Combos">
              {matchingCombos.map((p) => (
                <CommandItem
                  key={p.id}
                  value={`combo ${p.name}`}
                  onSelect={() => navigate(`/producto/${p.slug}`, query)}
                  className="gap-3"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={p.thumbnail} alt={p.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{p.name}</span>
                    {p.comboBadge && (
                      <span className="text-xs text-brand-orange">{p.comboBadge}</span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums">
                    ${p.price.toFixed(2)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {matchingCategories.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Categorías">
              {matchingCategories.map((c) => (
                <CommandItem
                  key={c.slug}
                  onSelect={() => navigate(`/categoria/${c.slug}`, query)}
                  className="gap-3"
                >
                  <ArrowUpRight className="h-4 w-4 text-foreground-muted" />
                  <span className="text-sm">{c.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>

      <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-4 py-2.5 text-xs text-foreground-muted">
        <div className="flex items-center gap-2">
          <Kbd>↵</Kbd>
          <span>Seleccionar</span>
          <Kbd>esc</Kbd>
          <span>Cerrar</span>
        </div>
        <span className="hidden sm:inline">{allProducts.length} productos disponibles</span>
      </div>
    </CommandDialog>
  );
}

type SearchTriggerProps = {
  className?: string;
  variant?: "default" | "compact";
};

export function SearchTrigger({ className, variant = "default" }: SearchTriggerProps) {
  const setOpen = useUIStore((s) => s.setSearchOpen);

  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Buscar"
        onClick={() => setOpen(true)}
        className={className}
      >
        <Search className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group inline-flex h-10 items-center gap-3 rounded-full border border-border-subtle bg-card/60 px-4 text-sm text-foreground-muted shadow-sm transition-all hover:border-border hover:bg-card hover:shadow-md",
        className,
      )}
    >
      <Search className="h-4 w-4" />
      <span className="hidden md:inline">Buscar arroz, EcoFlow, motos…</span>
      <span className="md:hidden">Buscar…</span>
      <span className="ml-auto hidden items-center gap-1 md:inline-flex">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}
