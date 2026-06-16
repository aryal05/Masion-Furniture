'use client';

import { m } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#2D4A2D', '#D4A017', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#2D4A2D', '#D4A017', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    const timer = setTimeout(() => {
      frame();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center px-4 py-8 md:py-0">
      <m.div
        className="bg-white rounded-3xl p-6 md:p-12 max-w-lg w-full mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Checkmark Circle */}
        <m.div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#2D4A2D] mx-auto flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0 }}
        >
          <m.svg
            className="w-10 h-10 md:w-12 md:h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </m.svg>
        </m.div>

        {/* Order Confirmed Text */}
        <m.h1
          className="font-black text-2xl md:text-3xl text-[#1A1A1A] mt-5 md:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          Order Confirmed!
        </m.h1>

        {/* Order Number */}
        <m.div
          className="mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <span className="bg-[#F5F5F0] rounded-full px-3 md:px-4 py-1.5 md:py-2 font-mono text-xs md:text-sm text-[#2D4A2D] font-bold inline-block">
            Order #FN-2024-8472
          </span>
        </m.div>

        {/* Description */}
        <m.p
          className="text-[#6A6A6A] text-center mt-3 md:mt-4 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          Thank you for your purchase! Your order has been confirmed and will be shipped within 2-3 business days.
        </m.p>

        {/* Estimated Delivery */}
        <m.div
          className="bg-[#2D4A2D]/10 rounded-xl p-3 md:p-4 mt-4 md:mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        >
          <p className="text-[#2D4A2D] font-semibold text-xs md:text-sm">
            📦 Estimated Delivery: June 15–17, 2026
          </p>
        </m.div>

        {/* Action Buttons */}
        <m.div
          className="flex flex-col gap-3 mt-6 md:mt-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          <m.button
            onClick={() => router.push('/')}
            className="bg-[#2D4A2D] text-white rounded-full py-3.5 md:py-4 font-semibold text-sm md:text-base"
            whileHover={{ scale: 1.02, backgroundColor: '#3A5A3A' }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Shopping
          </m.button>
          <m.button
            onClick={() => router.push('/')}
            className="border-2 border-[#2D4A2D] text-[#2D4A2D] rounded-full py-3.5 md:py-4 font-semibold text-sm md:text-base"
            whileHover={{ backgroundColor: '#2D4A2D', color: 'white' }}
            whileTap={{ scale: 0.98 }}
          >
            View Order Details
          </m.button>
        </m.div>
      </m.div>
    </div>
  );
}
