"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/components/motion/presets";

const HEADLINE = "Furniture for the Quiet Moments";

/**
 * Hero — Main hero section with scroll-based animations
 * 
 * Design Spec:
 * - Page enter animation: hero-heading y: 80 → 0, opacity: 0 → 1 (1.2s)
 * - CTA animation: y: 40 → 0, opacity: 0 → 1 (0.8s, delay 0.4s)
 * - Responsive typography using clamp()
 * - Mobile-first padding
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); // 0.4x speed
  const words = HEADLINE.split(" ");

  return (
    <section ref={ref} className="grain relative h-screen overflow-hidden">
      {/* Background with Ken Burns + parallax */}
      <motion.div style={{ y: reduced ? 0 : parallaxY }} className="absolute inset-0">
        <motion.img
          src="/hero.jpg"
          alt="Walnut dining set in warm light"
          className="h-full w-full object-cover"
          animate={reduced ? {} : { scale: [1, 1.05] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/50" />

      {/* Content — Mobile-first padding */}
      <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-20 max-w-4xl">
        <motion.p
          className="eyebrow !text-brass mb-4 md:mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          New Collection 2025
        </motion.p>

        <h1 className="text-ivory hero-heading" style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: EASE }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-4 md:mt-6 max-w-md text-ivory/80 text-base md:text-lg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Handcrafted pieces in solid walnut and oak — built to be lived with for generations.
        </motion.p>

        <motion.div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: EASE }}
        >
          <a href="/shop" className="rounded-btn bg-walnut px-6 md:px-8 py-3 md:py-4 text-ivory text-sm uppercase tracking-label transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:shadow-warm-lg hover:bg-walnut-light text-center">
            Explore Collection
          </a>
          <a href="/lookbook" className="rounded-btn border border-ivory/60 px-6 md:px-8 py-3 md:py-4 text-ivory text-sm uppercase tracking-label hover:bg-ivory/10 transition-colors text-center">
            View Lookbook
          </a>
        </motion.div>

        {/* Decorative line draw */}
        <motion.svg width="120" height="2" className="mt-8 md:mt-12">
          <motion.line
            x1="0" y1="1" x2="120" y2="1" stroke="#C9933A" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: EASE }}
          />
        </motion.svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 h-10 w-px bg-ivory/40"
        animate={reduced ? {} : { scaleY: [1, 0.5, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}