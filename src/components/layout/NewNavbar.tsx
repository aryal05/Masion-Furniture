'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import CartCount from '@/components/CartCount';
import { durations, easeOut, dropdownMenu, modalOverlay } from '@/lib/motion';
import { categories } from '@/lib/data/categories';

/* ─── nav link data ─── */
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories', hasMegaMenu: true },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Blog', href: '/blog' },
] as const;

const MOBILE_TABS = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'Shop', href: '/shop', icon: 'shop' },
  { name: 'Search', href: '#search', icon: 'search' },
  { name: 'Wishlist', href: '/wishlist', icon: 'heart' },
  { name: 'Cart', href: '/cart', icon: 'cart' },
] as const;

/* ─── icon components for clean JSX ─── */
function SearchIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HeartIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CartIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function UserIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function HomeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
    </svg>
  );
}

function ShopIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

const MOBILE_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  home: HomeIcon,
  shop: ShopIcon,
  search: SearchIcon,
  heart: HeartIcon,
  cart: CartIcon,
};

/* ─── Mega Menu Component ─── */
function MegaMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-card shadow-lg border-t border-line z-50"
          variants={dropdownMenu}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="menu"
        >
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.slice(0, 9).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className="group flex flex-col gap-3"
                  role="menuitem"
                  onClick={onClose}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface">
                    <img
                      src={cat.image_url || ''}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{cat.description}</p>
                  </div>
                </Link>
              ))}
              {/* View all link */}
              <Link
                href="/categories"
                className="flex items-center justify-center rounded-2xl border-2 border-dashed border-line hover:border-primary hover:bg-surface transition-all group"
                role="menuitem"
                onClick={onClose}
              >
                <div className="text-center">
                  <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">→</span>
                  <span className="text-sm font-semibold text-primary">View All Categories</span>
                </div>
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navbar ─── */
export function NewNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const hoverIntentRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  // Dispatch a custom event to open the search overlay
  const openSearch = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-search'));
  }, []);

  const handleMegaMenuEnter = useCallback(() => {
    if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
    hoverIntentRef.current = setTimeout(() => setMegaMenuOpen(true), 150);
  }, []);

  const handleMegaMenuLeave = useCallback(() => {
    if (hoverIntentRef.current) clearTimeout(hoverIntentRef.current);
    hoverIntentRef.current = setTimeout(() => setMegaMenuOpen(false), 150);
  }, []);

  // Lock body scroll when mobile menu or cart is open
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isCartOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: durations.base, ease: easeOut },
      };

  return (
    <>
      {/* ─── Desktop Navbar ─── */}
      <nav
        className="hidden md:block bg-white/95 backdrop-blur-md fixed inset-x-0 z-50 border-b border-gray-200 shadow-sm"
        style={{
          height: 'var(--nav-height)',
          top: 'var(--topbar-height)',
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Logo */}
          <m.div {...animationProps}>
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                F
              </div>
              <span className="text-ink font-semibold text-xl hidden sm:block">
                Furniture<span className="text-gold">.</span>
              </span>
            </Link>
          </m.div>

          {/* Center Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(link.href);
              const linkEl = (
                <m.div
                  key={link.name}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? undefined : { duration: durations.base, delay: index * 0.05 }}
                  className="relative"
                  {...(link.hasMegaMenu
                    ? {
                        onMouseEnter: handleMegaMenuEnter,
                        onMouseLeave: handleMegaMenuLeave,
                        onFocus: () => setMegaMenuOpen(true),
                      }
                    : {})}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium transition-colors rounded-full
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                      ${active ? 'text-primary' : 'text-body hover:text-primary'}
                    `}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.name}
                    {active && (
                      <m.span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="nav-indicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </Link>
                </m.div>
              );
              return linkEl;
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <m.button
              onClick={openSearch}
              className="p-2.5 text-body hover:text-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Search"
              {...animationProps}
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <SearchIcon />
            </m.button>

            {/* Wishlist */}
            <m.div {...animationProps}>
              <Link
                href="/wishlist"
                className="p-2.5 text-body hover:text-primary transition-colors rounded-full inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Wishlist"
              >
                <HeartIcon />
              </Link>
            </m.div>

            {/* Cart */}
            <m.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-body hover:text-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Shopping cart, ${getTotalItems()} items`}
              {...animationProps}
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <CartIcon />
              <CartCount />
            </m.button>

            {/* User */}
            <m.div {...animationProps}>
              <Link
                href="/account"
                className="p-2.5 text-body hover:text-primary transition-colors rounded-full inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Account"
              >
                <UserIcon />
              </Link>
            </m.div>

            {/* Hamburger (tablet: md–xl) */}
            <button
              className="xl:hidden p-2.5 text-body hover:text-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <div
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
        </div>
      </nav>

      {/* ─── Mobile Top Bar ─── */}
      <nav
        className="md:hidden bg-white/95 backdrop-blur-md fixed inset-x-0 top-0 z-50 border-b border-gray-200 shadow-sm flex items-center justify-between px-4"
        style={{ height: '56px' }}
        aria-label="Mobile navigation"
      >
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100 active:bg-gray-200"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            F
          </div>
          <span className="text-ink font-semibold text-base">
            Furniture<span className="text-gold">.</span>
          </span>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-0">
          <button
            onClick={openSearch}
            className="p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100 active:bg-gray-200"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100 active:bg-gray-200"
            aria-label={`Shopping cart, ${getTotalItems()} items`}
          >
            <CartIcon className="w-5 h-5" />
            <CartCount />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ height: '68px', paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
        aria-label="Mobile tabs"
      >
        <div className="flex justify-around items-center h-full">
          {MOBILE_TABS.map((tab) => {
            const IconComp = MOBILE_ICON_MAP[tab.icon];
            const active = tab.href === '#search' ? false : isActive(tab.href);
            return (
              <button
                key={tab.name}
                onClick={() => {
                  if (tab.href === '#search') {
                    openSearch();
                  } else {
                    router.push(tab.href);
                  }
                }}
                className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active ? 'text-primary' : 'text-muted'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <IconComp className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.name}</span>
                {active && (
                  <m.div
                    className="w-1 h-1 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─── Mobile Hamburger Drawer (slides from left) ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <m.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white z-[60] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      F
                    </div>
                    <span className="text-ink font-bold text-xl">
                      Furniture<span className="text-gold">.</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 py-4 px-5 font-medium text-lg transition-all active:bg-gray-100 ${
                        isActive(link.href) 
                          ? 'text-primary bg-primary/5 border-l-4 border-primary' 
                          : 'text-gray-800 hover:text-primary hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                      <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 space-y-3">
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                  >
                    <UserIcon className="w-5 h-5" />
                    My Account
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                  >
                    <HeartIcon className="w-5 h-5" />
                    Wishlist
                  </Link>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Cart Drawer ─── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <m.div
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 z-[60]"
            />
            <m.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: durations.base, ease: easeOut }}
              className="fixed top-0 right-0 h-full w-[380px] max-w-[90vw] bg-card shadow-xl z-[60]"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-line">
                  <h2 className="font-bold text-xl text-ink">Shopping Cart ({getTotalItems()})</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-surface flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close cart"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-16">
                      <CartIcon className="w-12 h-12 mx-auto text-muted mb-4" />
                      <p className="text-muted">Your cart is empty</p>
                      <Link
                        href="/shop"
                        className="inline-block mt-4 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Start Shopping →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.slice(0, 4).map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain bg-surface rounded-xl p-2"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-ink truncate">{item.name}</h3>
                            <p className="text-xs text-muted">{item.color} • {item.material}</p>
                            <p className="font-bold text-sm text-primary mt-1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {items.length > 4 && (
                        <p className="text-xs text-muted text-center">+{items.length - 4} more items</p>
                      )}
                    </div>
                  )}
                </div>
                {items.length > 0 && (
                  <div className="p-6 border-t border-line">
                    <div className="flex justify-between mb-4">
                      <span className="text-body">Subtotal</span>
                      <span className="font-bold text-ink">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <m.button
                      onClick={() => { setIsCartOpen(false); router.push('/cart'); }}
                      className="w-full bg-primary text-white rounded-full py-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02, backgroundColor: '#3A5A3A' }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      View Cart
                    </m.button>
                    <m.button
                      onClick={() => { setIsCartOpen(false); router.push('/checkout'); }}
                      className="w-full border-2 border-primary text-primary rounded-full py-3 font-semibold mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      whileHover={shouldReduceMotion ? {} : { backgroundColor: '#2D4A2D', color: '#FFFFFF' }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      Checkout
                    </m.button>
                  </div>
                )}
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
