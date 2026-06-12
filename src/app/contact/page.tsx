'use client';

import { m } from 'framer-motion';
import { useState } from 'react';
import CartCount from '@/components/CartCount';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon.');
  };

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
              <a href="/craftsmanship" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Craftsmanship</a>
              <a href="/contact" className="text-sm tracking-widest text-amber-400">Contact</a>
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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contact"
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
            CONTACT
          </m.h1>
          <m.p
            className="text-xl text-neutral-300 tracking-widest"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            GET IN TOUCH
          </m.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-light tracking-[0.2em] mb-8">REACH OUT</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-amber-400 tracking-widest mb-2">VISIT OUR SHOWROOM</h3>
                <p className="text-neutral-300 leading-relaxed">
                  123 Luxury Avenue<br />
                  Paris, France 75001
                </p>
              </div>
              <div>
                <h3 className="text-amber-400 tracking-widest mb-2">CONTACT</h3>
                <p className="text-neutral-300 leading-relaxed">
                  +33 1 23 45 67 89<br />
                  contact@maison.com
                </p>
              </div>
              <div>
                <h3 className="text-amber-400 tracking-widest mb-2">HOURS</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Monday - Friday: 10am - 7pm<br />
                  Saturday: 10am - 6pm<br />
                  Sunday: By Appointment
                </p>
              </div>
            </div>
          </m.div>

          {/* Contact Form */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-light tracking-[0.2em] mb-8">SEND A MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm tracking-widest mb-2 text-neutral-400">NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:border-amber-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest mb-2 text-neutral-400">EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:border-amber-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest mb-2 text-neutral-400">SUBJECT</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:border-amber-500 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm tracking-widest mb-2 text-neutral-400">MESSAGE</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:border-amber-500 outline-none transition-colors resize-none"
                  required
                />
              </div>
              <m.button
                type="submit"
                className="w-full py-4 bg-amber-500 text-neutral-950 font-medium tracking-widest hover:bg-amber-400 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SEND MESSAGE
              </m.button>
            </form>
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
