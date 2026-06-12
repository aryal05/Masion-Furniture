"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/stores/cart";
import { useFlyToCart } from "@/hooks/useFlyToCart";
import type { Product, Variant } from "@/types";

export function QuickViewModal({ product, onClose }: {
  product: Product | null;
  onClose: () => void;
}) {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [qty, setQty] = useState(1);
  const imgRef = useRef<HTMLDivElement>(null);
  const { addItem, openDrawer } = useCart();
  const flyToCart = useFlyToCart();

  const selected = variant ?? product?.variants?.[0] ?? null;

  const handleAdd = () => {
    if (!product || !selected) return;
    addItem({
      variantId: selected.id, productId: product.id,
      name: product.name,
      variantLabel: [selected.color, selected.size].filter(Boolean).join(" / "),
      image: product.images[0]?.url, price: selected.price ?? product.price,
      quantity: qty, maxStock: selected.stock,
    });
    if (imgRef.current) flyToCart(imgRef.current);
    setTimeout(openDrawer, 750); // open drawer after fly animation lands
    onClose();
  };

  return (
    <Dialog.Root open={!!product} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {product && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 grid w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 grid-cols-1 overflow-hidden rounded-card bg-white shadow-warm-lg md:grid-cols-2"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <div ref={imgRef} className="relative aspect-[3/4] md:aspect-auto">
                  <Image src={product.images[0]?.url} alt={product.name} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex flex-col p-6 md:p-8">
                  <Dialog.Title className="font-display text-2xl">{product.name}</Dialog.Title>
                  <p className="mt-1 text-sm text-muted">{product.material}</p>
                  <p className="mt-3 text-lg">NPR {(selected?.price ?? product.price).toLocaleString()}</p>

                  {/* Variants */}
                  {(product.variants?.length ?? 0) > 1 && (
                    <div className="mt-6">
                      <p className="eyebrow !text-charcoal mb-2">Options</p>
                      <div className="flex flex-wrap gap-2">
                        {product.variants?.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setVariant(v)}
                            disabled={v.stock === 0}
                            aria-pressed={selected?.id === v.id}
                            className={`rounded-btn border px-4 py-2 text-sm transition-colors disabled:opacity-40 disabled:line-through ${
                              selected?.id === v.id
                                ? "border-walnut bg-walnut text-ivory"
                                : "border-walnut/20 hover:border-walnut"
                            }`}
                          >
                            {[v.color, v.size].filter(Boolean).join(" / ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Qty + Add */}
                  <div className="mt-6 flex gap-3">
                    <div className="flex items-center rounded-btn border border-walnut/20">
                      <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-11">−</button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button aria-label="Increase" onClick={() => setQty((q) => Math.min(selected?.stock ?? 99, q + 1))} className="h-12 w-11">+</button>
                    </div>
                    <button
                      onClick={handleAdd}
                      disabled={!selected || selected.stock === 0}
                      className="flex-1 rounded-btn bg-walnut text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {selected?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>

                  <Link href={`/products/${product.slug}`} className="mt-auto pt-6 text-sm text-walnut underline underline-offset-4">
                    View Full Details →
                  </Link>
                </div>

                <Dialog.Close className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur" aria-label="Close">
                  ✕
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}