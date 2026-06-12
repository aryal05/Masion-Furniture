"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  onRowClick,
  loading,
  emptyMessage = "No data found",
}: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      })
    : data;

  return (
    <div className="overflow-x-auto rounded-card border border-walnut/10 bg-white shadow-warm">
      <table className="w-full text-sm">
        <thead className="border-b border-walnut/10 bg-walnut/5">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && handleSort(String(col.key))}
                className={`px-6 py-4 text-left font-medium text-charcoal ${
                  col.sortable ? "cursor-pointer hover:bg-walnut/10" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className="text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4">
                    <div className="h-5 animate-shimmer rounded" />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedData.map((item) => (
                <motion.tr
                  key={String(item[keyField])}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-walnut/5 last:border-0 ${
                    onRowClick ? "cursor-pointer hover:bg-walnut/5" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4">
                      {col.render
                        ? col.render(item)
                        : String(item[col.key as keyof T] ?? "")}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </div>
  );
}
