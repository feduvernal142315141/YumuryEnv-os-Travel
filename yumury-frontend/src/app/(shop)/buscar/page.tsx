import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchContent } from "@/components/product/SearchContent";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const query = sp.q ?? "";
  return {
    title: query ? `Resultados para "${query}"` : "Buscar productos",
    description: query
      ? `Encuentra "${query}" en el catálogo Yumury`
      : "Busca entre más de 160 productos para enviar a Matanzas, Cuba",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = sp.q ?? "";

  return (
    <Suspense>
      <SearchContent initialQuery={query} />
    </Suspense>
  );
}
