"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/stores/checkout";
import { useCart } from "@/stores/cart";

export function StepReview() {
  const { address, shipping, payment, discountCode, goTo, reset } = useCheckout();
  const { items, clearCart } = useCart() as any;
  const [terms, setTerms] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const placeOrder = async () => {
    if (!terms) return setError("Please accept the terms & conditions.");
    setPlacing(true); setError(null);
    try {
      const res = await fetch("/api/checkout/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i: any) => ({ variantId: i.variantId, quantity: i.quantity })),
          address, shipping, payment, discountCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order failed");

      if (data.redirectUrl) {
        // eSewa / Khalti — redirect to payment gateway
        window.location.href = data.redirectUrl;
      } else {
        reset();
        useCart.setState({ items: [] });
        router.push(`/checkout/confirmation/${data.orderNumber}`);
      }
    } catch (e: any) {
      setError(e.message);
      setPlacing(false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-display text-2xl">Review & Confirm</h2>

      <ReviewBlock title="Delivery Address" onEdit={() => goTo(1)}>
        <p>{address?.name} · {address?.phone}</p>
        <p className="text-muted">{address?.line1}{address?.line2 && `, ${address.line2}`}, {address?.city}, {address?.district}, {address?.province} {address?.pincode}</p>
      </ReviewBlock>

      <ReviewBlock title="Shipping" onEdit={() => goTo(2)}>
        <p className="capitalize">{shipping?.method}</p>
      </ReviewBlock>

      <ReviewBlock title="Payment" onEdit={() => goTo(3)}>
        <p className="capitalize">{payment?.method.replace("_", " ")}</p>
      </ReviewBlock>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5 h-4 w-4 accent-walnut" />
        <span>I agree to the <a href="/terms" className="underline">Terms & Conditions</a> and <a href="/returns" className="underline">Return Policy</a>.</span>
      </label>

      {error && <p role="alert" className="text-sm text-rose">{error}</p>}

      <motion.button
        onClick={placeOrder}
        disabled={placing}
        animate={placing ? {} : { scale: [1, 1.015, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-full rounded-btn bg-walnut py-5 text-sm uppercase tracking-label text-ivory disabled:opacity-60 sm:w-auto sm:px-16"
      >
        {placing ? "Placing Order…" : "Place Order"}
      </motion.button>
    </section>
  );
}

function ReviewBlock({ title, onEdit, children }: {
  title: string; onEdit: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-walnut/10 bg-white p-5 shadow-warm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="eyebrow !text-charcoal">{title}</h3>
        <button onClick={onEdit} className="text-xs text-walnut underline underline-offset-4">Edit</button>
      </div>
      <div className="text-sm space-y-0.5">{children}</div>
    </div>
  );
}