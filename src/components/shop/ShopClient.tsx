'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useFilterStore } from '@/lib/stores/useFilterStore';
import { products } from '@/lib/data/products';
import { filterProducts, sortProducts, paginateProducts, getTotalPages, getFilterCount } from '@/lib/filterProducts';
import { fadeUp, staggerContainer, scaleIn, durations, easeOut } from '@/lib/motion';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { SortDropdown } from './SortDropdown';
import { ViewToggle } from './ViewToggle';
import { ActiveFilterChips } from './ActiveFilterChips';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { ShopSkeleton } from './ShopSkeleton';
import { RecentlyViewed } from './RecentlyViewed';
import type { Filter } from '@/types';

const PAGE_SIZE = 12;

export function ShopClient() {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const {
    category, priceRange, material, rating, inStock, freeShipping, onSale,
    sort, page, view,
    setCategory, setPriceRange, setMaterial, setRating, setInStock, setFreeShipping, setOnSale,
    setSort, setPage, setView,
    syncFromURL, clearFilters,
  } = useFilterStore();

  // Hydrate from URL on mount
  useEffect(() => {
    syncFromURL();
    // Simulate initial load
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, [syncFromURL]);

  // Build current filter object
  const currentFilters: Filter = useMemo(() => ({
    category: category || undefined,
    priceRange: priceRange || undefined,
    material: material || undefined,
    rating: rating || undefined,
    inStock: inStock || undefined,
    freeShipping: freeShipping || undefined,
    onSale: onSale || undefined,
  }), [category, priceRange, material, rating, inStock, freeShipping, onSale]);

  // Filter → Sort → Paginate
  const filtered = useMemo(() => filterProducts(products, currentFilters), [currentFilters]);
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const totalPages = useMemo(() => getTotalPages(sorted.length, PAGE_SIZE), [sorted.length]);
  const pageProducts = useMemo(() => paginateProducts(sorted, page, PAGE_SIZE), [sorted, page]);
  const filterCount = useMemo(() => getFilterCount(currentFilters), [currentFilters]);

  const handleClearAll = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  if (isLoading) {
    return <ShopSkeleton />;
  }

  return (
    <section aria-labelledby="shop-heading" className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-line">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 lg:py-12">
          <m.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: durations.base, ease: easeOut }}
          >
            <nav className="text-xs text-muted mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li>/</li>
                <li className="text-ink font-medium">Shop</li>
              </ol>
            </nav>
            <h1 id="shop-heading" className="text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              Shop All Furniture
            </h1>
            <p className="mt-2 text-body max-w-xl">
              Discover {products.length}+ handcrafted pieces designed for modern living. Filter by category, material, and price.
            </p>
          </m.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8">
        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <aside
            className="hidden lg:block w-64 shrink-0"
            style={{
              position: 'sticky',
              top: 'calc(var(--header-height) + 1rem)',
              maxHeight: 'calc(100vh - var(--header-height) - 2rem)',
              overflowY: 'auto',
            }}
          >
            <FilterSidebar
              filters={currentFilters}
              onCategoryChange={setCategory}
              onPriceRangeChange={setPriceRange}
              onMaterialChange={setMaterial}
              onRatingChange={setRating}
              onInStockChange={setInStock}
              onFreeShippingChange={setFreeShipping}
              onOnSaleChange={setOnSale}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-line rounded-full text-sm font-medium text-body hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {filterCount > 0 && (
                    <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {filterCount}
                    </span>
                  )}
                </button>

                <span className="text-sm text-muted">
                  {sorted.length} product{sorted.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <SortDropdown value={sort} onChange={setSort} />
                <ViewToggle view={view} onChange={setView} />
              </div>
            </div>

            {/* Active filter chips */}
            <ActiveFilterChips
              filters={currentFilters}
              onCategoryChange={setCategory}
              onPriceRangeChange={setPriceRange}
              onMaterialChange={setMaterial}
              onRatingChange={setRating}
              onInStockChange={setInStock}
              onFreeShippingChange={setFreeShipping}
              onOnSaleChange={setOnSale}
              onClearAll={handleClearAll}
            />

            {/* Product grid or empty state */}
            {sorted.length === 0 ? (
              <m.div
                className="py-24 text-center"
                variants={shouldReduceMotion ? undefined : fadeUp}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface flex items-center justify-center">
                  <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">No products found</h3>
                <p className="text-muted mb-6 max-w-sm mx-auto">
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Clear All Filters
                </button>
              </m.div>
            ) : (
              <>
                <m.div
                  className={`grid gap-3 md:gap-4 lg:gap-6 ${
                    view === 'grid'
                      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                      : 'grid-cols-1'
                  }`}
                  variants={shouldReduceMotion ? undefined : staggerContainer(0.06)}
                  initial={shouldReduceMotion ? undefined : 'hidden'}
                  animate={shouldReduceMotion ? undefined : 'visible'}
                  key={`${sort}-${page}-${category}-${material}`}
                >
                  {pageProducts.map((product) => (
                    <m.div
                      key={product.id}
                      variants={shouldReduceMotion ? undefined : scaleIn}
                    >
                      <ProductCard product={product} />
                    </m.div>
                  ))}
                </m.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination 
                      currentPage={page} 
                      totalPages={totalPages} 
                      onPageChange={setPage} 
                    />
                  </div>
                )}
              </>
            )}

            {/* Recently Viewed */}
            <div className="mt-16">
              <RecentlyViewed />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={currentFilters}
        onApply={() => setMobileFilterOpen(false)}
        onClear={clearFilters}
      >
        <FilterSidebar
          filters={currentFilters}
          onCategoryChange={setCategory}
          onPriceRangeChange={setPriceRange}
          onMaterialChange={setMaterial}
          onRatingChange={setRating}
          onInStockChange={setInStock}
          onFreeShippingChange={setFreeShipping}
          onOnSaleChange={setOnSale}
        />
      </MobileFilterDrawer>
    </section>
  );
}