"use client";
import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { ProductImage } from "@/types";

interface Props {
  images: ProductImage[];
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ images, activeIndex, open, onClose, onIndexChange }: Props) {
  const goNext = useCallback(() => {
    onIndexChange((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onIndexChange]);

  const goPrev = useCallback(() => {
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute right-6 top-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous image"
                className="absolute left-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition-colors hover:bg-white/20"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next image"
                className="absolute right-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition-colors hover:bg-white/20"
              >
                →
              </button>
            </>
          )}

          {/* Image */}
          <motion.div
            key={activeIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-[80vw]"
          >
            <Image
              src={images[activeIndex]?.url}
              alt={images[activeIndex]?.alt || "Product image"}
              fill
              sizes="80vw"
              className="object-contain"
            />
          </motion.div>

          {/* Counter */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-btn bg-white/10 px-4 py-2 text-sm text-ivory">
            {activeIndex + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
