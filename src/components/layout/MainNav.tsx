'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/stores/cart'

/**
 * MainNav — Desktop main navbar (hidden on mobile)
 * 
 * Design Spec:
 * - Background: #ffffff
 * - Border-bottom: 1px solid #e5e7eb
 * - Height: h-16 (64px)
 * - Sticky top-0 z-30
 * - Hidden on mobile (xs to md)
 * 
 * Layout (3-zone):
 * - LEFT: Logo circle (bg #2d4a2d, white F) + "Furniture." (amber dot)
 * - CENTER: Nav links (Home, Shop, Categories, About Us, Contact Us, Blog)
 * - RIGHT: Search, Wishlist, Cart (with amber badge), Account icons
 * 
 * Active state: text-gray-900 font-medium relative with small dot under
 * Inactive: text-gray-600 hover:text-gray-900
 */
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export function MainNav() {
  const pathname = usePathname()
  const cartCount = useCart(state => state.count())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="
        hidden md:flex items-center justify-between
        h-16 px-6 lg:px-10
        bg-white border-b border-gray-200
        sticky top-0 z-30
      "
    >
      {/* LEFT — Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5"
      >
        <div
          className="
            w-10 h-10 rounded-full
            flex items-center justify-center
            text-white font-bold text-base
          "
          style={{ backgroundColor: '#2D4A2D' }}
        >
          F
        </div>
        <span
          className="font-semibold text-xl"
          style={{ color: '#1A1A1A' }}
        >
          Furniture
          <span style={{ color: '#C8935A' }}>.</span>
        </span>
      </Link>

      {/* CENTER — Nav links */}
      <div className="flex items-center gap-8">
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative text-sm font-medium transition-colors
                ${active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}
              `}
            >
              {link.label}
              {/* Active indicator — small dot */}
              {active && (
                <span
                  className="
                    absolute bottom-[-4px] left-1/2 -translate-x-1/2
                    w-1 h-1 rounded-full
                  "
                  style={{ backgroundColor: '#1A1A1A' }}
                />
              )}
            </Link>
          )
        })}
      </div>

      {/* RIGHT — Icon row */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <button
          onClick={() => window.location.href = '/shop?search=true'}
          className="
            w-10 h-10 flex items-center justify-center
            rounded-full hover:bg-gray-100
            transition-colors
          "
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: '#1A1A1A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className="
            w-10 h-10 flex items-center justify-center
            rounded-full hover:bg-gray-100
            transition-colors
          "
          aria-label="Wishlist"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: '#1A1A1A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </Link>

        {/* Cart with badge */}
        <Link
          href="/cart"
          className="
            relative w-10 h-10 flex items-center
            justify-center rounded-full
            hover:bg-gray-100
            transition-colors
          "
          aria-label="Cart"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: '#1A1A1A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          {mounted && cartCount > 0 && (
            <span
              className="
                absolute -top-0.5 -right-0.5
                min-w-[18px] h-[18px] px-1
                rounded-full text-[10px] font-bold
                text-white flex items-center justify-center
              "
              style={{ backgroundColor: '#C8935A' }}
            >
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>

        {/* Account */}
        <Link
          href="/account"
          className="
            w-10 h-10 flex items-center justify-center
            rounded-full hover:bg-gray-100
            transition-colors
          "
          aria-label="Account"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: '#1A1A1A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
