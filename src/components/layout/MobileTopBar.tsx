'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/stores/cart'

/**
 * MobileTopBar — Sticky top navigation for mobile (xs to md)
 * 
 * Design Spec:
 * - Height: h-14 (56px)
 * - Background: #ffffff
 * - Border-bottom: 1px solid #e5e7eb
 * - Shadow: 0 2px 12px rgba(0,0,0,0.06)
 * - Sticky top-0 z-40
 * 
 * Layout (3-zone):
 * - LEFT: Logo circle (bg #2d4a2d, white F) + "Furniture." with amber dot
 * - CENTER: Empty (logo is visually centered)
 * - RIGHT: Search icon + Cart icon with amber badge
 * 
 * Tap targets: min 44×44px (Apple HIG)
 * Press feedback: active:opacity-70
 */
export function MobileTopBar() {
  const router = useRouter()
  const cartCount = useCart(state => state.count())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header
      className="
        sticky top-0 z-40 md:hidden
        flex items-center justify-between
        h-14 px-4
        bg-white
        border-b border-gray-200
        shadow-[0_2px_12px_rgba(0,0,0,0.06)]
      "
    >
      {/* Logo — Left */}
      <button
        onClick={() => router.push('/')}
        className="
          flex items-center gap-2
          active:opacity-70
          transition-opacity duration-150
        "
        aria-label="Go to home"
      >
        <div
          className="
            w-8 h-8 rounded-full
            flex items-center justify-center
            text-white font-bold text-sm
          "
          style={{ backgroundColor: '#2D4A2D' }}
        >
          F
        </div>
        <span
          className="
            font-semibold text-base
            tracking-wide
          "
          style={{ color: '#1A1A1A' }}
        >
          Furniture
          <span style={{ color: '#C8935A' }}>.</span>
        </span>
      </button>

      {/* Right icons — Search + Cart */}
      <div className="flex items-center gap-1">
        {/* Search button */}
        <button
          onClick={() => router.push('/shop?search=true')}
          className="
            w-9 h-9 flex items-center justify-center
            rounded-full
            active:bg-gray-100
            transition-colors duration-150
          "
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: '#1A1A1A' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Cart button with badge */}
        <button
          onClick={() => router.push('/cart')}
          className="
            relative w-9 h-9 flex items-center
            justify-center rounded-full
            active:bg-gray-100
            transition-colors duration-150
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
        </button>
      </div>
    </header>
  )
}
