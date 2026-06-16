"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/stores/wishlist";
import { fadeUp } from "@/components/motion/presets";
import type { Product } from "@/types";

interface Props {
  product: Product;
  onQuickView: (p: Product) => void;
}

export function ProductListRow({ product, onQuickView }: Props) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const onSale = !!product.compare_at_price;

  return (
    <motion.article
      variants={fadeUp}
      className="group flex gap-6 rounded-card border border-walnut/10 bg-white p-4 shadow-warm transition-shadow hover:shadow-warm-lg"
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative w-32 shrink-0 md:w-48">
        <div className="aspect-square overflow-hidden rounded-btn">
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Badges */}
        {(onSale || product.is_bestseller) && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {onSale && (
              <span className="rounded-btn bg-rose px-1.5 py-0.5 text-[9px] uppercase tracking-label text-white">
                Sale
              </span>
            )}
            {product.is_bestseller && (
              <span className="rounded-btn bg-brass px-1.5 py-0.5 text-[9px] uppercase tracking-label text-white">
                Bestseller
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between py-2">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-lg hover:text-walnut">{product.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-muted">{product.material}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{product.description}</p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <p className="text-lg">
            <span className={onSale ? "text-walnut font-medium" : ""}>
              NPR {product.price.toLocaleString()}
            </span>
            {onSale && (
              <span className="ml-2 text-sm text-muted line-through">
                NPR {product.compare_at_price!.toLocaleString()}
              </span>
            )}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => toggle(product.id)}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              className="grid h-10 w-10 place-items-center rounded-full border border-walnut/20 transition-colors hover:border-walnut"
            >
              <HeartIcon filled={wished} />
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="rounded-btn border border-walnut/20 px-4 text-xs uppercase tracking-label transition-colors hover:border-walnut hover:bg-walnut hover:text-ivory"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#C0504A" : "none"}
      stroke={filled ? "#C0504A" : "currentColor"}
      strokeWidth="1.5"
    >
      <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10 3 11.3 3.8 12 5C12.7 3.8 14 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z" />
    </svg>
  );
}
