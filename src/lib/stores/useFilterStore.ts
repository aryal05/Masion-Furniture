'use client';

import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Material } from '@/types';
import type { SortOption } from '@/lib/filters';

interface FilterState extends Filter {
  sort: SortOption;
  page: number;
  view: 'grid' | 'list';
}

interface FilterStore extends FilterState {
  setCategory: (category: string | undefined) => void;
  setPriceRange: (range: [number, number] | undefined) => void;
  setMaterial: (material: Material | undefined) => void;
  setRating: (rating: number | undefined) => void;
  setInStock: (inStock: boolean | undefined) => void;
  setFreeShipping: (freeShipping: boolean | undefined) => void;
  setOnSale: (onSale: boolean | undefined) => void;
  setSort: (sort: FilterState['sort']) => void;
  setPage: (page: number) => void;
  setView: (view: FilterState['view']) => void;
  clearFilters: () => void;
  syncFromURL: () => void;
  syncToURL: () => void;
}

const initialState: FilterState = {
  category: undefined,
  priceRange: undefined,
  material: undefined,
  rating: undefined,
  inStock: undefined,
  freeShipping: undefined,
  onSale: undefined,
  sort: 'featured',
  page: 1,
  view: 'grid'
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...initialState,

  setCategory: (category) => {
    set({ category, page: 1 });
    get().syncToURL();
  },

  setPriceRange: (priceRange) => {
    set({ priceRange, page: 1 });
    get().syncToURL();
  },

  setMaterial: (material) => {
    set({ material, page: 1 });
    get().syncToURL();
  },

  setRating: (rating) => {
    set({ rating, page: 1 });
    get().syncToURL();
  },

  setInStock: (inStock) => {
    set({ inStock, page: 1 });
    get().syncToURL();
  },

  setFreeShipping: (freeShipping) => {
    set({ freeShipping, page: 1 });
    get().syncToURL();
  },

  setOnSale: (onSale) => {
    set({ onSale, page: 1 });
    get().syncToURL();
  },

  setSort: (sort) => {
    set({ sort, page: 1 });
    get().syncToURL();
  },

  setPage: (page) => {
    set({ page });
    get().syncToURL();
  },

  setView: (view) => {
    set({ view });
    get().syncToURL();
  },

  clearFilters: () => {
    set({ ...initialState });
    get().syncToURL();
  },

  syncFromURL: () => {
    if (typeof window === 'undefined') return;
    
    const searchParams = new URLSearchParams(window.location.search);
    
    set({
      category: searchParams.get('category') || undefined,
      priceRange: searchParams.get('price') 
        ? (searchParams.get('price')?.split('-').map(Number) as [number, number])
        : undefined,
      material: (searchParams.get('material') as Material) || undefined,
      rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
      inStock: searchParams.get('inStock') === 'true' ? true : undefined,
      freeShipping: searchParams.get('freeShipping') === 'true' ? true : undefined,
      onSale: searchParams.get('onSale') === 'true' ? true : undefined,
      sort: (searchParams.get('sort') as SortOption) || 'featured',
      page: Number(searchParams.get('page')) || 1,
      view: (searchParams.get('view') as FilterState['view']) || 'grid'
    });
  },

  syncToURL: () => {
    if (typeof window === 'undefined') return;
    
    const state = get();
    const searchParams = new URLSearchParams();
    
    if (state.category) searchParams.set('category', state.category);
    if (state.priceRange) searchParams.set('price', state.priceRange.join('-'));
    if (state.material) searchParams.set('material', state.material);
    if (state.rating) searchParams.set('rating', state.rating.toString());
    if (state.inStock) searchParams.set('inStock', 'true');
    if (state.freeShipping) searchParams.set('freeShipping', 'true');
    if (state.onSale) searchParams.set('onSale', 'true');
    if (state.sort !== 'featured') searchParams.set('sort', state.sort);
    if (state.page > 1) searchParams.set('page', state.page.toString());
    if (state.view !== 'grid') searchParams.set('view', state.view);
    
    const newURL = `${window.location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }
}));

// Hook to initialize store from URL on mount
export function useInitializeFilters() {
  const syncFromURL = useFilterStore((state) => state.syncFromURL);
  
  // Only run on client side
  if (typeof window !== 'undefined') {
    syncFromURL();
  }
}
