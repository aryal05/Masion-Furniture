'use client';

import { ProductCard } from './ProductCard';
import { useRecentlyViewed } from '@/lib/stores/useRecentlyViewed';
import { fadeUp, staggerContainer } from '@/lib/motion';
import { motion } from 'framer-motion';

export function RecentlyViewed() {
  const items = useRecentlyViewed((state) => state.items);

  if (items.length === 0) return null;

  return (
    <section className="py-12 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-black text-ink mb-6"
        >
          Recently Viewed
        </motion.h2>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5"
        >
          {items.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
