'use client'

import { usePathname, useRouter } from 'next/navigation'

/**
 * MobileBottomNav — Fixed bottom navigation for mobile (xs to md)
 * 
 * Design Spec:
 * - 8 tabs: Home, Shop, Categories, About, Contact, Blog, Wishlist, Account
 * - bg: #ffffff
 * - border-top: 1px solid #e5e7eb
 * - shadow: 0 -4px 24px rgba(0,0,0,0.08)
 * - active color: #2d4a2d (forest green — matches logo)
 * - inactive color: #9ca3af (gray-400)
 * - active pip: #c8935a (amber top indicator)
 * - height: h-16 (64px)
 * - safe-area: pb-[env(safe-area-inset-bottom)]
 * - Horizontally scrollable for all items
 * 
 * Hide on: admin, checkout, cart
 * 
 * Tap targets: min 44×44px (Apple HIG)
 * Press feedback: active:scale-90
 */
const tabs = [
  {
    label: 'Home',
    href: '/',
    exact: true,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: 'Shop',
    href: '/shop',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    href: '/categories',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: 'About',
    href: '/about',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
  {
    label: 'Contact',
    href: '/contact',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: '/blog',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    label: 'Account',
    href: '/account',
    exact: false,
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Hide on admin, checkout, cart
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/cart')
  ) {
    return null
  }

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.includes(href)

  return (
    <>
      {/* Spacer for content to not be hidden behind bottom nav */}
      <div className="h-16 md:hidden" />
      
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex items-center
          bg-white border-t border-gray-200
          shadow-[0_-4px_24px_rgba(0,0,0,0.08)]
          h-16
          pb-[env(safe-area-inset-bottom)]
          md:hidden
          overflow-x-auto
          scrollbar-hide
        "
      >
        <div className="flex items-center gap-1 px-2 min-w-max">
          {tabs.map(({ label, icon: Icon, href, exact }) => {
            const active = isActive(href, exact)
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                aria-label={label}
                className="
                  relative flex flex-col items-center justify-center
                  w-16 h-full py-2 gap-0.5
                  transition-all duration-200 active:scale-90
                  shrink-0
                "
              >
                {/* Amber top pip — active indicator */}
                <span
                  className={`
                    absolute top-0 left-1/2 -translate-x-1/2
                    w-6 h-[2.5px] rounded-full transition-all duration-300
                    ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                  `}
                  style={{ backgroundColor: '#C8935A' }}
                />

                <div
                  className={`
                    w-5 h-5 stroke-[1.6] transition-colors duration-200
                    ${active ? '' : 'text-gray-400'}
                  `}
                  style={active ? { color: '#2D4A2D' } : undefined}
                >
                  {Icon(active)}
                </div>
                <span
                  className={`
                    text-[10px] font-medium leading-none
                    transition-colors duration-200
                    ${active ? '' : 'text-gray-400'}
                  `}
                  style={active ? { color: '#2D4A2D' } : undefined}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
