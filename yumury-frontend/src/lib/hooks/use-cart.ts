"use client";

import {
  useCartStore,
  selectTotalItems,
  selectSubtotal,
  selectShippingFee,
  selectTotal,
} from "@/lib/stores/cart-store";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clear = useCartStore((s) => s.clear);

  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);
  const shippingFee = useCartStore(selectShippingFee);
  const total = useCartStore(selectTotal);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    subtotal,
    shippingFee,
    total,
    isEmpty: items.length === 0,
  };
}
