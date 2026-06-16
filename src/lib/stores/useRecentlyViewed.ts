'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface RecentlyViewedState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const MAX_RECENTLY_VIEWED = 6;

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          // Remove if already exists (to move to front)
          const filtered = state.items.filter((item) => item.id !== product.id);
          // Add to front, limit to max
          const updated = [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
          return { items: updated };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },
      
      clear: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'recently-viewed-storage',
      // Only persist on client side
      skipHydration: true
    }
  )
);

// Hook to hydrate store from localStorage (SSR-safe)
export function useHydrateRecentlyViewed() {
  if (typeof window !== 'undefined') {
    useRecentlyViewed.persist.rehydrate();
  }
}
