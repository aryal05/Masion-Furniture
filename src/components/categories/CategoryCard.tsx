'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import { fadeUp, durations, easeOut } from '@/lib/motion';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category & { productCount: number; isLarge: boolean };
  isLarge: boolean;
  index: number;
}

export function CategoryCard({ category, isLarge, index }: CategoryCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: durations.base,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: easeOut,
      }}
      className={isLarge ? 'sm:row-span-2' : ''}
    >
      <Link
        href={`/shop?category=${category.slug}`}
        className="group relative block overflow-hidden rounded-2xl bg-surface"
        style={{ aspectRatio: isLarge ? '3/4' : '4/3' }}
      >
        {/* Image */}
        <img
          src={category.image_url || ''}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
            {category.name}
          </h3>
          <p className="text-white/70 text-sm mb-3 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60 uppercase tracking-widest font-medium">
              {category.productCount} Product{category.productCount !== 1 ? 's' : ''}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:gap-2 transition-all">
              Explore
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Hover ring */}
        <div className="absolute inset-0 rounded-2xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-300" />
      </Link>
    </m.div>
  );
}
