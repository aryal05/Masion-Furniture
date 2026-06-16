"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWishlist } from "@/stores/wishlist";
import { fadeUp } from "@/components/motion/presets";
import type { Product } from "@/types";

export function ProductCard({ product, onQuickView }: {
  product: Product;
  onQuickView: (p: Product) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const onSale = !!product.compare_at_price;

  return (
    <motion.article
      variants={fadeUp}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-white shadow-warm transition-shadow duration-500 ease-luxe group-hover:shadow-warm-lg">
        <Link href={`/product/${product.slug}`}>
          {/* Primary image — shared layout id for listing→PDP transition */}
          <motion.div layoutId={`product-image-${product.id}`} className="absolute inset-0">
            <Image
              src={product.images[0]?.url}
              alt={`${product.name} — ${product.material}`}
              fill sizes="(max-width: 768px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 ease-luxe
                ${hovered ? "scale-[1.04]" : "scale-100"}
                ${hovered && product.images[1] ? "opacity-0" : "opacity-100"}`}
            />
            {product.images[1] && (
              <Image
                src={product.images[1].url} alt="" fill sizes="33vw"
                className={`object-cover transition-opacity duration-[400ms] ${hovered ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </motion.div>
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && <span className="rounded-btn bg-rose px-2 py-1 text-[11px] uppercase tracking-label text-white">Sale</span>}
          {product.is_bestseller && <span className="rounded-btn bg-brass px-2 py-1 text-[11px] uppercase tracking-label text-white">Bestseller</span>}
        </div>

        {/* Wishlist heart — spring bounce */}
        <motion.button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.id)}
          whileTap={{ scale: 1.4 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <HeartIcon filled={wished} />
        </motion.button>

        {/* Quick View — rises from bottom */}
        <motion.button
          onClick={() => onQuickView(product)}
          initial={false}
          animate={{ y: hovered ? 0 : "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 inset-x-0 bg-walnut/90 py-3 text-sm uppercase tracking-label text-ivory backdrop-blur-sm"
        >
          Quick View
        </motion.button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-display text-lg leading-snug">{product.name}</h3>
        <p className="text-sm text-muted">{product.material}</p>
        <p className="text-sm">
          <span className={onSale ? "text-walnut font-medium" : ""}>
            NPR {product.price.toLocaleString()}
          </span>
          {onSale && (
            <span className="ml-2 text-muted line-through">
              NPR {product.compare_at_price!.toLocaleString()}
            </span>
          )}
        </p>
      </div>
    </motion.article>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? "#C0504A" : "none"} stroke={filled ? "#C0504A" : "#1A1714"} strokeWidth="1.5">
      <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10 3 11.3 3.8 12 5C12.7 3.8 14 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z" />
    </svg>
  );
}