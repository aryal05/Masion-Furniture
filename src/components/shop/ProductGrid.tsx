"use client";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/shop/ProductCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { staggerContainer, staggerChild } from "@/lib/motion";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  view: "grid" | "list";
  isLoading: boolean;
  onClearFilters: () => void;
}

export function ProductGrid({
  products,
  view,
  isLoading,
  onClearFilters,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
        <div className="mb-6 w-20 h-20 rounded-full bg-surface flex items-center justify-center text-4xl">
          🪑
        </div>
        <h2 className="font-display text-2xl font-black text-ink">No matches found</h2>
        <p className="mt-2 text-sm text-body">
          Try widening your price range or removing some filters to see more results.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-6 bg-primary text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <motion.div
      layout
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={staggerChild}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}