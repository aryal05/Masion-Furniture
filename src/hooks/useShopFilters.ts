"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import {
  parseFilters,
  serializeFilters,
  DEFAULT_FILTERS,
  type ShopFilters,
  type SortOption,
} from "@/lib/filters";

export function useShopFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(
    () => parseFilters(searchParams),
    [searchParams]
  );

  const setFilters = useCallback(
    (next: ShopFilters) => {
      const qs = serializeFilters(next);
      startTransition(() => {
        router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [router, pathname]
  );

  /** Merge partial updates into current filters */
  const mergeFilters = useCallback(
    (partial: Partial<ShopFilters>) => {
      setFilters({ ...filters, ...partial });
    },
    [filters, setFilters]
  );

  const updateFilter = useCallback(
    <K extends keyof ShopFilters>(key: K, value: ShopFilters[K]) => {
      setFilters({ ...filters, [key]: value });
    },
    [filters, setFilters]
  );

  /** Generic toggle for array-type filter keys (materials, colors) */
  const toggleArrayValue = useCallback(
    (key: "materials" | "colors", value: string) => {
      const arr = filters[key];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      setFilters({ ...filters, [key]: next });
    },
    [filters, setFilters]
  );

  const toggleMaterial = useCallback(
    (material: string) => toggleArrayValue("materials", material),
    [toggleArrayValue]
  );

  const toggleColor = useCallback(
    (color: string) => toggleArrayValue("colors", color),
    [toggleArrayValue]
  );

  const setSort = useCallback(
    (sort: SortOption) => updateFilter("sort", sort),
    [updateFilter]
  );

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setFilters({ ...filters, priceMin: min, priceMax: max });
    },
    [filters, setFilters]
  );

  const resetFilters = useCallback(
    () => setFilters(DEFAULT_FILTERS),
    [setFilters]
  );

  /** Alias for resetFilters — used by ShopClient */
  const clearAll = resetFilters;

  return {
    filters,
    setFilters,
    mergeFilters,
    updateFilter,
    toggleArrayValue,
    toggleMaterial,
    toggleColor,
    setSort,
    setPriceRange,
    resetFilters,
    clearAll,
    isPending,
  };
}
