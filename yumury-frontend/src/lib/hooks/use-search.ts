"use client";

import { useEffect, useMemo, useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { Product } from "@/types";
import { allProducts } from "@/lib/mock-data";

const FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "description", weight: 0.2 },
    { name: "tags", weight: 0.15 },
    { name: "brand", weight: 0.1 },
    { name: "subcategory", weight: 0.05 },
  ],
  threshold: 0.35,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

export type UseSearchResult = {
  query: string;
  setQuery: (q: string) => void;
  results: Product[];
  isLoading: boolean;
};

const DEBOUNCE_MS = 150;

export function useSearch(initialQuery = ""): UseSearchResult {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);

  const fuse = useMemo(() => new Fuse(allProducts, FUSE_OPTIONS), []);

  useEffect(() => {
    if (query.trim() === debouncedQuery.trim()) return;
    setIsLoading(true);
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [query, debouncedQuery]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return [];
    return fuse.search(q).map((r) => r.item);
  }, [debouncedQuery, fuse]);

  return { query, setQuery, results, isLoading };
}
