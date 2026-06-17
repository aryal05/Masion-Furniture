"use client";
import { motion } from "framer-motion";
import { useCart } from "@/stores/cart";
import type { Product, Variant } from "@/types";

interface Props {
  product: Product;
  selectedVariant: Variant | null;
  quantity: number;
}

export function MobileStickyBar({ product, selectedVariant, quantity }: Props) {
  const { addItem, openDrawer } = useCart();
  const price = selectedVariant?.price ?? product.price;
  const stock = selectedVariant?.stock ?? 0;
  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      variantLabel: [selectedVariant.color, selectedVariant.size].filter(Boolean).join(" / "),
      image: typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url || '',
      price,
      quantity,
      maxStock: stock,
    });

    openDrawer();
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-walnut/10 bg-ivory/95 p-4 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg">NPR {price.toLocaleString()}</p>
          {product.compare_at_price && (
            <p className="text-xs text-muted line-through">
              NPR {product.compare_at_price.toLocaleString()}
            </p>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 rounded-btn bg-walnut py-4 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}
