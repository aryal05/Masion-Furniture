"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import type { ProductImage } from "@/types";

interface Props {
  images: ProductImage[];
  productName: string;
}

export function ImageGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        {/* Thumbnails */}
        <div className="flex gap-2 lg:flex-col">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`
                relative h-16 w-16 shrink-0 overflow-hidden rounded-btn border-2 transition-all
                ${activeIndex === i ? "border-walnut" : "border-transparent hover:border-walnut/30"}
              `}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className="relative flex-1 cursor-zoom-in overflow-hidden rounded-card bg-white"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="aspect-[3/4]"
            >
              <Image
                src={images[activeIndex]?.url}
                alt={images[activeIndex]?.alt || productName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <span className="absolute bottom-4 right-4 rounded-btn bg-white/80 px-3 py-1.5 text-xs backdrop-blur-sm">
            Click to zoom
          </span>
        </div>
      </div>

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </>
  );
}
