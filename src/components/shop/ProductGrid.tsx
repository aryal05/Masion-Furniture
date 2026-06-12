"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductListRow } from "@/components/product/ProductListRow";
import { staggerContainer } from "@/components/motion/presets";
import type { Product } from "@/types";

interface Props {
  products: Product[];
  view: "grid" | "list";
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onQuickView: (p: Product) => void;
  onClearFilters: () => void;
}

export function ProductGrid({
  products, view, isLoading, hasNextPage,
  isFetchingNextPage, fetchNextPage, onQuickView, onClearFilters,
}: Props) {
  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && hasNextPage && !isFetchingNextPage && fetchNextPage(),
      { rootMargin: "600px" } // prefetch before user reaches bottom
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <SkeletonGrid count={9} />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-walnut/5 text-3xl">🪑</div>
        <h2 className="font-display text-2xl">Nothing matches those filters</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Try widening your price range or removing a material filter.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-6 rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <>
      <motion.div
        layout
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className={
          view === "grid"
            ? "grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3"
            : "flex flex-col gap-6"
        }
      >
        {products.map((p) =>
          view === "grid" ? (
            <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
          ) : (
            <ProductListRow key={p.id} product={p} onQuickView={onQuickView} />
          )
        )}
      </motion.div>

      {isFetchingNextPage && <div className="mt-10"><SkeletonGrid count={3} /></div>}
      <div ref={sentinelRef} aria-hidden className="h-px" />
    </>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[3/4] animate-shimmer rounded-card" />
          <div className="mt-4 h-5 w-3/4 animate-shimmer rounded" />
          <div className="mt-2 h-4 w-1/3 animate-shimmer rounded" />
        </div>
      ))}
    </div>
  );
}