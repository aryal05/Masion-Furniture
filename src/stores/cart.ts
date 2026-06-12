import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  variantId: string;
  productId: string;
  name: string;
  variantLabel: string;
  image: string;
  price: number;
  quantity: number;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  subtotal: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.maxStock) }
                  : i
              ),
            };
          }
          return { items: [...s.items, item] };
        }),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.variantId !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.variantId === id ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) } : i
          ),
        })),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "maison-cart", partialize: (s) => ({ items: s.items }) }
  )
);