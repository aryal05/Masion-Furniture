'use client';

import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * SECTION 3 — HOMEPAGE (CINEMATIC EXPERIENCE)
 * Full luxury furniture showroom experience with:
 * - Sticky glass-effect navigation
 * - Full-viewport hero with parallax
 * - Collections grid with masonry
 * - Featured products carousel
 * - Editorial split sections
 * - Stats counter with scroll trigger
 * - UGC gallery
 * - Newsletter signup
 * - Footer with 4-column layout
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* ========== NAVIGATION (STICKY GLASS EFFECT) ========== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 100
            ? 'h-14 bg-ivory/95 blur-backdrop shadow-warm'
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 h-full flex items-center justify-between">
          {/* Logo */}
          <m.a
            href="/"
            className="text-xl md:text-2xl font-display font-semibold tracking-display"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Maison
          </m.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-12">
            {['Shop', 'Collections', 'About', 'Contact'].map((link, i) => (
              <m.a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-sm font-medium text-muted hover:text-walnut transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {link}
              </m.a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-ivory-dark rounded-full transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-ivory-dark rounded-full transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.5 6.375A4.5 4.5 0 019 2.25h6a4.5 4.5 0 014.5 4.125M4.5 6.375c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125M19.5 16.5v-1.5a4.5 4.5 0 00-4.5-4.5H9a4.5 4.5 0 00-4.5 4.5v1.5m15 0H4.5"
                />
              </svg>
            </button>
            <a href="/cart" className="p-2 hover:bg-ivory-dark rounded-full transition-colors relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ========== HERO SECTION (FULL VIEWPORT) ========== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 grain overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-ivory-dark/50 to-ivory z-0"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <m.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Eyebrow */}
              <m.div variants={itemVariants} className="flex items-center space-x-3">
                <div className="h-px w-12 bg-brass" />
                <span className="eyebrow">New Collection 2025</span>
              </m.div>

              {/* Headline */}
              <m.h1
                variants={itemVariants}
                className="text-display-lg font-display"
              >
                Explore Our{' '}
                <span className="text-brass">Modern Furniture</span> Collection
              </m.h1>

              {/* Subheading */}
              <m.p
                variants={itemVariants}
                className="text-lg text-muted leading-body max-w-md"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </m.p>

              {/* CTA Buttons */}
              <m.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button className="btn btn-primary">
                  Shop Now
                  <span className="ml-2">→</span>
                </button>
                <button className="btn btn-secondary">View All Products</button>
              </m.div>

              {/* Stats */}
              <m.div
                variants={itemVariants}
                className="flex items-center gap-8 pt-8 border-t border-walnut/10"
              >
                <div>
                  <p className="text-3xl font-semibold text-walnut">4.9</p>
                  <p className="text-sm text-muted">Rating+</p>
                </div>
                <div className="w-px h-12 bg-walnut/20" />
                <div>
                  <p className="text-3xl font-semibold text-walnut">50k+</p>
                  <p className="text-sm text-muted">Trusted Customers</p>
                </div>
              </m.div>
            </m.div>

            {/* Right: Image with floating cards */}
            <m.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main hero image */}
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-warm-lg">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                  alt="Living Room Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 gradient-warm-overlay" />
              </div>

              {/* Floating price tag */}
              <m.div
                className="absolute top-12 right-8 bg-white p-4 rounded-lg shadow-warm-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-sm text-muted mb-1">Starting from</p>
                <p className="text-2xl font-semibold text-walnut">$1,500</p>
              </m.div>

              {/* Floating rating */}
              <m.div
                className="absolute bottom-12 left-8 bg-white p-4 rounded-lg shadow-warm-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brass text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted">2,500+ Reviews</p>
              </m.div>
            </m.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <m.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-walnut"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </m.div>
      </section>

      {/* ========== COLLECTIONS GRID ========== */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <m.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <m.p
              className="eyebrow mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Curated Collections
            </m.p>
            <m.h2
              className="text-display-md font-display mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Shop by Room
            </m.h2>
            <m.div
              className="h-1 w-16 bg-brass mx-auto origin-left"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </div>

          {/* Collections grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: 'Living Room',
                count: '2,500+',
                image:
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
                featured: true,
              },
              {
                id: 2,
                name: 'Bed Room',
                count: '1,500+',
                image:
                  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
              },
              {
                id: 3,
                name: 'Dining',
                count: '1,200+',
                image:
                  'https://images.unsplash.com/photo-1630587191519-c21b2b8d4794?w=400&q=80',
              },
            ].map((collection, idx) => (
              <m.a
                key={collection.id}
                href={`/collections/${collection.id}`}
                className={`group relative rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-all cursor-pointer ${
                  collection.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Background image */}
                <div
                  className={`relative overflow-hidden ${
                    collection.featured ? 'aspect-video' : 'aspect-square'
                  }`}
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 gradient-warm-overlay" />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-semibold mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-sm opacity-90">{collection.count} items</p>
                </div>

                {/* CTA on hover */}
                <m.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white text-lg font-medium">
                    Shop Now →
                  </span>
                </m.div>
              </m.a>
            ))}
          </div>
        </m.div>
      </section>

      {/* ========== PHILOSOPHY SECTION (EDITORIAL SPLIT) ========== */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-ivory">
        <m.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Image */}
          <m.div
            className="relative aspect-square rounded-lg overflow-hidden shadow-warm-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
              alt="Our Philosophy"
              className="w-full h-full object-cover"
            />
          </m.div>

          {/* Content */}
          <m.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="text-display-md font-display">
              Timeless Design Meets Modern Comfort
            </h2>
            <p className="text-lg text-muted leading-body">
              Each piece in our collection is meticulously crafted by master
              artisans using the finest materials sourced from around the world.
              Our commitment to quality ensures that every furniture item becomes
              a timeless heirloom.
            </p>
            <p className="text-base text-muted leading-body">
              From sustainable hardwoods to premium Italian leather, we never
              compromise on materials or craftsmanship.
            </p>
            <button className="btn btn-secondary mt-4">Learn More</button>
          </m.div>
        </m.div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-walnut/10 to-brass/10 overflow-hidden">
        <m.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-4">Newsletter</p>
          <h2 className="text-display-md font-display mb-6">
            Sign up and GET 25% OFF for your first order.
          </h2>

          {/* Email form */}
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Sign up now
            </button>
          </form>
        </m.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-charcoal text-ivory py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-display font-semibold mb-4">
                Maison
              </h3>
              <p className="text-ivory/70 text-sm leading-relaxed">
                Luxury furniture for discerning tastes. Handcrafted excellence
                meets modern design.
              </p>
              <div className="flex gap-4 mt-6">
                {['f', 't', 'p', 'i'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="hover:text-brass transition-colors"
                  >
                    <span className="text-lg">◆</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-ivory mb-4 tracking-label uppercase text-sm">
                Quick Links
              </h4>
              <ul className="space-y-3 text-ivory/70 text-sm">
                {['Home', 'Shop', 'Collections', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-brass transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h4 className="font-semibold text-ivory mb-4 tracking-label uppercase text-sm">
                Collections
              </h4>
              <ul className="space-y-3 text-ivory/70 text-sm">
                {['Living Room', 'Bed Room', 'Dining', 'Office'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-brass transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-ivory mb-4 tracking-label uppercase text-sm">
                Contact
              </h4>
              <address className="text-ivory/70 text-sm not-italic space-y-2">
                <p>+123-456-789</p>
                <p>hello@maison.com</p>
                <p>123 Design Street, City</p>
              </address>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-ivory/20 pt-8 flex flex-col md:flex-row justify-between items-center text-ivory/60 text-sm">
            <p>&copy; 2025 Maison Furniture. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brass transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-brass transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
