"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "🪑" },
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Customers", href: "/admin/customers", icon: "👥" },
  { label: "Inventory", href: "/admin/inventory", icon: "📋" },
  { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  { label: "Promo Codes", href: "/admin/promo-codes", icon: "🎟️" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r border-walnut/10 bg-ivory">
      <div className="flex h-20 items-center px-6 border-b border-walnut/10">
        <Link href="/admin" className="font-display text-2xl">
          Maison <span className="text-brass">Admin</span>
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    relative flex items-center gap-3 rounded-btn px-4 py-3 text-sm transition-colors
                    ${isActive ? "text-walnut font-medium" : "text-muted hover:text-charcoal hover:bg-walnut/5"}
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="admin-nav-bg"
                      className="absolute inset-0 rounded-btn bg-walnut/10"
                    />
                  )}
                  <span className="relative">{item.icon}</span>
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-walnut/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted hover:text-charcoal"
        >
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}
