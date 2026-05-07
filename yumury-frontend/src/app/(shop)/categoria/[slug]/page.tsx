import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryContent } from "@/components/product/CategoryContent";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Catálogo`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return <CategoryContent products={products} category={category} />;
}
