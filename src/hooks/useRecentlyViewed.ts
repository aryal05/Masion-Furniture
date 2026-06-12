"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "maison-recently-viewed";
const MAX_ITEMS = 12;

export function useRecentlyViewed() {
  const [items, setItems] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Ignore parse errors
    }
  }, []);

  const add = (productId: string) => {
    setItems((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const next = [productId, ...filtered].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage full or unavailable
      }
      return next;
    });
  };

  const clear = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return { items, add, clear };
}
