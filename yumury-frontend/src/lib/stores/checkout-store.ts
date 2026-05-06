import { create } from "zustand";
import type { OrderPayment } from "@/types";

export type CheckoutStep = "recipient" | "shipping" | "payment" | "review";

export type CheckoutShipping = {
  type: "standard" | "express" | "maritime";
  /** Fee snapshot at the time of selection */
  fee: number;
};

type CheckoutState = {
  step: CheckoutStep;
  recipientFamilyId: string | null;
  giftMessage: string;
  shipping: CheckoutShipping | null;
  payment: Partial<OrderPayment> | null;

  setStep: (step: CheckoutStep) => void;
  next: () => void;
  back: () => void;

  setRecipient: (familyId: string) => void;
  setGiftMessage: (msg: string) => void;
  setShipping: (shipping: CheckoutShipping) => void;
  setPayment: (payment: Partial<OrderPayment>) => void;

  reset: () => void;
};

const ORDER: CheckoutStep[] = ["recipient", "shipping", "payment", "review"];

const initial = {
  step: "recipient" as CheckoutStep,
  recipientFamilyId: null,
  giftMessage: "",
  shipping: null,
  payment: null,
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...initial,

  setStep: (step) => set({ step }),
  next: () => {
    const i = ORDER.indexOf(get().step);
    if (i < ORDER.length - 1) set({ step: ORDER[i + 1] });
  },
  back: () => {
    const i = ORDER.indexOf(get().step);
    if (i > 0) set({ step: ORDER[i - 1] });
  },

  setRecipient: (recipientFamilyId) => set({ recipientFamilyId }),
  setGiftMessage: (giftMessage) => set({ giftMessage }),
  setShipping: (shipping) => set({ shipping }),
  setPayment: (payment) => set({ payment }),

  reset: () => set(initial),
}));
