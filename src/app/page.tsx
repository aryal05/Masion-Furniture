'use client';

import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import CartCount from '@/components/CartCount';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      title: 'Modern Living',
      subtitle: 'Premium Collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      title: 'Elegant Dining',
      subtitle: 'Timeless Design'
    },
    {
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
      title: 'Comfort Seating',
      subtitle: 'Luxury Comfort'
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <m.a
              href="/"
              className="text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              MAISON
            </m.a>
            
            <div className="hidden md:flex items-center space-x-8">
              <m.a
                href="/collections"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Collections
              </m.a>
              <m.a
                href="/about"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                About
              </m.a>
              <m.a
                href="/craftsmanship"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Craftsmanship
              </m.a>
              <m.a
                href="/contact"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Contact
              </m.a>
            </div>

            <div className="flex items-center space-x-4">
              <m.button
                className="hidden md:block px-6 py-2 bg-amber-500 text-neutral-950 font-medium text-sm hover:bg-amber-400 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Quote
              </m.button>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <a href="/cart" className="relative p-2 hover:bg-neutral-800 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <CartCount />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-neutral-400 text-sm ml-2">4.9 (128 reviews)</span>
                </div>
              </m.div>

              <m.h1
                className="text-5xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover the Art of
                <span className="block text-amber-400">Modern Living</span>
              </m.h1>

              <m.p
                className="text-lg text-neutral-400 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transform your space with our curated collection of premium furniture. Crafted with precision, designed for elegance.
              </m.p>

              <m.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <m.button
                  className="px-8 py-4 bg-amber-500 text-neutral-950 font-semibold hover:bg-amber-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Collection
                </m.button>
                <m.button
                  className="px-8 py-4 border border-neutral-600 text-white font-semibold hover:border-amber-500 hover:text-amber-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Catalog
                </m.button>
              </m.div>

              <m.div
                className="flex items-center space-x-8 pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div>
                  <p className="text-3xl font-bold text-amber-400">500+</p>
                  <p className="text-sm text-neutral-400">Products</p>
                </div>
                <div className="w-px h-12 bg-neutral-700"></div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">50+</p>
                  <p className="text-sm text-neutral-400">Designers</p>
                </div>
                <div className="w-px h-12 bg-neutral-700"></div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">10k+</p>
                  <p className="text-sm text-neutral-400">Customers</p>
                </div>
              </m.div>
            </div>

            {/* Right Content - Image Cards */}
            <div className="relative">
              <m.div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-1">{slides[currentSlide].title}</h3>
                  <p className="text-neutral-300">{slides[currentSlide].subtitle}</p>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-amber-500' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </m.div>

              {/* Floating Cards */}
              <m.div
                className="absolute -bottom-8 -left-8 bg-neutral-800 p-4 rounded-xl shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-neutral-400">On orders over $500</p>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-32 px-4 md:px-8 lg:px-16">
        <m.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <m.h2
            className="text-4xl md:text-6xl font-light tracking-[0.2em] text-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            FEATURED COLLECTION
          </m.h2>
          
          <m.p
            className="text-neutral-400 text-center mb-16 tracking-widest"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            TIMELESS ELEGANCE FOR MODERN LIVING
          </m.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                id: 'velvet-sofa',
                name: 'Velvet Sofa', 
                price: '$4,500', 
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' 
              },
              { 
                id: 'oak-dining-table',
                name: 'Oak Dining Table', 
                price: '$3,200', 
                image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80' 
              },
              { 
                id: 'leather-armchair',
                name: 'Leather Armchair', 
                price: '$2,800', 
                image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80' 
              },
            ].map((product, index) => (
              <m.a
                key={product.id}
                href={`/product/${product.id}`}
                className="group cursor-pointer block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-[3/4] mb-4 relative overflow-hidden bg-neutral-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <m.div
                    className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500"
                  />
                  <m.div
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <button className="w-full py-3 bg-white text-neutral-950 font-medium tracking-widest">
                      VIEW DETAILS
                    </button>
                  </m.div>
                </div>
                <h3 className="text-xl font-light tracking-widest mb-2">{product.name}</h3>
                <p className="text-amber-400 font-light">{product.price}</p>
              </m.a>
            ))}
          </div>
        </m.div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 md:px-8 lg:px-16 bg-neutral-900/50">
        <m.div
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <m.div
            className="aspect-square bg-gradient-to-br from-amber-900/30 to-neutral-800 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <m.div
              className="absolute inset-4 border border-amber-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </m.div>
          
          <m.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] mb-6">
              CRAFTED EXCELLENCE
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Each piece in our collection is meticulously crafted by master artisans using 
              the finest materials sourced from around the world. Our commitment to quality 
              ensures that every furniture item becomes a timeless heirloom.
            </p>
            <p className="text-neutral-400 leading-relaxed mb-8">
              From sustainable hardwoods to premium Italian leather, we never compromise 
              on materials or craftsmanship. Experience the difference that true luxury makes.
            </p>
            <m.button
              className="px-12 py-4 border border-amber-500 text-amber-400 font-medium tracking-widest hover:bg-amber-500 hover:text-neutral-950 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OUR STORY
            </m.button>
          </m.div>
        </m.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-neutral-900"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        <m.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] mb-6">
            ELEVATE YOUR SPACE
          </h2>
          <p className="text-neutral-400 text-lg mb-12 max-w-2xl mx-auto">
            Discover our exclusive collection and transform your living space into a sanctuary 
            of elegance and comfort.
          </p>
          <m.button
            className="px-16 py-5 bg-amber-500 text-neutral-950 font-medium tracking-widest hover:bg-amber-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START YOUR JOURNEY
          </m.button>
        </m.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-8 lg:px-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-light tracking-[0.2em] mb-4">MAISON</h3>
            <p className="text-neutral-400 text-sm">Luxury furniture for discerning tastes.</p>
          </div>
          <div>
            <h4 className="font-medium tracking-widest mb-4">COLLECTIONS</h4>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Living Room</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Bedroom</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Dining</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Office</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium tracking-widest mb-4">COMPANY</h4>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium tracking-widest mb-4">NEWSLETTER</h4>
            <p className="text-neutral-400 text-sm mb-4">Subscribe for exclusive updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 focus:border-amber-500 outline-none text-sm"
              />
              <button className="px-6 py-2 bg-amber-500 text-neutral-950 font-medium text-sm hover:bg-amber-400 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          <p>&copy; 2024 MAISON. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
