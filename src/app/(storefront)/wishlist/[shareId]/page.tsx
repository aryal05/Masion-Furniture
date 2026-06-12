import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ shareId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params;
  return {
    title: `Shared Wishlist | Maison Furniture`,
    description: `View this curated wishlist of handcrafted furniture.`,
  };
}

export default async function SharedWishlistPage({ params }: Props) {
  const { shareId } = await params;
  const supabase = await createClient();

  const { data: wishlist, error } = await supabase
    .from("shared_wishlists")
    .select(`
      id,
      name,
      user:profiles(name),
      items:wishlist_items(
        product:products(id, name, slug, price, material, product_images(url))
      )
    `)
    .eq("share_id", shareId)
    .eq("is_public", true)
    .single();

  if (error || !wishlist) notFound();

  const products = wishlist.items?.map((i: any) => i.product).filter(Boolean) ?? [];

  return (
    <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8">
      <header className="mb-12 text-center">
        <p className="eyebrow">Shared Wishlist</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">
          {wishlist.name || `${(wishlist.user as any)?.[0]?.name}'s Wishlist`}
        </h1>
        <p className="mt-2 text-muted">
          {products.length} item{products.length !== 1 ? "s" : ""}
        </p>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">This wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-card bg-white shadow-warm">
                <Image
                  src={product.product_images?.[0]?.url}
                  alt={product.name}
                  width={400}
                  height={533}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-lg">{product.name}</h3>
              <p className="mt-1 text-sm text-muted">{product.material}</p>
              <p className="mt-1 text-sm">
                NPR {product.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <p className="text-muted mb-4">Create your own wishlist</p>
        <Link
          href="/shop"
          className="inline-block rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory"
        >
          Start Shopping
        </Link>
      </div>
    </main>
  );
}
