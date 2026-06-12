"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { useWishlist } from "@/stores/wishlist";
import { useCart } from "@/stores/cart";
import { useUI } from "@/stores/ui";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function AccountWishlistPage() {
  const { user } = useUser();
  const wishlist = useWishlist();
  const cart = useCart();
  const addToast = useUI((s) => s.addToast);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["wishlist-products", wishlist.items],
    queryFn: async () => {
      if (wishlist.items.length === 0) return [];
      const { data } = await supabase
        .from("products")
        .select("*, product_images(url, alt, sort_order), variants(*)")
        .in("id", wishlist.items);
      return (data ?? []) as Product[];
    },
    enabled: wishlist.items.length > 0,
  });

  const handleAddToCart = (product: Product) => {
    const defaultVariant = product.variants?.find((v) => v.is_default) ??
      product.variants?.[0];
    if (!defaultVariant) return;

    cart.addItem({
      variantId: defaultVariant.id,
      productId: product.id,
      name: product.name,
      variantLabel: [defaultVariant.color, defaultVariant.size]
        .filter(Boolean)
        .join(" / ") || "Default",
      image: product.images?.[0]?.url ?? "",
      price: defaultVariant.price ?? product.price,
      quantity: 1,
      maxStock: defaultVariant.stock,
    });

    addToast({
      type: "success",
      message: `${product.name} added to cart`,
      action: {
        label: "View Cart",
        onClick: () => cart.openDrawer(),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">
          My Wishlist ({wishlist.items.length})
        </h2>
        {wishlist.items.length > 0 && (
          <button
            onClick={() => wishlist.clear()}
            className="text-sm text-muted hover:text-rose"
          >
            Clear All
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-shimmer rounded-card" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
          <span className="text-4xl">❤️</span>
          <p className="mt-4 font-display text-lg">Your wishlist is empty</p>
          <p className="mt-2 text-sm text-muted">
            Save items you love by clicking the heart icon on products.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const mainImage = product.images?.sort(
              (a, b) => a.sort_order - b.sort_order
            )[0];

            return (
              <div
                key={product.id}
                className="group rounded-card border border-walnut/10 bg-white shadow-warm overflow-hidden"
              >
                {/* Image */}
                <Link href={`/products/${product.slug}`} className="block">
                  <div
                    className="aspect-[4/3] bg-walnut/5 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: mainImage
                        ? `url(${mainImage.url})`
                        : undefined,
                    }}
                  />
                </Link>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium line-clamp-1 hover:text-walnut">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-muted line-clamp-1">
                    {product.material}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-display text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.compare_at_price && (
                      <span className="text-sm text-muted line-through">
                        {formatPrice(product.compare_at_price)}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 rounded-btn bg-walnut py-2.5 text-sm uppercase tracking-label text-ivory"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => wishlist.remove(product.id)}
                      className="grid h-10 w-10 place-items-center rounded-btn border border-walnut/20 text-rose hover:bg-rose/5"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
