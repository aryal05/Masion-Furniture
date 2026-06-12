'use client';

import { m } from 'framer-motion';
import { useCart } from '@/stores/cart';

export default function Cart() {
  const items = useCart((state) => state.items);
  const updateQty = useCart((state) => state.updateQty);
  const removeItem = useCart((state) => state.removeItem);
  const subtotal = useCart((state) => state.subtotal());
  const count = useCart((state) => state.count());

  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <m.a
              href="/"
              className="text-2xl font-light tracking-[0.2em]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              MAISON
            </m.a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/collections" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Collections</a>
              <a href="/about" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">About</a>
              <a href="/craftsmanship" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Craftsmanship</a>
              <a href="/contact" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Contact</a>
            </div>
            <a href="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span id="cart-count" className="absolute -top-2 -right-2 bg-amber-500 text-neutral-950 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <section className="pt-32 px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] mb-12">SHOPPING CART</h1>

          {items.length === 0 ? (
            <m.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-neutral-400 mb-8">Your cart is empty</p>
              <m.a
                href="/collections"
                className="inline-block px-12 py-4 bg-amber-500 text-neutral-950 font-medium tracking-widest hover:bg-amber-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONTINUE SHOPPING
              </m.a>
            </m.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-8">
                {items.map((item: any, index: number) => (
                  <m.div
                    key={item.variantId}
                    className="flex gap-6 border-b border-neutral-800 pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-32 h-32 bg-neutral-800 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-light tracking-widest mb-2">{item.name}</h3>
                      <p className="text-amber-400 font-light mb-4">${item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-neutral-700">
                          <button
                            onClick={() => updateQty(item.variantId, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-neutral-800 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 min-w-[50px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.variantId, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-neutral-800 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-neutral-400 hover:text-red-400 transition-colors text-sm tracking-widest"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-light">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* Order Summary */}
              <m.div
                className="bg-neutral-900 p-8 h-fit"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-light tracking-[0.2em] mb-6">ORDER SUMMARY</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="border-t border-neutral-800 pt-4 flex justify-between text-xl">
                    <span>Total</span>
                    <span className="text-amber-400">${total.toLocaleString()}</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-neutral-400 mb-6">
                    Add ${(5000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <m.a
                  href="/checkout"
                  className="block w-full py-4 bg-amber-500 text-neutral-950 font-medium tracking-widest hover:bg-amber-400 transition-colors mb-4 text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  PROCEED TO CHECKOUT
                </m.a>
                <m.a
                  href="/collections"
                  className="block w-full py-4 border border-neutral-700 text-center font-medium tracking-widest hover:border-amber-500 hover:text-amber-400 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  CONTINUE SHOPPING
                </m.a>
              </m.div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-8 lg:px-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center text-neutral-500 text-sm">
          <p>&copy; 2024 MAISON. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
