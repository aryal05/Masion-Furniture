"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "./TopBar";
import { NewNavbar } from "./NewNavbar";
import { SearchOverlay } from "./SearchOverlay";
import { Footer } from "./Footer";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show main site layout on admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <NewNavbar />
      <SearchOverlay />
      {/* Spacer for fixed navbar - mobile: 56px top, desktop: topbar + nav height */}
      <div className="h-14 md:h-[calc(var(--topbar-height,32px)+var(--nav-height,72px))]" />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
    </>
  );
}
