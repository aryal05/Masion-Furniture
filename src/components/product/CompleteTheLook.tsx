"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useCart } from "@/stores/cart";
import type { Product } from "@/types";

interface Props {
  productId: string;
}

export function CompleteTheLook({ productId }: Props) {
  const { addItem, openDrawer } = useCart();

  const { data: bundle, isLoading } = useQuery({
    queryKey: ["complete-the-look", productId],
    queryFn: async () => {
      // Fetch products that are commonly bought together
      const { data } = await supabase
        .from("product_bundles")
        .select(`
          bundle_product:products!bundle_product_id(
            id, name, slug, price, product_images(url)
          )
        `)
        .eq("product_id", productId)
        .limit(3);
      return data?.map((d) => d.bundle_product).filter(Boolean) ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !bundle?.length) return null;

  const totalPrice = bundle.reduce((sum: number, p: any) => sum + p.price, 0);

  const handleAddAll = () => {
    bundle.forEach((product: any) => {
      addItem({
        variantId: product.id,
        productId: product.id,
        name: product.name,
        variantLabel: "",
        image: product.product_images?.[0]?.url,
        price: product.price,
        quantity: 1,
        maxStock: 99,
      });
    });
    openDrawer();
  };

  return (
    <section className="mt-16 rounded-card border border-walnut/10 bg-walnut/5 p-6">
      <h2 className="font-display text-xl mb-6">Complete the Look</h2>

      <div className="flex flex-wrap gap-4">
        {bundle.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex items-center gap-3 rounded-card bg-white p-3 shadow-warm transition-shadow hover:shadow-warm-lg"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-btn">
              <Image
                src={product.product_images?.[0]?.url}
                alt={product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium group-hover:text-walnut">
                {product.name}
              </p>
              <p className="text-sm text-muted">
                NPR {product.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">Bundle total</p>
          <p className="font-display text-xl">NPR {totalPrice.toLocaleString()}</p>
        </div>
        <button
          onClick={handleAddAll}
          className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5"
        >
          Add All to Cart
        </button>
      </div>
    </section>
  );
}
