"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useUI } from "@/stores/ui";
import { useUser } from "@/hooks/useUser";

const NAV_LINKS = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Living Room", href: "/shop?category=living-room" },
      { label: "Bedroom", href: "/shop?category=bedroom" },
      { label: "Dining", href: "/shop?category=dining" },
      { label: "Office", href: "/shop?category=office" },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Bestsellers", href: "/collections/bestsellers" },
      { label: "Sale", href: "/collections/sale" },
    ],
  },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileNavDrawer() {
  const { mobileNavOpen, closeMobileNav, openAuthModal } = useUI();
  const { user, signOut } = useUser();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 lg:hidden"
            onClick={closeMobileNav}
          />
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col bg-ivory lg:hidden"
          >
            <header className="flex items-center justify-between border-b border-walnut/10 p-6">
              <Link
                href="/"
                onClick={closeMobileNav}
                className="font-display text-2xl"
              >
                Maison
              </Link>
              <button
                onClick={closeMobileNav}
                aria-label="Close menu"
                className="h-10 w-10 grid place-items-center"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() =>
                            setExpanded(expanded === link.label ? null : link.label)
                          }
                          className="flex w-full items-center justify-between py-3 font-display text-lg"
                        >
                          {link.label}
                          <motion.span
                            animate={{ rotate: expanded === link.label ? 180 : 0 }}
                          >
                            ↓
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {expanded === link.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={closeMobileNav}
                                    className="block py-2 text-sm text-muted hover:text-charcoal"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMobileNav}
                        className="block py-3 font-display text-lg"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-walnut/10 p-6 space-y-4">
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={closeMobileNav}
                    className="block w-full rounded-btn border border-walnut py-3 text-center text-sm uppercase tracking-label"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      closeMobileNav();
                    }}
                    className="w-full text-center text-sm text-muted"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    closeMobileNav();
                    openAuthModal();
                  }}
                  className="w-full rounded-btn bg-walnut py-3 text-sm uppercase tracking-label text-ivory"
                >
                  Sign In
                </button>
              )}
            </footer>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
