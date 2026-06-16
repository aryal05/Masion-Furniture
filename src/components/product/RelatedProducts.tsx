"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";
import { useState } from "react";

interface Props {
  currentProductId: string;
  categoryId: string;
}

export function RelatedProducts({ currentProductId, categoryId }: Props) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["related-products", categoryId, currentProductId],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, product_images(url, alt, sort_order)")
        .eq("category_id", categoryId)
        .eq("status", "published")
        .neq("id", currentProductId)
        .limit(4);
      return (data ?? []) as unknown as Product[];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="mt-16">
        <h2 className="font-display text-2xl mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="aspect-[3/4] animate-shimmer rounded-card" />
              <div className="mt-4 h-5 w-3/4 animate-shimmer rounded" />
              <div className="mt-2 h-4 w-1/3 animate-shimmer rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products?.length) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl mb-8">You May Also Like</h2>
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
