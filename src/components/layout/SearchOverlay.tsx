'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { durations, easeOut } from '@/lib/motion';

const MAX_RESULTS = 6;
const DEBOUNCE_MS = 200;

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Listen for the custom open event from Navbar
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-search', handler);
    return () => window.removeEventListener('open-search', handler);
  }, []);

  // Also listen for Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to wait for animation
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      return () => { clearTimeout(t); document.body.style.overflow = ''; };
    }
    document.body.style.overflow = '';
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      const matched = products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      ).slice(0, MAX_RESULTS);
      setResults(matched);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: durations.fast }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />

          {/* Search Panel */}
          <m.div
            className="relative w-full max-w-2xl mx-4 bg-card rounded-3xl shadow-xl overflow-hidden"
            initial={shouldReduceMotion ? {} : { y: -20, scale: 0.98 }}
            animate={shouldReduceMotion ? {} : { y: 0, scale: 1 }}
            exit={shouldReduceMotion ? {} : { y: -20, scale: 0.98 }}
            transition={{ duration: durations.base, ease: easeOut }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-line">
              <svg className="w-5 h-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent text-ink text-lg outline-none placeholder:text-muted"
                aria-label="Search"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface text-muted text-xs font-mono">
                ESC
              </kbd>
              <button
                onClick={close}
                className="p-1.5 text-muted hover:text-ink transition-colors rounded-full"
                aria-label="Close search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted">No products found for &ldquo;{query}&rdquo;</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="py-2">
                  <p className="px-6 py-2 text-xs text-muted uppercase tracking-widest font-medium">
                    Products
                  </p>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop?category=${product.category}`}
                      className="flex items-center gap-4 px-6 py-3 hover:bg-surface transition-colors"
                      onClick={close}
                    >
                      <img
                        src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-xl bg-surface"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{product.name}</p>
                        <p className="text-xs text-muted capitalize">{product.category} · {product.material}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">${product.price}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Quick category links when no query */}
              {!query.trim() && (
                <div className="py-4">
                  <p className="px-6 py-2 text-xs text-muted uppercase tracking-widest font-medium">
                    Quick Links
                  </p>
                  <div className="px-6 py-2 flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        className="px-4 py-2 bg-surface text-body text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                        onClick={close}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                  <p className="px-6 pt-4 pb-2 text-xs text-muted uppercase tracking-widest font-medium">
                    Trending
                  </p>
                  {products.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop?category=${product.category}`}
                      className="flex items-center gap-4 px-6 py-3 hover:bg-surface transition-colors"
                      onClick={close}
                    >
                      <img
                        src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-surface"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{product.name}</p>
                        <p className="text-xs text-muted">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-line bg-surface/50 flex items-center justify-between text-xs text-muted">
              <span>
                {query.trim()
                  ? `${results.length} result${results.length !== 1 ? 's' : ''}`
                  : 'Start typing to search'}
              </span>
              <span className="hidden sm:inline">⌘K to open • ESC to close</span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
