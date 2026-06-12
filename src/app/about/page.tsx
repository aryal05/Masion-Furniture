'use client';

import { m } from 'framer-motion';
import CartCount from '@/components/CartCount';

export default function About() {
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
              <a href="/about" className="text-sm tracking-widest text-amber-400">About</a>
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
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
            alt="About"
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
            OUR STORY
          </m.h1>
          <m.p
            className="text-xl text-neutral-300 tracking-widest"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A LEGACY OF EXCELLENCE
          </m.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-light tracking-[0.2em] mb-8 text-center">THE MAISON JOURNEY</h2>
            <div className="space-y-6 text-neutral-300 leading-relaxed">
              <p>
                Founded in 1985, Maison began as a small workshop in the heart of Paris, where our founder's passion for exceptional craftsmanship met an unwavering commitment to quality. What started as a dream to create furniture that transcends generations has evolved into a global symbol of luxury and refinement.
              </p>
              <p>
                Over the decades, we have remained true to our core values: meticulous attention to detail, sustainable practices, and an unrelenting pursuit of perfection. Each piece in our collection tells a story of dedication, skill, and the timeless beauty of authentic craftsmanship.
              </p>
              <p>
                Today, Maison continues to push the boundaries of design while honoring traditional techniques. Our master artisans combine centuries-old methods with contemporary innovation, creating furniture that is both a work of art and a testament to enduring quality.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light tracking-[0.2em] mb-16 text-center">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'CRAFTSMANSHIP',
                description: 'Every piece is handcrafted by master artisans with decades of experience.'
              },
              {
                title: 'SUSTAINABILITY',
                description: 'We source materials responsibly and prioritize eco-friendly practices.'
              },
              {
                title: 'TIMELESS DESIGN',
                description: 'Creating pieces that transcend trends and become cherished heirlooms.'
              }
            ].map((value, index) => (
              <m.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-light tracking-widest mb-4 text-amber-400">{value.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{value.description}</p>
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
