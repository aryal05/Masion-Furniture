"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { MainNav } from "./MainNav";
import { MobileTopBar } from "./MobileTopBar";
import { MobileBottomNav } from "./MobileBottomNav";
import { Footer } from "./Footer";

/**
 * MainLayoutWrapper — Conditional layout wrapper for main site
 * 
 * Desktop (md+):
 * - AnnouncementBar (top promo bar)
 * - MainNav (main navbar with logo, links, icons)
 * 
 * Mobile (xs to md):
 * - MobileTopBar (sticky top with logo + search + cart)
 * - MobileBottomNav (fixed bottom with 5 tabs)
 * 
 * Admin routes: No layout (admin has its own layout)
 */
export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show main site layout on admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Desktop layers — hidden on mobile */}
      <AnnouncementBar />
      <MainNav />

      {/* Mobile top bar — hidden on md+ */}
      <MobileTopBar />

      {/* Page content */}
      <main className="flex-1 pb-16 md:pb-0">{children}</main>

      <Footer />

      {/* Mobile bottom nav — hidden on md+ */}
      <MobileBottomNav />
    </>
  );
}
