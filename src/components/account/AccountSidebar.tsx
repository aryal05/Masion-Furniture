"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";

const NAV_ITEMS = [
  { label: "Overview", href: "/account", icon: "🏠" },
  { label: "Orders", href: "/account/orders", icon: "📦" },
  { label: "Wishlist", href: "/account/wishlist", icon: "❤️" },
  { label: "Addresses", href: "/account/addresses", icon: "📍" },
  { label: "Settings", href: "/account/settings", icon: "⚙️" },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useUser();

  return (
    <aside className="lg:w-64 lg:shrink-0">
      {/* User info */}
      <div className="mb-6 rounded-card border border-walnut/10 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-walnut/10 text-xl font-medium">
            {user?.user_metadata?.name?.charAt(0) ?? user?.email?.charAt(0) ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg truncate">
              {user?.user_metadata?.name ?? "Welcome"}
            </p>
            <p className="text-sm text-muted truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="rounded-card border border-walnut/10 bg-white">
        <ul>
          {NAV_ITEMS.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    relative flex items-center gap-3 px-6 py-4 text-sm transition-colors
                    ${isActive ? "text-walnut font-medium" : "text-muted hover:text-charcoal"}
                    ${i !== NAV_ITEMS.length - 1 ? "border-b border-walnut/5" : ""}
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="account-nav-indicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-walnut"
                    />
                  )}
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="mt-4 w-full rounded-card border border-walnut/10 bg-white px-6 py-4 text-sm text-muted transition-colors hover:border-rose hover:text-rose"
      >
        Sign Out
      </button>
    </aside>
  );
}
