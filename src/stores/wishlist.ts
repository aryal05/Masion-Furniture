import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[]; // product IDs
  add: (productId: string) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId) =>
        set((s) => ({
          items: s.items.includes(productId) ? s.items : [...s.items, productId],
        })),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((id) => id !== productId) })),
      toggle: (productId) => {
        const { items, add, remove } = get();
        items.includes(productId) ? remove(productId) : add(productId);
      },
      has: (productId) => get().items.includes(productId),
      clear: () => set({ items: [] }),
    }),
    { name: "maison-wishlist" }
  )
);
