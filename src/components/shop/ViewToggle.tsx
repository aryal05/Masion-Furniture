"use client";
import { motion } from "framer-motion";

interface Props {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="hidden items-center rounded-btn border border-walnut/20 p-1 md:flex">
      <button
        onClick={() => onChange("grid")}
        aria-pressed={view === "grid"}
        aria-label="Grid view"
        className="relative grid h-8 w-8 place-items-center rounded"
      >
        {view === "grid" && (
          <motion.span
            layoutId="view-toggle-bg"
            className="absolute inset-0 rounded bg-walnut"
          />
        )}
        <GridIcon className={`relative z-10 ${view === "grid" ? "text-ivory" : "text-charcoal"}`} />
      </button>
      <button
        onClick={() => onChange("list")}
        aria-pressed={view === "list"}
        aria-label="List view"
        className="relative grid h-8 w-8 place-items-center rounded"
      >
        {view === "list" && (
          <motion.span
            layoutId="view-toggle-bg"
            className="absolute inset-0 rounded bg-walnut"
          />
        )}
        <ListIcon className={`relative z-10 ${view === "list" ? "text-ivory" : "text-charcoal"}`} />
      </button>
    </div>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={className}>
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={className}>
      <rect x="1" y="2" width="14" height="3" rx="1" />
      <rect x="1" y="7" width="14" height="3" rx="1" />
      <rect x="1" y="12" width="14" height="3" rx="1" />
    </svg>
  );
}
