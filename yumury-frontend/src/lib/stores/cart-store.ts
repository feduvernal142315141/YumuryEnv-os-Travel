import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types";

export type CartItem = {
  /** Stable line key: productId + variantId (or just productId when no variant) */
  key: string;
  productId: string;
  slug: string;
  name: string;
  thumbnail: string;
  unitPrice: number;
  quantity: number;
  variantId?: string;
  variantName?: string;
  shippingType: Product["shippingType"];
  weight?: number;
};

type AddItemPayload = {
  product: Product;
  variant?: ProductVariant;
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (payload: AddItemPayload) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

const lineKey = (productId: string, variantId?: string) =>
  variantId ? `${productId}::${variantId}` : productId;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: ({ product, variant, quantity = 1 }) =>
        set((state) => {
          const key = lineKey(product.id, variant?.id);
          const unitPrice = product.price + (variant?.priceModifier ?? 0);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          const newItem: CartItem = {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            thumbnail: product.thumbnail,
            unitPrice,
            quantity,
            variantId: variant?.id,
            variantName: variant?.name,
            shippingType: product.shippingType,
            weight: product.weight,
          };
          return { items: [...state.items, newItem] };
        }),
      removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "yumury:cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

// === Selectors (use as `useCartStore(selectTotalItems)`) ===

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((acc, i) => acc + i.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

/** Shipping fee derived from the most expensive shipping type in the cart. */
export const selectShippingFee = (state: CartState) => {
  if (state.items.length === 0) return 0;
  const has = (t: Product["shippingType"]) => state.items.some((i) => i.shippingType === t);
  if (has("express")) return 18.99;
  if (has("standard")) return 8.99;
  if (has("maritime")) return 4.99;
  return 0;
};

export const selectTotal = (state: CartState) => selectSubtotal(state) + selectShippingFee(state);
