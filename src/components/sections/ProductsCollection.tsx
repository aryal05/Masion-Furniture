'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const products = [
  {
    id: 1,
    name: 'Wooden Sofa Chair',
    category: 'Chair',
    price: 80,
    originalPrice: 160,
    discount: '50% off',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
    hasCountdown: true
  },
  {
    id: 2,
    name: 'Circular Sofa Chair',
    category: 'Chair',
    price: 108,
    originalPrice: 120,
    discount: '10% off',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80',
    hasCountdown: false
  },
  {
    id: 3,
    name: 'Wooden Nightstand',
    category: 'Nightstand',
    price: 54,
    originalPrice: 60,
    discount: '10% off',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80',
    hasCountdown: false
  }
];

const tabs = ['All Products', 'Latest Products', 'Best Sellers', 'Featured Products'];

function CountdownTimer() {
  const [time, setTime] = useState({ days: 5, hours: 12, mins: 30, secs: 25 });

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
    <div className="bg-accent px-4 py-3 rounded-b-none flex items-center justify-center gap-2">
      {[
        { value: time.days, label: 'Days' },
        { value: time.hours, label: 'Hours' },
        { value: time.mins, label: 'Mins' },
        { value: time.secs, label: 'Sec' }
      ].map((item, index) => (
        <div key={item.label} className="flex items-center">
          <div className="text-center">
            <AnimatePresence mode="wait">
              <m.span
                key={item.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-bold text-white text-lg block"
              >
                {String(item.value).padStart(2, '0')}
              </m.span>
            </AnimatePresence>
            <span className="text-xs text-white/80">{item.label}</span>
          </div>
          {index < 3 && <span className="font-bold text-white text-xl mx-1">:</span>}
        </div>
      ))}
    </div>
  );
}

export function ProductsCollection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Latest Products');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-100px' });

  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 pt-10 md:pt-16 pb-10 md:pb-16">
      {/* Section Header */}
      <m.div
        className="text-center"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <m.div
            className="w-8 h-0.5 bg-[#D4A017]"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : { width: 0 }}
            transition={{ delay: 0.1 }}
          />
          <span className="text-[#8A8A8A] text-xs md:text-sm uppercase tracking-widest">Our Products</span>
          <m.div
            className="w-8 h-0.5 bg-[#D4A017]"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : { width: 0 }}
            transition={{ delay: 0.1 }}
          />
        </div>

        {/* Heading */}
        <h2 className="font-black text-2xl md:text-3xl lg:text-4xl">
          Our <span className="text-[#1A1A1A]">Products</span>{' '}
          <span className="text-[#2D4A2D]">Collections</span>
        </h2>
      </m.div>

      {/* Filter Tab Bar */}
      <m.div
        className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8 mb-8 md:mb-10 overflow-x-auto scrollbar-hide pb-2"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.1 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 md:px-7 py-2 md:py-2.5 font-medium text-xs md:text-sm cursor-pointer transition flex-shrink-0 ${
              activeTab === tab
                ? 'bg-[#2D4A2D] text-white border-transparent'
                : 'bg-transparent border border-[#E0E0E0] text-[#4A4A4A] hover:border-[#2D4A2D] hover:text-[#2D4A2D]'
            }`}
          >
            {tab}
          </button>
        ))}
      </m.div>

      {/* Product Cards Grid */}
      <m.div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {products.map((product, index) => (
          <m.div
            key={product.id}
            className="bg-[#F8F8F6] rounded-2xl overflow-hidden relative cursor-pointer group"
            variants={scaleIn}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            {/* Image Area */}
            <div className="relative bg-[#F0F0EC] rounded-t-2xl h-[200px] sm:h-[220px] md:h-[280px]">
              <m.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-3 md:p-4"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              />

              {/* Discount Badge */}
              <m.div
                className="absolute top-3 md:top-4 left-3 md:left-4 bg-[#2D4A2D] text-white text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full"
                variants={scaleIn}
                transition={{ delay: 0.3 }}
              >
                {product.discount}
              </m.div>

              {/* Action Icons */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4 flex flex-col gap-2">
                <m.button
                  className="bg-white rounded-full w-7 h-7 md:w-9 md:h-9 flex items-center justify-center shadow-sm hover:bg-[#2D4A2D] hover:text-white transition"
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </m.button>
                <m.button
                  className="bg-white rounded-full w-7 h-7 md:w-9 md:h-9 flex items-center justify-center shadow-sm hover:bg-[#2D4A2D] hover:text-white transition"
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </m.button>
                <m.button
                  className="bg-white rounded-full w-7 h-7 md:w-9 md:h-9 flex items-center justify-center shadow-sm hover:bg-[#2D4A2D] hover:text-white transition hidden sm:block"
                  initial={{ opacity: 0, y: 4 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </m.button>
              </div>

              {/* Countdown Timer (first card only) */}
              {product.hasCountdown && <CountdownTimer />}
            </div>

            {/* Card Footer */}
            <div className="px-3 py-3 md:px-4 md:py-4">
              <div className="flex items-center justify-between">
                <span className="text-[#8A8A8A] text-xs">{product.category}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[#D4A017]">★</span>
                  <span className="text-[#D4A017] font-semibold text-xs md:text-sm">{product.rating}</span>
                </div>
              </div>
              <h3 className="font-bold text-sm md:text-base text-[#1A1A1A] mt-1">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-base md:text-lg text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                <span className="text-xs md:text-sm line-through text-[#8A8A8A]">${product.originalPrice.toFixed(2)}</span>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
