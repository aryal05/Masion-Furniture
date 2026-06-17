'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { cardHover } from '@/lib/motion';
import { useRecentlyViewed } from '@/lib/stores/useRecentlyViewed';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useRecentlyViewed((state) => state.addItem);

  const handleClick = () => {
    addItem(product);
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} onClick={handleClick}>
      <motion.div
        {...cardHover}
        className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer group"
      >
        {/* Image */}
        <div className="relative h-[280px] bg-surface overflow-hidden">
          <Image
            src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url || ''}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isOnSale && discountPercentage > 0 && (
              <Badge variant="sale">{discountPercentage}% OFF</Badge>
            )}
            {!product.inStock && (
              <Badge variant="outOfStock">Out of Stock</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            className="absolute top-3 right-3 w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
            onClick={(e) => {
              e.preventDefault();
              // Wishlist functionality would go here
            }}
            aria-label="Add to wishlist"
          >
            <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-ink line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="font-bold text-xl text-ink">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-base line-through text-muted">${product.compareAtPrice}</span>
            )}
          </div>

          {/* Free shipping badge */}
          {product.freeShipping && (
            <div className="mt-2 flex items-center gap-1 text-xs text-muted">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Free shipping</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
});
