"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { ShopFilters } from "@/lib/filters";

interface Props {
  filters: ShopFilters;
  setFilters: (p: Partial<ShopFilters>) => void;
  toggleArrayValue: (key: "materials" | "colors", v: string) => void;
  clearAll: () => void;
}

export function ActiveFilterChips({ filters, setFilters, toggleArrayValue, clearAll }: Props) {
  const chips: { key: string; label: string; remove: () => void }[] = [];

  if (filters.category)
    chips.push({ key: "cat", label: `Category: ${filters.category}`, remove: () => setFilters({ category: null }) });
  filters.materials.forEach((m) =>
    chips.push({ key: `m-${m}`, label: `Material: ${m}`, remove: () => toggleArrayValue("materials", m) }));
  filters.colors.forEach((c) =>
    chips.push({ key: `c-${c}`, label: `Color: ${c}`, remove: () => toggleArrayValue("colors", c) }));
  if (filters.priceMin != null || filters.priceMax != null)
    chips.push({
      key: "price",
      label: `NPR ${(filters.priceMin ?? 0).toLocaleString()} – ${(filters.priceMax ?? 500000).toLocaleString()}`,
      remove: () => setFilters({ priceMin: null, priceMax: null }),
    });
  if (filters.rating)
    chips.push({ key: "rating", label: `${filters.rating}★ & up`, remove: () => setFilters({ rating: null }) });
  if (filters.inStock)
    chips.push({ key: "stock", label: "In stock", remove: () => setFilters({ inStock: false }) });

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
      <button onClick={clearAll} className="text-xs text-walnut underline underline-offset-4">
        Clear all
      </button>
    </motion.div>
  );
}