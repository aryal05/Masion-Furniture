"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCheckout } from "@/stores/checkout";
import { useCart } from "@/stores/cart";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { StepAddress } from "@/components/checkout/StepAddress";
import { StepShipping } from "@/components/checkout/StepShipping";
import { StepPayment } from "@/components/checkout/StepPayment";
import { StepReview } from "@/components/checkout/StepReview";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import Link from "next/link";

const STEPS = { 1: StepAddress, 2: StepShipping, 3: StepPayment, 4: StepReview };

export default function CheckoutPage() {
  const { step } = useCheckout();
  const items = useCart((s) => s.items);
  const StepComponent = STEPS[step];

  if (items.length === 0) {
    return (
      <main className="grid min-h-[60vh] place-items-center pt-28 text-center">
        <div>
          <h1 className="font-display text-3xl">Your cart is empty</h1>
          <Link href="/shop" className="mt-6 inline-block rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-24 md:px-8">
      <h1 className="font-display text-3xl mb-8">Checkout</h1>
      <CheckoutStepper />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </div>
        <OrderSummary />
      </div>
    </main>
  );
}