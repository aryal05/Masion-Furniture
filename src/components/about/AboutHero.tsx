'use client';

import { m, useReducedMotion } from 'framer-motion';
import { durations, easeOut } from '@/lib/motion';

export function AboutHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-20 lg:py-32">
        <m.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: durations.slow, ease: easeOut }}
          className="relative z-10 max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs text-white/80 uppercase tracking-widest font-medium mb-6">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            Crafting Furniture<br />
            <span className="text-gold">With Purpose</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
            Since 2010, we&apos;ve been handcrafting sustainable furniture that turns houses into homes. 
            Every piece tells a story of craftsmanship, quality materials, and thoughtful design.
          </p>
        </m.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gold/10 rounded-full translate-y-1/2" />
      </div>
    </section>
  );
}
