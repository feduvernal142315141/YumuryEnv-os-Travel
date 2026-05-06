export type CategorySlug =
  | "alimentos"
  | "combos"
  | "electrodomesticos"
  | "vehiculos";

export type Subcategory = {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  name: string;
  description: string;
  image: string;
  productCount: number;
};

export type Category = {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  /** Lucide icon name */
  icon: string;
  /** Hex color associated with the category */
  color: string;
  productCount: number;
  subcategories: Subcategory[];
  featured: boolean;
};
