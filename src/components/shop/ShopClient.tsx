"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShopFilters } from "@/hooks/useShopFilters";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import { countActiveFilters } from "@/lib/filters";
import { FilterPanel } from "./FilterPanel";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { ProductGrid } from "./ProductGrid";
import { SortDropdown } from "./SortDropdown";
import { ViewToggle } from "./ViewToggle";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import type { Product } from "@/types";

export function ShopClient() {
  const { filters, mergeFilters, toggleArrayValue, clearAll, isPending } = useShopFilters();
  const query = useInfiniteProducts(filters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const products = useMemo(
    () => query.data?.pages.flatMap((p) => p.products) ?? [],
    [query.data]
  );
  const total = query.data?.pages[0]?.total ?? 0;
  const activeCount = countActiveFilters(filters);

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 pt-28 pb-24">
      <header className="mb-8">
        <p className="eyebrow">Collection</p>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>Shop All</h1>
      </header>

      <div className="flex gap-10">
        {/* Desktop filter panel */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <FilterPanel
            filters={filters}
            setFilters={mergeFilters}
            toggleArrayValue={toggleArrayValue}
          />
        </aside>

        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-walnut/10 pb-4">
            <p className="text-sm text-muted" aria-live="polite">
              {query.isLoading ? "Loading…" : `Showing ${products.length} of ${total} products`}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 rounded-btn border border-walnut/20 px-4 py-2.5 text-sm"
              >
                Filters {activeCount > 0 && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-walnut text-[11px] text-ivory">
                    {activeCount}
                  </span>
                )}
              </button>
              <ViewToggle view={filters.view} onChange={(view) => mergeFilters({ view })} />
              <SortDropdown value={filters.sort} onChange={(sort) => mergeFilters({ sort })} />
            </div>
          </div>

          {/* Active chips */}
          <AnimatePresence>
            {activeCount > 0 && (
              <ActiveFilterChips
                filters={filters}
                setFilters={mergeFilters}
                toggleArrayValue={toggleArrayValue}
                clearAll={clearAll}
              />
            )}
          </AnimatePresence>

          {/* Grid — dimmed while URL transition pending */}
          <motion.div animate={{ opacity: isPending || query.isFetching && !query.isFetchingNextPage ? 0.5 : 1 }}>
            <ProductGrid
              products={products}
              view={filters.view}
              isLoading={query.isLoading}
              hasNextPage={query.hasNextPage}
              isFetchingNextPage={query.isFetchingNextPage}
              fetchNextPage={query.fetchNextPage}
              onQuickView={setQuickViewProduct}
              onClearFilters={clearAll}
            />
          </motion.div>
        </div>
      </div>

      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        setFilters={mergeFilters}
        toggleArrayValue={toggleArrayValue}
        clearAll={clearAll}
        resultCount={total}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}