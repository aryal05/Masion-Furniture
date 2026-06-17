'use client';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const ROOMS = [
  {
    id: 1,
    title: "Living Room",
    slug: "sofas",
    count: "2,500+ Items",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    hotspots: [
      { x: 35, y: 58 },
      { x: 72, y: 52, price: "$1,500" },
      { x: 52, y: 78 },
    ],
  },
  {
    id: 2,
    title: "Bed Room",
    slug: "bedroom",
    count: "1,500+ Items",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    hotspots: [{ x: 60, y: 40 }],
  },
  {
    id: 3,
    title: "Dining Room",
    slug: "dining",
    count: "900+ Items",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    hotspots: [{ x: 50, y: 55, price: "$850" }],
  },
  {
    id: 4,
    title: "Office",
    slug: "office",
    count: "600+ Items",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    hotspots: [{ x: 45, y: 50, price: "$320" }],
  },
];

function RoomCard({ room }: { room: typeof ROOMS[0] }) {
  return (
    <Link 
      href={`/shop?category=${room.slug}`}
      className="block w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer group hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Area */}
      <div className="h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[300px] relative overflow-hidden">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 360px, (max-width: 1024px) 380px, 420px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Hotspot Dots */}
        {room.hotspots.map((hotspot, index) => (
          <div key={index} className="absolute" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}>
            {/* Pulsing Ring */}
            <m.div
              className="absolute inset-0 w-6 h-6 border-2 border-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2
              }}
            />
            {/* Hotspot Dot */}
            <m.div
              className="w-6 h-6 bg-white rounded-full relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                delay: index * 0.1
              }}
            >
              {/* Connecting Line */}
              {hotspot.price && (
                <m.div
                  className="absolute top-1/2 left-full w-8 h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 }}
                />
              )}
            </m.div>

            {/* Price Bubble */}
            {hotspot.price && (
              <m.div
                className="absolute top-1/2 left-12 -translate-y-1/2 bg-white/95 rounded-full px-3 py-1.5 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 20,
                  delay: 0.55
                }}
              >
                <span className="font-bold text-sm text-[#1A1A1A]">{hotspot.price}</span>
              </m.div>
            )}
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="px-5 py-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-xl text-[#1A1A1A] group-hover:text-[#2D4A2D] transition-colors">{room.title}</h3>
          <p className="text-sm text-[#8A8A8A] mt-0.5">{room.count}</p>
        </div>
        <m.div
          className="bg-[#2D4A2D] w-12 h-12 rounded-full text-white flex items-center justify-center group-hover:bg-[#D4A017] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </m.div>
      </div>
    </Link>
  );
}

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCardWidth = () => {
    if (!mounted) return 420; // Default for SSR
    const width = window.innerWidth;
    if (width < 480) return 280;
    if (width < 640) return 320;
    if (width < 768) return 360;
    if (width < 1024) return 380;
    return 420;
  };

  const cardWidth = getCardWidth();
  const gap = 16;
  const step = cardWidth + gap;
  const trackX = -(currentIndex * step);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ROOMS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + ROOMS.length) % ROOMS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex >= ROOMS.length) {
          setDirection(-1);
          return ROOMS.length - 2;
        } else if (newIndex < 0) {
          setDirection(1);
          return 1;
        }
        return newIndex;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [direction]);

  return (
    <div className="relative">
      {/* Track Container with overflow-hidden */}
      <div style={{ width: cardWidth + 80, overflow: 'hidden' }} className="relative">
        <m.div
          className="flex gap-4"
          animate={{ x: trackX }}
          transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
        >
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </m.div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex gap-3 mt-4">
        <m.button
          className="bg-[#2D4A2D] w-12 h-12 rounded-full text-white flex items-center justify-center"
          onClick={prevSlide}
          whileHover={{ scale: 1.1, backgroundColor: '#3A5A3A' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </m.button>
        <m.button
          className="bg-[#D4A017] w-12 h-12 rounded-full text-white flex items-center justify-center"
          onClick={nextSlide}
          whileHover={{ scale: 1.1, backgroundColor: '#c49010' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </m.button>

        {/* Dot Indicators */}
        <div className="flex gap-2 ml-2 items-center">
          {ROOMS.map((_, index) => (
            <m.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full ${
                index === currentIndex
                  ? 'w-6 h-2 bg-[#2D4A2D] opacity-100'
                  : 'w-2 h-2 bg-[#2D4A2D] opacity-30'
              }`}
              animate={{
                width: index === currentIndex ? 24 : 8,
                opacity: index === currentIndex ? 1 : 0.3
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
