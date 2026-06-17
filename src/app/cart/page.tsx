'use client';

import { m, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { BottomSheet } from '@/components/ui/BottomSheet';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const subtotal = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = subtotal >= 180 ? 0 : 15;
  const total = subtotal + shipping - discount;

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      setIsPromoValid(true);
    }
  };

  return (
    <m.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F5F5F0] pb-24 md:pb-0"
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-6 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <h1 className="font-black text-2xl md:text-3xl text-[#1A1A1A]">Shopping Cart</h1>
          <span className="text-[#8A8A8A] text-sm md:text-base">({totalItems} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-8">
          {/* Left - Cart Items */}
          <div>
            <AnimatePresence>
              {items.length === 0 ? (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-[#8A8A8A] text-lg mb-4">Your cart is empty</p>
                  <button
                    onClick={() => router.back()}
                    className="text-[#2D4A2D] font-medium underline"
                  >
                    ← Continue Shopping
                  </button>
                </m.div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {items.map((item) => (
                    <SwipeableCartItem
                      key={item.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {items.length > 0 && (
              <button
                onClick={() => router.back()}
                className="text-[#2D4A2D] font-medium underline mt-4 text-sm md:text-base"
              >
                ← Continue Shopping
              </button>
            )}
          </div>

          {/* Right - Order Summary - Desktop only */}
          {items.length > 0 && (
            <m.div
              className="hidden lg:block bg-white rounded-2xl p-6 sticky top-24"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-bold text-xl mb-5">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                  <span className="text-[#4A4A4A]">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
                  <span className="text-[#4A4A4A]">Shipping</span>
                  <span className="font-medium text-[#2D4A2D]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <AnimatePresence>
                  {discount > 0 && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex justify-between py-2 border-b border-[#F0F0F0]"
                    >
                      <span className="text-[#D4A017]">Discount</span>
                      <span className="font-medium text-[#D4A017]">-${discount.toFixed(2)}</span>
                    </m.div>
                  )}
                </AnimatePresence>
                <div className="border-t-2 border-[#1A1A1A] my-3 pt-3 flex justify-between">
                  <span className="font-black text-2xl text-[#1A1A1A]">Total</span>
                  <span className="font-black text-2xl text-[#1A1A1A]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mt-4 mb-5">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className={`flex-1 border rounded-full px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                    isPromoValid ? 'border-green-500' : 'border-[#E0E0E0] focus:border-[#2D4A2D]'
                  }`}
                />
                <button
                  onClick={handlePromoCode}
                  className="bg-[#2D4A2D] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#3A5A3A] transition-colors"
                >
                  Apply
                </button>
              </div>

              <m.button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#2D4A2D] text-white rounded-full py-4 font-semibold text-base mt-2 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, backgroundColor: '#3A5A3A' }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout →
              </m.button>

              {/* Security Badges */}
              <div className="flex justify-center gap-4 mt-4">
                <span className="text-2xl">🔒</span>
                <span className="text-2xl">💳</span>
                <span className="text-2xl">🛡️</span>
              </div>
              <p className="text-[#8A8A8A] text-xs text-center mt-2">Secure checkout guaranteed</p>
            </m.div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar — Above bottom nav */}
      {items.length > 0 && (
        <m.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
          className="lg:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-[#E8E8E8] pb-safe h-20 flex items-center gap-3 px-4 z-40"
        >
          <div className="flex-1">
            <p className="text-xs text-[#8A8A8A]">Total ({totalItems} items)</p>
            <p className="font-black text-xl text-[#1A1A1A]">${total.toFixed(2)}</p>
          </div>
          <m.button
            onClick={() => setShowBottomSheet(true)}
            className="flex-1 bg-[#2D4A2D] text-white rounded-full py-3 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View Summary
          </m.button>
        </m.div>
      )}

      {/* Mobile Bottom Sheet for Order Summary */}
      <BottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        title="Order Summary"
      >
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-[#4A4A4A]">Subtotal ({totalItems} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
            <span className="text-[#4A4A4A]">Shipping</span>
            <span className="font-medium text-[#2D4A2D]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
              <span className="text-[#D4A017]">Discount</span>
              <span className="font-medium text-[#D4A017]">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t-2 border-[#1A1A1A] my-3 pt-3 flex justify-between">
            <span className="font-black text-2xl text-[#1A1A1A]">Total</span>
            <span className="font-black text-2xl text-[#1A1A1A]">${total.toFixed(2)}</span>
          </div>

          {/* Promo Code */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className={`flex-1 border rounded-full px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                isPromoValid ? 'border-green-500' : 'border-[#E0E0E0] focus:border-[#2D4A2D]'
              }`}
            />
            <button
              onClick={handlePromoCode}
              className="bg-[#2D4A2D] text-white rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Apply
            </button>
          </div>

          <m.button
            onClick={() => {
              setShowBottomSheet(false);
              router.push('/checkout');
            }}
            className="w-full bg-[#2D4A2D] text-white rounded-full py-4 font-semibold text-base mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Proceed to Checkout →
          </m.button>

          {/* Security Badges */}
          <div className="flex justify-center gap-4 mt-4">
            <span className="text-2xl">🔒</span>
            <span className="text-2xl">💳</span>
            <span className="text-2xl">🛡️</span>
          </div>
          <p className="text-[#8A8A8A] text-xs text-center mt-2">Secure checkout guaranteed</p>
        </div>
      </BottomSheet>
    </m.div>
  );
}

function SwipeableCartItem({ item, updateQuantity, removeItem }: any) {
  const x = useMotionValue(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -100) {
      setIsDeleting(true);
      setTimeout(() => removeItem(item.id), 300);
    } else {
      x.set(0);
    }
  };

  if (isDeleting) return null;

  return (
    <m.div
      layout
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0, height: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white rounded-2xl p-3 md:p-5 flex items-center gap-3 md:gap-5 relative overflow-hidden"
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
    >
      {/* Delete indicator */}
      <m.div
        className="absolute right-0 top-0 bottom-0 w-20 bg-red-500 flex items-center justify-center"
        style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
      >
        <span className="text-white font-bold">Delete</span>
      </m.div>

      <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-[#F5F5F0] object-contain p-2 flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#8A8A8A] text-xs uppercase truncate">{item.category || 'Chairs'}</p>
        <h3 className="font-bold text-sm md:text-lg text-[#1A1A1A] truncate">{item.name}</h3>
        <p className="text-xs md:text-sm text-[#8A8A8A] truncate">Color: {item.color} | Material: {item.material}</p>
      </div>
      <div className="flex items-center border border-[#E0E0E0] rounded-full overflow-hidden">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="px-3 md:px-4 py-2 md:py-2.5 hover:bg-[#F5F5F0] transition-colors text-lg md:text-base"
        >
          −
        </button>
        <span className="px-3 md:px-5 py-2 md:py-2.5 font-bold min-w-[40px] md:min-w-[50px] text-center border-x border-[#E0E0E0] text-sm md:text-base">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="px-3 md:px-4 py-2 md:py-2.5 hover:bg-[#F5F5F0] transition-colors text-lg md:text-base"
        >
          +
        </button>
      </div>
      <p className="font-bold text-base md:text-xl text-[#1A1A1A] ml-auto">${(item.price * item.quantity).toFixed(2)}</p>
      <m.button
        onClick={() => removeItem(item.id)}
        className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#E0E0E0] text-[#8A8A8A] hover:border-red-400 hover:text-red-400 transition-colors flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </m.button>
    </m.div>
  );
}
