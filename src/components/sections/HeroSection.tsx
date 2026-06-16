'use client';

import { m } from 'framer-motion';
import HeroCarousel from './HeroCarousel';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }
};

export default function HeroSection() {
  return (
    <section className="min-h-auto md:min-h-[88vh] bg-[#F5F5F0] flex items-center px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-6 md:py-20 relative overflow-hidden">
      {/* Decorative Dot Grids */}
      <div className="absolute top-10 right-10 grid grid-cols-5 gap-1 opacity-40 hidden md:block">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
        ))}
      </div>

      <div className="max-w-[1400px] 3xl:max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
            {/* Pill Badge */}
            <m.div
              className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-sm relative"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              {/* Chair SVG Icon in Green Circle */}
              <div className="w-6 h-6 md:w-8 md:h-8 bg-[#2D4A2D] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="font-medium text-[#1A1A1A] text-xs md:text-sm">The Best Online Furniture Store</span>
              
              {/* Gold Sparkle Star */}
              <m.svg
                className="w-3 h-3 md:w-4 md:h-4 text-[#D4A017] absolute -top-1 -right-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </m.svg>
            </m.div>

            {/* H1 Heading */}
            <m.h1
              className="font-black text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl leading-[1.05] text-[#1A1A1A]"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Explore Our{' '}
              <span className="text-[#2D4A2D]">Modern</span>{' '}
              Furniture Collection
            </m.h1>

            {/* Thin Underline Accent */}
            <m.div
              className="h-[3px] bg-[#2D4A2D]/20 w-[180px] md:w-[220px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Description Paragraph */}
            <m.p
              className="text-[#6A6A6A] text-sm leading-relaxed max-w-md line-clamp-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </m.p>

            {/* CTA Row */}
            <m.div
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <m.button
                className="bg-[#2D4A2D] text-white rounded-full px-8 py-3.5 font-semibold flex items-center gap-2 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
                <m.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  →
                </m.span>
              </m.button>
              <m.button
                className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:text-[#2D4A2D] transition-colors text-center sm:text-left"
                whileHover={{ x: 3 }}
              >
                View All Products
              </m.button>
            </m.div>

            {/* Trust Row */}
            <m.div
              className="flex items-center gap-3 md:gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {/* Avatar Stack */}
              <div className="flex items-center">
                {[1, 2, 3, 4].map((i) => (
                  <m.div
                    key={i}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#F5F5F0] bg-gray-300 -ml-2 md:-ml-2.5 first:ml-0 overflow-hidden"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/40?img=${i + 10})`, backgroundSize: 'cover' }}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      delay: i * 0.08
                    }}
                  />
                ))}
                <m.div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#D4A017] text-white flex items-center justify-center font-bold -ml-2 md:-ml-2.5 border-2 border-[#F5F5F0] text-sm md:text-base"
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    delay: 0.32
                  }}
                >
                  +
                </m.div>
              </div>

              {/* Trust Text */}
              <div>
                <p className="font-bold text-base md:text-lg text-[#1A1A1A]">4.9 Ratings+</p>
                <p className="text-xs md:text-sm text-[#8A8A8A]">Trusted by 50k+ Customers</p>
              </div>
            </m.div>
          </div>

          {/* Right Column - HeroCarousel */}
          <m.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <HeroCarousel />
          </m.div>
        </div>
      </div>
    </section>
  );
}
