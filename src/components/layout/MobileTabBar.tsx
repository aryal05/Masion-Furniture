"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/stores/cart";
import { useUI } from "@/stores/ui";

const TABS = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Shop", href: "/shop", icon: GridIcon },
  { label: "Wishlist", href: "/account/wishlist", icon: HeartIcon },
  { label: "Cart", href: null, icon: CartIcon, action: "cart" },
  { label: "Account", href: "/account", icon: UserIcon },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();
  const { openDrawer } = useCart();
  const { openAuthModal } = useUI();
  const cartCount = useCart((s) => s.count());

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-walnut/10 bg-ivory/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-center justify-around h-16">
        {TABS.map((tab) => {
          const isActive = tab.href ? pathname === tab.href : false;
          const Icon = tab.icon;

          const handleClick = () => {
            if ("action" in tab && tab.action === "cart") {
              openDrawer();
            }
          };

          const content = (
            <span className="flex flex-col items-center gap-1">
              <span className="relative">
                <Icon active={isActive} />
                {tab.label === "Cart" && cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-1 grid h-4 w-4 place-items-center rounded-full bg-walnut text-[9px] text-ivory"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </span>
              <span
                className={`text-[10px] ${
                  isActive ? "text-walnut font-medium" : "text-muted"
                }`}
              >
                {tab.label}
              </span>
            </span>
          );

          return (
            <li key={tab.label}>
              {tab.href ? (
                <Link href={tab.href} className="block px-4 py-2">
                  {content}
                </Link>
              ) : (
                <button onClick={handleClick} className="px-4 py-2">
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#3B2314" : "none"} stroke="#3B2314" strokeWidth="1.5">
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#3B2314" : "none"} stroke="#3B2314" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#3B2314" : "none"} stroke="#3B2314" strokeWidth="1.5">
      <path d="M12 21C12 21 3 14 3 8.5C3 5.4 5.4 3 8.5 3C10 3 11.3 3.8 12 5C12.7 3.8 14 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14 12 21 12 21Z" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#3B2314" : "none"} stroke="#3B2314" strokeWidth="1.5">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1.5" fill="#3B2314" />
      <circle cx="18" cy="20" r="1.5" fill="#3B2314" />
      <path d="M6 6L5 3H2" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#3B2314" : "none"} stroke="#3B2314" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
