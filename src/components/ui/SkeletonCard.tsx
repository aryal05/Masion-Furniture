'use client';

import { motion } from 'framer-motion';
import { shimmer } from '@/lib/motion';

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <motion.div
        variants={shimmer}
        animate="animate"
        className="h-[280px] bg-surface"
      />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Title skeleton */}
        <motion.div
          variants={shimmer}
          animate="animate"
          className="h-6 bg-surface rounded w-3/4"
        />
        
        {/* Rating skeleton */}
        <motion.div
          variants={shimmer}
          animate="animate"
          className="h-4 bg-surface rounded w-1/2"
        />
        
        {/* Price skeleton */}
        <motion.div
          variants={shimmer}
          animate="animate"
          className="h-5 bg-surface rounded w-1/3"
        />
      </div>
    </div>
  );
}
