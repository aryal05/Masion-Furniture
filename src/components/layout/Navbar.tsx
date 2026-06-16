"use client";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/stores/cart";
import { useUI } from "@/stores/ui";
import { useUser } from "@/hooks/useUser";
import { MegaMenu } from "./MegaMenu";
import { MobileNavDrawer } from "./MobileNavDrawer";

const NAV_LINKS = [
  { label: "Shop", href: "/shop", hasMega: true },
  { label: "Collections", href: "/collections", hasMega: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { openMobileNav, openSearch, openAuthModal } = useUI();
  const { openDrawer, count } = useCart();
  const { user } = useUser();
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = count();

  // Track scroll position - navbar becomes solid after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
      
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-white shadow-sm"
          }
        `}
        onMouseLeave={() => setActiveMega(null)}
      >
        <nav className="mx-auto flex h-16 md:h-20 max-w-[1440px] items-center justify-between px-4 md:px-6 lg:px-10">
          {/* Mobile menu toggle */}
          <button
            onClick={openMobileNav}
            className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>

          {/* Logo */}
          <Link href="/" className="font-display text-xl md:text-2xl tracking-display text-[#2D4A2D] font-bold">
            Maison
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                onMouseEnter={() => link.hasMega && setActiveMega(link.label)}
              >
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wider font-medium text-gray-700 hover:text-[#2D4A2D] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={openSearch}
              aria-label="Search"
              className="h-10 w-10 grid place-items-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
            >
              <SearchIcon />
            </button>

            <button
              onClick={() => user ? null : openAuthModal()}
              aria-label={user ? "Account" : "Sign in"}
              className="hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
            >
              {user ? (
                <Link href="/account">
                  <UserIcon />
                </Link>
              ) : (
                <UserIcon />
              )}
            </button>

            <button
              id="header-cart-icon"
              onClick={openDrawer}
              aria-label={`Cart with ${cartCount} items`}
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
            >
              <CartIcon />
              <AnimatePresence>
                {cartCount > 0 && (
                  <m.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#2D4A2D] text-[10px] font-bold text-white"
                  >
                    {cartCount}
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMega && (
            <MegaMenu
              activeMenu={activeMega}
              onClose={() => setActiveMega(null)}
            />
          )}
        </AnimatePresence>
      </header>

      <MobileNavDrawer />
    </>
  );
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      <path d="M6 6L5 3H2" />
    </svg>
  );
}
