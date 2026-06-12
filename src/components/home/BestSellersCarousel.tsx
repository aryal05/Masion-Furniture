"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ProductCard } from "@/components/product/ProductCard";
import { staggerContainer } from "@/components/motion/presets";
import type { Product } from "@/types";

export function BestSellersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, product_images(url, alt, sort_order)")
        .eq("is_bestseller", true)
        .eq("status", "published")
        .order("units_sold", { ascending: false })
        .limit(8);
      return (data ?? []) as Product[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Customer Favorites</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Bestsellers</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <NavButton direction="left" onClick={() => scroll("left")} disabled={!canScrollLeft} />
            <NavButton direction="right" onClick={() => scroll("right")} disabled={!canScrollRight} />
          </div>
        </header>

        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="no-scrollbar -mx-6 flex gap-6 overflow-x-auto px-6 scroll-smooth lg:-mx-10 lg:px-10"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[280px] shrink-0 md:w-[320px]">
                  <div className="aspect-[3/4] animate-shimmer rounded-card" />
                  <div className="mt-4 h-5 w-3/4 animate-shimmer rounded" />
                  <div className="mt-2 h-4 w-1/3 animate-shimmer rounded" />
                </div>
              ))
            : products?.map((product) => (
                <motion.div
                  key={product.id}
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="w-[280px] shrink-0 md:w-[320px]"
                >
                  <ProductCard product={product} onQuickView={setQuickViewProduct} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

function NavButton({ direction, onClick, disabled }: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className="grid h-12 w-12 place-items-center rounded-full border border-walnut/20 transition-all hover:border-walnut hover:bg-walnut hover:text-ivory disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}
