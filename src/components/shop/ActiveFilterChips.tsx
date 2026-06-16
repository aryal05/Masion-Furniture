"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { Filter, Material } from "@/types";

interface Props {
  filters: Filter;
  onCategoryChange: (category: string | undefined) => void;
  onPriceRangeChange: (range: [number, number] | undefined) => void;
  onMaterialChange: (material: Material | undefined) => void;
  onRatingChange: (rating: number | undefined) => void;
  onInStockChange: (inStock: boolean | undefined) => void;
  onFreeShippingChange: (freeShipping: boolean | undefined) => void;
  onOnSaleChange: (onSale: boolean | undefined) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({
  filters,
  onCategoryChange,
  onPriceRangeChange,
  onMaterialChange,
  onRatingChange,
  onInStockChange,
  onFreeShippingChange,
  onOnSaleChange,
  onClearAll,
}: Props) {
  const chips: { key: string; label: string; remove: () => void }[] = [];

  if (filters.category)
    chips.push({ key: "cat", label: `Category: ${filters.category}`, remove: () => onCategoryChange(undefined) });

  if (filters.material)
    chips.push({ key: "m", label: `Material: ${filters.material}`, remove: () => onMaterialChange(undefined) });

  if (filters.priceRange)
    chips.push({
      key: "price",
      label: `NPR ${filters.priceRange[0].toLocaleString()} – ${filters.priceRange[1].toLocaleString()}`,
      remove: () => onPriceRangeChange(undefined),
    });

  if (filters.rating)
    chips.push({ key: "rating", label: `${filters.rating}★ & up`, remove: () => onRatingChange(undefined) });

  if (filters.inStock)
    chips.push({ key: "stock", label: "In stock", remove: () => onInStockChange(undefined) });

  if (filters.freeShipping)
    chips.push({ key: "shipping", label: "Free shipping", remove: () => onFreeShippingChange(undefined) });

  if (filters.onSale)
    chips.push({ key: "sale", label: "On sale", remove: () => onOnSaleChange(undefined) });



  return (

    <motion.div

      initial={{ opacity: 0, height: 0 }}

      animate={{ opacity: 1, height: "auto" }}

      exit={{ opacity: 0, height: 0 }}

      className="mb-6 flex flex-wrap items-center gap-2 overflow-hidden"

    >

      <AnimatePresence mode="popLayout">

        {chips.map((chip) => (

          <motion.button

            key={chip.key} layout

            initial={{ opacity: 0, scale: 0.85 }}

            animate={{ opacity: 1, scale: 1 }}

            exit={{ opacity: 0, scale: 0.85 }}

            onClick={chip.remove}

            className="flex items-center gap-1.5 rounded-full border border-walnut/20 bg-white px-3.5 py-1.5 text-xs capitalize hover:border-walnut transition-colors"

          >

            {chip.label}

            <span aria-hidden className="text-muted">×</span>

          </motion.button>

        ))}

      </AnimatePresence>

      <button onClick={onClearAll} className="text-xs text-walnut underline underline-offset-4">

        Clear all

      </button>

    </motion.div>

  );

}