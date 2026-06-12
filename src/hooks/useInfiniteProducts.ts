"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { ShopFilters } from "@/lib/filters";

const PAGE_SIZE = 12;

const SORT_MAP: Record<string, { column: string; ascending: boolean }> = {
  featured:    { column: "is_bestseller", ascending: false },
  "price-asc": { column: "price", ascending: true },
  "price-desc":{ column: "price", ascending: false },
  newest:      { column: "created_at", ascending: false },
  rating:      { column: "average_rating", ascending: false },
  bestselling: { column: "units_sold", ascending: false },
};

async function fetchProducts(filters: ShopFilters, page: number) {
  let q = supabase
    .from("products")
    .select("*, product_images(url, alt, sort_order), categories!inner(slug)", { count: "exact" })
    .eq("status", "published");

  if (filters.category) q = q.eq("categories.slug", filters.category);
  if (filters.materials.length) q = q.in("material", filters.materials);
  if (filters.priceMin != null) q = q.gte("price", filters.priceMin);
  if (filters.priceMax != null) q = q.lte("price", filters.priceMax);
  if (filters.rating) q = q.gte("average_rating", filters.rating);
  if (filters.inStock) q = q.gt("total_stock", 0); // denormalized column, see note below

  const { column, ascending } = SORT_MAP[filters.sort];
  q = q.order(column, { ascending }).order("id"); // stable tiebreak for pagination

  const from = page * PAGE_SIZE;
  const { data, count, error } = await q.range(from, from + PAGE_SIZE - 1);
  if (error) throw error;
  return { products: data ?? [], total: count ?? 0, page };
}

export function useInfiniteProducts(filters: ShopFilters) {
  return useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) => fetchProducts(filters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) =>
      (last.page + 1) * PAGE_SIZE < last.total ? last.page + 1 : undefined,
    staleTime: 60_000,
    placeholderData: (prev) => prev, // keep old grid visible while refetching
  });
}