'use client';

import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import CartCount from '@/components/CartCount';

export default function Collections() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const collections = [
    {
      name: 'Living Room',
      description: 'Sophisticated comfort for your sanctuary',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      itemCount: 24
    },
    {
      name: 'Bedroom',
      description: 'Restful elegance for peaceful nights',
      image: 'https://images.unsplash.com/photo-1616594039964-40891a913161?w=800&q=80',
      itemCount: 18
    },
    {
      name: 'Dining',
      description: 'Gather in style with exquisite pieces',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      itemCount: 15
    },
    {
      name: 'Office',
      description: 'Productivity meets refined design',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      itemCount: 12
    },
    {
      name: 'Outdoor',
      description: 'Alfresco luxury for modern living',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      itemCount: 9
    },
    {
      name: 'Accessories',
      description: 'Finishing touches of perfection',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      itemCount: 32
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <m.a
              href="/"
              className="text-2xl font-light tracking-[0.2em]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              MAISON
            </m.a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/collections" className="text-sm tracking-widest text-amber-400">Collections</a>
              <a href="/about" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">About</a>
              <a href="/craftsmanship" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Craftsmanship</a>
              <a href="/contact" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Contact</a>
            </div>
            <a href="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <CartCount />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Collections"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/70" />
        </div>
        <div className="relative z-10 text-center px-4">
          <m.h1
            className="text-5xl md:text-7xl font-light tracking-[0.2em] mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            COLLECTIONS
          </m.h1>
          <m.p
            className="text-xl text-neutral-300 tracking-widest"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            DISCOVER OUR CURATED SELECTIONS
          </m.p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <m.div
                key={collection.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-[4/5] relative overflow-hidden mb-4">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button className="w-full py-3 bg-amber-500 text-neutral-950 font-medium tracking-widest">
                      EXPLORE ({collection.itemCount})
                    </button>
                  </div>
                </div>
                <h3 className="text-2xl font-light tracking-widest mb-2">{collection.name}</h3>
                <p className="text-neutral-400 text-sm">{collection.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-8 lg:px-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center text-neutral-500 text-sm">
          <p>&copy; 2024 MAISON. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
