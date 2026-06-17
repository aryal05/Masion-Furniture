'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { BottomSheet } from '@/components/ui/BottomSheet';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const subtotal = getTotalPrice();
  const totalItems = getTotalItems();
  const shipping = subtotal >= 180 ? 0 : 15;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8A8A8A] text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push('/')}
            className="text-[#2D4A2D] font-medium underline"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F5F5F0] pb-20 md:pb-0"
    >
      {/* Progress Bar - Mobile (Linear) */}
      <div className="lg:hidden bg-white border-b px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#2D4A2D]">Step {step} of 2</span>
          <span className="text-xs text-[#8A8A8A]">{step === 1 ? 'Shipping' : 'Payment'}</span>
        </div>
        <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
          <m.div
            className="h-full bg-[#2D4A2D]"
            initial={{ width: '50%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Progress Stepper - Desktop (Circular) */}
      <div className="hidden lg:block bg-white border-b px-4 md:px-8 lg:px-14 xl:px-16 py-5 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {['Shipping', 'Payment', 'Confirmation'].map((label, index) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step > index + 1
                    ? 'bg-[#2D4A2D] text-white'
                    : step === index + 1
                    ? 'bg-[#2D4A2D] text-white'
                    : 'border-2 border-[#E0E0E0] text-[#8A8A8A]'
                }`}
              >
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  step === index + 1 ? 'text-[#2D4A2D]' : 'text-[#8A8A8A]'
                }`}
              >
                {label}
              </span>
              {index < 2 && (
                <div className="w-16 h-0.5 bg-[#E0E0E0] ml-2">
                  <m.div
                    className="h-full bg-[#2D4A2D]"
                    initial={{ width: 0 }}
                    animate={{ width: step > index + 1 ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-6 md:py-10">
        {/* Left - Form Steps */}
        <div>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <m.div
                key="step1"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">First Name</label>
                    <input
                      type="text"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Last Name</label>
                    <input
                      type="text"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Email</label>
                    <input
                      type="email"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Address</label>
                    <input
                      type="text"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">City</label>
                    <input
                      type="text"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">State</label>
                    <input
                      type="text"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">ZIP Code</label>
                    <input
                      type="text"
                      className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 md:py-3 h-12 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                      placeholder="10001"
                    />
                  </div>
                </div>
                <m.button
                  onClick={() => setStep(2)}
                  className="w-full bg-[#2D4A2D] text-white rounded-full py-4 font-semibold mt-6"
                  whileHover={{ scale: 1.02, backgroundColor: '#3A5A3A' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Payment →
                </m.button>
              </m.div>
            )}

            {step === 2 && (
              <m.div
                key="step2"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                    { id: 'apple', label: 'Apple Pay', icon: '🍎' }
                  ].map((method) => (
                    <m.button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full border-2 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-[#2D4A2D] bg-[#2D4A2D]/5'
                          : 'border-[#E0E0E0]'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id
                          ? 'border-[#2D4A2D] bg-[#2D4A2D]'
                          : 'border-[#E0E0E0]'
                      }`}>
                        {selectedPayment === method.id && (
                          <m.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-xs"
                          >
                            ✓
                          </m.span>
                        )}
                      </div>
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium">{method.label}</span>
                    </m.button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedPayment === 'card' && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Card Number</label>
                        <input
                          type="text"
                          className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Expiry</label>
                          <input
                            type="text"
                            className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">CVV</label>
                          <input
                            type="text"
                            className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Name on Card</label>
                        <input
                          type="text"
                          className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:border-[#2D4A2D] focus:ring-2 focus:ring-[#2D4A2D]/20 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 mt-6">
                  <m.button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-[#2D4A2D] text-[#2D4A2D] rounded-full py-4 font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back
                  </m.button>
                  <m.button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-[#2D4A2D] text-white rounded-full py-4 font-semibold"
                    whileHover={{ scale: 1.02, backgroundColor: '#3A5A3A' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Place Order →
                  </m.button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right - Order Summary - Desktop only */}
        <m.div
          className="hidden lg:block bg-white rounded-2xl p-6 sticky top-24"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-bold text-xl mb-5">Order Summary</h2>
          
          <div className="space-y-3 mb-5">
            <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
              <span className="text-[#4A4A4A]">Subtotal ({totalItems} items)</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#F0F0F0]">
              <span className="text-[#4A4A4A]">Shipping</span>
              <span className="font-medium text-[#2D4A2D]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t-2 border-[#1A1A1A] my-3 pt-3 flex justify-between">
              <span className="font-black text-2xl text-[#1A1A1A]">Total</span>
              <span className="font-black text-2xl text-[#1A1A1A]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Collapsed Item List */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-[#F5F5F0] rounded-lg p-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-[#8A8A8A]">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-xs text-[#8A8A8A] text-center">+{items.length - 3} more items</p>
            )}
          </div>
        </m.div>
      </div>

      {/* Mobile Sticky Bottom Bar — Above bottom nav */}
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
          onClick={() => setShowOrderSummary(true)}
          className="flex-1 bg-[#2D4A2D] text-white rounded-full py-3 font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          View Summary
        </m.button>
      </m.div>

      {/* Mobile Bottom Sheet for Order Summary */}
      <BottomSheet
        isOpen={showOrderSummary}
        onClose={() => setShowOrderSummary(false)}
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
          <div className="border-t-2 border-[#1A1A1A] my-3 pt-3 flex justify-between">
            <span className="font-black text-2xl text-[#1A1A1A]">Total</span>
            <span className="font-black text-2xl text-[#1A1A1A]">${total.toFixed(2)}</span>
          </div>

          {/* Item List */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-[#F5F5F0] rounded-lg p-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-[#8A8A8A]">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </BottomSheet>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <m.div
                className="w-20 h-20 rounded-full border-4 border-[#2D4A2D] border-t-transparent mx-auto"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <p className="mt-4 text-[#1A1A1A] font-medium">Processing your order...</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
