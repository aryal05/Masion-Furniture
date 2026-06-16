'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }
};

function FlashSaleCountdown() {
  const [time, setTime] = useState({ days: 4, hours: 14, mins: 48, secs: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) {
          secs--;
        } else {
          secs = 59;
          if (mins > 0) {
            mins--;
          } else {
            mins = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 md:gap-6 mt-6 md:mt-8 justify-center">
      {[
        { value: time.days, label: 'Days' },
        { value: time.hours, label: 'Hours' },
        { value: time.mins, label: 'Minutes' },
        { value: time.secs, label: 'Seconds' }
      ].map((item, index) => (
        <div key={item.label} className="text-center">
          <AnimatePresence mode="wait">
            <m.span
              key={item.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="font-black text-3xl md:text-5xl text-[#1A1A1A] block"
            >
              {String(item.value).padStart(2, '0')}
            </m.span>
          </AnimatePresence>
          <span className="text-xs md:text-sm text-[#8A8A8A] mt-1 block">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function FlashSale() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-10 md:py-16">
      <div className="max-w-[1400px] 3xl:max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 md:gap-8">
        {/* Flash Sale Card */}
        <m.div
          ref={ref}
          className="bg-[#F5F5F0] rounded-3xl p-6 md:p-12 relative overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col items-center justify-center text-center"
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Decorative Dots */}
          <m.div
            className="absolute top-4 right-4 grid grid-cols-4 gap-1 opacity-25 hidden md:block"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.25 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
            ))}
          </m.div>
          <m.div
            className="absolute bottom-4 left-4 grid grid-cols-4 gap-1 opacity-25 hidden md:block"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.25 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
            ))}
          </m.div>

          {/* Heading */}
          <h2 className="font-black text-3xl md:text-4xl">
            Flash <span className="text-[#2D4A2D]">Sale!</span>
          </h2>

          {/* Subtext */}
          <p className="text-[#4A4A4A] text-sm md:text-base mt-2">Get 25% off - Limited Time Offer!</p>

          {/* Countdown */}
          <FlashSaleCountdown />

          {/* Shop Now Button */}
          <m.button
            className="bg-[#2D4A2D] text-white rounded-full px-8 md:px-10 py-3 md:py-3.5 font-semibold mt-6 md:mt-10 w-full md:w-auto"
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop Now →
          </m.button>
        </m.div>

        {/* Phone Mockup Cards - Hidden on mobile, visible on md+ */}
        <m.div
          className="flex items-center gap-3 hidden md:flex"
          variants={slideRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <m.div
            className="w-[200px] h-[380px] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl"
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={inView ? { opacity: 1, y: 0, rotate: -3 } : { opacity: 0, y: 40, rotate: -3 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
          >
            <m.img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
              alt="Kitchen"
              className="w-full h-full object-cover"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
          </m.div>
          <m.div
            className="w-[200px] h-[380px] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl"
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 40, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
          >
            <m.img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80"
              alt="Living Room"
              className="w-full h-full object-cover"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.3 }}
            />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
