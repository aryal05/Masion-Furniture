"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";
import { useState } from "react";

interface Props {
  excludeId?: string;
}

export function RecentlyViewed({ excludeId }: Props) {
  const { items } = useRecentlyViewed();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const productIds = items.filter((id) => id !== excludeId).slice(0, 4);

  const { data: products, isLoading } = useQuery({
    queryKey: ["recently-viewed", productIds],
    queryFn: async () => {
      if (!productIds.length) return [];
      const { data } = await supabase
        .from("products")
        .select("*, product_images(url, alt, sort_order)")
        .in("id", productIds);
      // Maintain order of recently viewed
      return productIds
        .map((id) => data?.find((p) => p.id === id))
        .filter(Boolean) as Product[];
    },
    enabled: productIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  if (!productIds.length || isLoading) return null;
  if (!products?.length) return null;

  return (
    <section className="mt-16 border-t border-walnut/10 pt-16">
      <h2 className="font-display text-2xl mb-8">Recently Viewed</h2>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>
    </section>
  );
}
