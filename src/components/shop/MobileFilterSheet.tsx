"use client";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useEffect } from "react";
import { FilterPanel } from "./FilterPanel";
import type { ShopFilters } from "@/lib/filters";

interface Props {
  open: boolean;
  onClose: () => void;
  filters: ShopFilters;
  setFilters: (p: Partial<ShopFilters>) => void;
  toggleArrayValue: (key: "materials" | "colors", v: string) => void;
  clearAll: () => void;
  resultCount: number;
}

export function MobileFilterSheet({
  open, onClose, filters, setFilters, toggleArrayValue, clearAll, resultCount,
}: Props) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 500) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/40 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog" aria-label="Product filters"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col rounded-t-2xl bg-ivory lg:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            drag="y" dragConstraints={{ top: 0 }} dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-walnut/20" />
            </div>

            <header className="flex items-center justify-between px-6 pb-4">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={clearAll} className="text-sm text-walnut underline">Clear all</button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                toggleArrayValue={toggleArrayValue}
              />
            </div>

            <footer className="border-t border-walnut/10 p-4">
              <button
                onClick={onClose}
                className="w-full rounded-btn bg-walnut py-4 text-sm uppercase tracking-label text-ivory"
              >
                Show {resultCount} results
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}