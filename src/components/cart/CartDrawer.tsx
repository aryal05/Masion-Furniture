"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/stores/cart";

export function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, subtotal, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog" aria-label="Shopping cart"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-warm-lg"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <header className="flex items-center justify-between border-b border-walnut/10 p-6">
              <h2 className="font-display text-xl">Your Cart ({count()})</h2>
              <button onClick={closeDrawer} aria-label="Close cart" className="h-11 w-11 grid place-items-center">✕</button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-lg">Your cart is empty</p>
                  <button onClick={closeDrawer} className="mt-4 text-sm uppercase tracking-label text-walnut underline">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <motion.ul layout className="space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <motion.li
                        key={item.variantId} layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 } }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="group flex gap-4 overflow-hidden"
                      >
                        <Image src={item.image} alt={item.name} width={60} height={60}
                          className="rounded-btn object-cover" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted">{item.variantLabel}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <button aria-label="Decrease quantity" onClick={() => updateQty(item.variantId, item.quantity - 1)} className="h-7 w-7 border border-walnut/20 rounded-btn">−</button>
                            <span className="text-sm">{item.quantity}</span>
                            <button aria-label="Increase quantity" onClick={() => updateQty(item.variantId, item.quantity + 1)} className="h-7 w-7 border border-walnut/20 rounded-btn">+</button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">NPR {(item.price * item.quantity).toLocaleString()}</p>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            aria-label={`Remove ${item.name}`}
                            className="mt-2 text-xs text-rose opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-walnut/10 p-6 space-y-4">
                <div className="flex justify-between font-display text-lg">
                  <span>Subtotal</span>
                  <motion.span key={subtotal()} initial={{ backgroundColor: "rgba(201,147,58,0.3)" }}
                    animate={{ backgroundColor: "rgba(201,147,58,0)" }} transition={{ duration: 0.8 }}
                    className="px-1 rounded">
                    NPR {subtotal().toLocaleString()}
                  </motion.span>
                </div>
                <a href="/checkout" className="block w-full rounded-btn bg-walnut py-4 text-center text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5">
                  Checkout
                </a>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}