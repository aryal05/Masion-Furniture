'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import { durations, easeOut } from '@/lib/motion';
import type { Style } from '@/types';

interface StyleScrollerProps {
  styles: Style[];
}

export function StyleScroller({ styles }: StyleScrollerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
      {styles.map((style, index) => (
        <m.div
          key={style.id}
          className="snap-start shrink-0 w-64 sm:w-72"
          initial={shouldReduceMotion ? undefined : { opacity: 0, x: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: durations.base,
            delay: shouldReduceMotion ? 0 : index * 0.08,
            ease: easeOut,
          }}
        >
          <Link
            href={`/shop?style=${style.slug}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white">{style.name}</h3>
                <p className="text-white/60 text-sm mt-1">
                  {style.productCount} products
                </p>
              </div>
            </div>
          </Link>
        </m.div>
      ))}
    </div>
  );
}
