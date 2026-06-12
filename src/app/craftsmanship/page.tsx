'use client';

import { m } from 'framer-motion';
import CartCount from '@/components/CartCount';

export default function Craftsmanship() {
  const steps = [
    {
      title: 'SELECTION',
      description: 'Hand-picking the finest materials from sustainable sources worldwide',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
    },
    {
      title: 'DESIGN',
      description: 'Creating timeless designs that balance form and function',
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80'
    },
    {
      title: 'CRAFTING',
      description: 'Master artisans bring designs to life with traditional techniques',
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80'
    },
    {
      title: 'FINISHING',
      description: 'Meticulous attention to every detail in the final stages',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
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
              <a href="/collections" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Collections</a>
              <a href="/about" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">About</a>
              <a href="/craftsmanship" className="text-sm tracking-widest text-amber-400">Craftsmanship</a>
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
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1920&q=80"
            alt="Craftsmanship"
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
            CRAFTSMANSHIP
          </m.h1>
          <m.p
            className="text-xl text-neutral-300 tracking-widest"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            THE ART OF PERFECTION
          </m.p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light tracking-[0.2em] mb-16 text-center">OUR PROCESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <m.div
                key={step.title}
                className="flex gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-400 text-2xl font-light">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-light tracking-widest mb-3">{step.title}</h3>
                  <p className="text-neutral-400 leading-relaxed mb-4">{step.description}</p>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Quote */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8 text-amber-200">
              "True luxury lies not in the price tag, but in the countless hours of dedication poured into every detail."
            </blockquote>
            <cite className="text-neutral-400 tracking-widest">— Master Artisan, Maison Workshop</cite>
          </m.div>
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
