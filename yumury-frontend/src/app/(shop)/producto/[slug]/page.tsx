import * as React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfoClient } from "@/components/product/ProductInfoClient";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ComboItemsList } from "@/components/product/ComboItemsList";
import {
  getProductBySlug,
  getRelatedProducts,
  mockReviews,
} from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.id, 4);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        className="mb-6 flex items-center gap-1.5 text-xs text-foreground-muted"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="h-3 w-3" />
          Inicio
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/categoria/${product.category}`}
          className="capitalize hover:text-primary transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="max-w-[200px] truncate text-foreground">{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:gap-12">
        {/* Gallery — 55% */}
        <div className="md:w-[55%] md:shrink-0">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Info — 45% */}
        <div className="flex-1">
          <ProductInfoClient product={product} />
        </div>
      </div>

      {/* Combo items (if combo) */}
      {product.isCombo && product.comboItems && product.comboItems.length > 0 && (
        <div className="mb-12">
          <ComboItemsList
            items={product.comboItems}
            price={product.price}
            comparePrice={product.comparePrice}
          />
        </div>
      )}

      {/* Tabs: Description, Specs, Reviews, Shipping */}
      <div className="mb-12">
        <ProductTabs product={product} reviews={mockReviews} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <RelatedProducts products={related} />
      )}
    </div>
  );
}
