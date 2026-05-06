import type { CategorySlug } from "./category";

export type ShippingType = "standard" | "express" | "maritime";
export type StockLevel = "high" | "medium" | "low" | "out";

export type ProductImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  type: "weight" | "size" | "color" | "model" | "capacity";
  /** Amount added to base price (0 for the default variant) */
  priceModifier: number;
  inStock: boolean;
  image?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
  group?: string;
};

export type ComboItem = {
  productId?: string;
  name: string;
  quantity: number;
  unit: string;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: CategorySlug;
  subcategory: string;
  brand?: string;
  countryOfOrigin?: string;

  price: number;
  comparePrice?: number;
  currency: "USD";

  thumbnail: string;
  images: ProductImage[];

  variants?: ProductVariant[];
  specs?: ProductSpec[];

  inStock: boolean;
  stockLevel?: StockLevel;
  estimatedDelivery: string;
  shippingType: ShippingType;
  weight?: number;

  tags: string[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  isNew?: boolean;
  bestseller?: boolean;

  isCombo?: boolean;
  comboItems?: ComboItem[];
  comboTheme?: string;
  comboBadge?: string;
};
