'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bottomSheet, modalOverlay } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Filter } from '@/types';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filter;
  onApply: () => void;
  onClear: () => void;
  children: React.ReactNode;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApply,
  onClear,
  children,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            variants={bottomSheet}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-line">
              <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5 text-body" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-line flex gap-3">
              <Button
                variant="outline"
                onClick={onClear}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                onClick={() => {
                  onApply();
                  onClose();
                }}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
