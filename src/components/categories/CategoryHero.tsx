'use client';

import { m, useReducedMotion } from 'framer-motion';
import { fadeUp, durations, easeOut } from '@/lib/motion';

export function CategoryHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 lg:py-24">
        <m.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: durations.slow, ease: easeOut }}
          className="relative z-10 max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs text-white/80 uppercase tracking-widest font-medium mb-4">
            Explore Collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            Browse by<br />
            <span className="text-gold">Category</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-lg leading-relaxed">
            From statement sofas to functional storage — find handcrafted furniture for every room in your home.
          </p>
        </m.div>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
      </div>
    </section>
  );
}
