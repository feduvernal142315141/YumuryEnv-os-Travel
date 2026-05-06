import type { Product } from "@/types";
import { alimentos } from "./products/alimentos";
import { electrodomesticos } from "./products/electrodomesticos";
import { vehiculos } from "./products/vehiculos";
import { combos } from "./combos";

export * from "./categories";
export * from "./municipalities";
export * from "./products";
export * from "./combos";
export * from "./families";
export * from "./tracking-events";
export * from "./orders";
export * from "./reviews";
export * from "./testimonials";
export * from "./yumi-responses";
export * from "./faq";
export * from "./user";

export const allProducts: Product[] = [
  ...alimentos,
  ...electrodomesticos,
  ...vehiculos,
  ...combos,
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return allProducts.filter((p) => p.subcategory === subcategory);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return allProducts.filter((p) => p.featured).slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return allProducts.filter((p) => p.bestseller).slice(0, limit);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return allProducts
    .filter((p) => p.id !== productId && p.subcategory === product.subcategory)
    .slice(0, limit);
}

export const searchableProducts = allProducts.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  description: p.description,
  category: p.category,
  subcategory: p.subcategory,
  brand: p.brand,
  tags: p.tags,
}));
