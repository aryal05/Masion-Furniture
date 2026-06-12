import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AddressForm, ShippingForm, PaymentForm } from "@/lib/checkout-schemas";

export type CheckoutStep = 1 | 2 | 3 | 4;

interface CheckoutState {
  step: CheckoutStep;
  maxReachedStep: CheckoutStep;
  address: AddressForm | null;
  shipping: ShippingForm | null;
  payment: PaymentForm | null;
  discountCode: string | null;
  goTo: (step: CheckoutStep) => void;
  setAddress: (a: AddressForm) => void;
  setShipping: (s: ShippingForm) => void;
  setPayment: (p: PaymentForm) => void;
  setDiscountCode: (c: string | null) => void;
  reset: () => void;
}

export const useCheckout = create<CheckoutState>()(
  persist(
    (set, get) => ({
      step: 1, maxReachedStep: 1,
      address: null, shipping: null, payment: null, discountCode: null,
      goTo: (step) => {
        // Only allow navigating to previously-reached steps (back is always allowed)
        if (step <= get().maxReachedStep) set({ step });
      },
      setAddress: (address) =>
        set((s) => ({ address, step: 2, maxReachedStep: Math.max(s.maxReachedStep, 2) as CheckoutStep })),
      setShipping: (shipping) =>
        set((s) => ({ shipping, step: 3, maxReachedStep: Math.max(s.maxReachedStep, 3) as CheckoutStep })),
      setPayment: (payment) =>
        set((s) => ({ payment, step: 4, maxReachedStep: 4 })),
      setDiscountCode: (discountCode) => set({ discountCode }),
      reset: () => set({ step: 1, maxReachedStep: 1, address: null, shipping: null, payment: null, discountCode: null }),
    }),
    {
      name: "maison-checkout",
      storage: createJSONStorage(() => sessionStorage), // clears on tab close
    }
  )
);