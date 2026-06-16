'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Living Room', href: '/shop?category=sofas' },
    { label: 'Bedroom', href: '/shop?category=bedroom' },
    { label: 'Dining', href: '/shop?category=dining' },
    { label: 'Office', href: '/shop?category=office' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/categories' },
    { label: 'Contact', href: '/contact' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/contact#faq' },
    { label: 'Shipping & Delivery', href: '/contact' },
    { label: 'Returns & Exchanges', href: '/contact' },
    { label: 'Care Guide', href: '/blog' },
  ],
  Legal: [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'Facebook', href: 'https://facebook.com', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Pinterest', href: 'https://pinterest.com', path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z' },
];

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-line bg-surface pb-20 md:pb-0">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 lg:px-16">
        {/* Main footer grid */}
        <m.div
          className="grid gap-12 lg:grid-cols-5"
          variants={shouldReduceMotion ? undefined : staggerContainer(0.08)}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Brand column */}
          <m.div className="lg:col-span-2" variants={shouldReduceMotion ? undefined : fadeUp}>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                F
              </div>
              <span className="text-ink font-semibold text-xl">
                Furniture<span className="text-gold">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">
              Handcrafted furniture in solid walnut and oak — built to be lived with for generations. Kathmandu, Nepal.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-primary hover:text-white hover:border-primary"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </m.div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <m.div key={title} variants={shouldReduceMotion ? undefined : fadeUp}>
              <h3 className="text-xs uppercase tracking-widest text-ink font-semibold mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </m.div>

        {/* Newsletter */}
        <div className="mt-16 rounded-2xl bg-primary/5 p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-ink font-bold text-xl">Stay in the loop</h3>
            <p className="mt-1 text-sm text-muted">
              New arrivals, design inspiration, and exclusive offers.
            </p>
          </div>
          <form
            className="mt-4 flex gap-3 lg:mt-0"
            onSubmit={(e) => {
              e.preventDefault();
              // Senior dev note: In production, this would POST to a newsletter API
              const form = e.target as HTMLFormElement;
              form.reset();
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full lg:w-64 rounded-full border border-line bg-card px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted lg:flex-row">
          <p>© {new Date().getFullYear()} Furniture. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Kathmandu, Nepal</span>
            <span>+977 1-4XXXXXX</span>
            <span>hello@furniture.com.np</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
