import * as React from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

type RelatedProductsProps = {
  products: Product[];
  title?: string;
};

export function RelatedProducts({
  products,
  title = "También te puede interesar",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="mb-6 text-h4 font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
