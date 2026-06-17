'use client'

import Link from 'next/link'

/**
 * AnnouncementBar — Top announcement bar (hidden on mobile)
 * 
 * Design Spec:
 * - Background: #2d4a2d (dark forest green)
 * - Text: #e8e8e0 (warm off-white)
 * - Accent: #c8935a (amber — "Sign up now" link)
 * - Promo bold: #ffffff (GET 25% OFF)
 * - Height: h-10 (40px)
 * - Hidden on mobile (xs to md)
 * 
 * Layout (3-zone):
 * - LEFT: Phone icon + "Call Us : +123-456-789"
 * - CENTER: "Sign up and GET 25% OFF for your first order. Sign up now"
 * - RIGHT: Facebook, Twitter, Pinterest, Instagram, YouTube icons
 */
export function AnnouncementBar() {
  return (
    <div
      className="
        hidden md:flex
        items-center justify-between
        h-10 px-6 lg:px-10
        text-xs
      "
      style={{ backgroundColor: '#2D4A2D' }}
    >
      {/* LEFT — Phone */}
      <div className="flex items-center gap-1.5" style={{ color: '#E8E8E0' }}>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        <span>Call Us : +123-456-789</span>
      </div>

      {/* CENTER — Promo text */}
      <p className="text-center" style={{ color: '#E8E8E0' }}>
        Sign up and{' '}
        <strong className="text-white">GET 25% OFF</strong>
        {' '}for your first order.{' '}
        <Link
          href="/account"
          className="underline font-medium"
          style={{ color: '#C8935A' }}
        >
          Sign up now
        </Link>
      </p>

      {/* RIGHT — Social icons */}
      <div className="flex items-center gap-3">
        {[
          { name: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
          { name: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
          { name: 'Pinterest', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5c-.28 0-.5-.22-.5-.5V9c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5h-4z' },
          { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
          { name: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
        ].map((social) => (
          <a
            key={social.name}
            href="#"
            className="hover:opacity-80 transition-opacity"
            style={{ color: '#E8E8E0' }}
            aria-label={social.name}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
