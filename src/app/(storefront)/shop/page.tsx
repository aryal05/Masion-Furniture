import { Suspense } from "react";
import { ShopClient } from "@/components/shop/ShopClient";
import { ShopSkeleton } from "@/components/shop/ShopSkeleton";

export const metadata = {
  title: "Shop All Furniture | Maison",
  description: "Handcrafted walnut & oak furniture. Living room, bedroom, dining & office collections.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}