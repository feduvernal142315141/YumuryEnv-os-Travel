"use client";

import * as React from "react";
import { ProductInfo } from "@/components/product/ProductInfo";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";
import type { Product } from "@/types";

type ProductInfoClientProps = {
  product: Product;
};

/**
 * Client wrapper that coordinates the ref between ProductInfo CTAs
 * and the StickyAddToCart bar (appears when main CTA is out of viewport).
 */
export function ProductInfoClient({ product }: ProductInfoClientProps) {
  const mainCTARef = React.useRef<HTMLElement | null>(null);

  return (
    <>
      <ProductInfo product={product} mainCTARef={mainCTARef} />
      <StickyAddToCart product={product} mainCTARef={mainCTARef} />
    </>
  );
}
