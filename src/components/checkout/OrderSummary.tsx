"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/stores/cart";
import { useCheckout } from "@/stores/checkout";
import { SHIPPING_METHODS } from "@/lib/shipping";

export function OrderSummary() {
  const { items, subtotal } = useCart();
  const { shipping, discountCode, setDiscountCode } = useCheckout();
  const [code, setCode] = useState("");

  const shippingCost = shipping
    ? SHIPPING_METHODS.find((m) => m.id === shipping.method)!.cost(subtotal())
    : 0;

  return (
    <aside className="h-fit rounded-card border border-walnut/10 bg-white p-6 shadow-warm lg:sticky lg:top-28">
      <h2 className="eyebrow !text-charcoal mb-5">Order Summary</h2>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.variantId} className="flex gap-3 text-sm">
            <div className="relative">
              <Image src={i.image} alt={i.name} width={56} height={56} className="rounded-btn object-cover" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-walnut text-[10px] text-ivory">
                {i.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p>{i.name}</p>
              <p className="text-xs text-muted">{i.variantLabel}</p>
            </div>
            <p>NPR {(i.price * i.quantity).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* Discount code */}
      <div className="mt-5 flex gap-2">
        <input
          value={code} onChange={(e) => setCode(e.target.value)}
          placeholder="Discount code" className="input flex-1 !py-2.5"
        />
        <button onClick={() => setDiscountCode(code || null)}
          className="rounded-btn border border-walnut px-4 text-xs uppercase tracking-label">
          Apply
        </button>
      </div>
      {discountCode && <p className="mt-2 text-xs text-sage">Code "{discountCode}" will be validated at order placement.</p>}

      <div className="mt-5 space-y-2 border-t border-walnut/10 pt-4 text-sm">
        <Row label="Subtotal" value={`NPR ${subtotal().toLocaleString()}`} />
        <Row label="Shipping" value={shipping ? (shippingCost === 0 ? "Free" : `NPR ${shippingCost.toLocaleString()}`) : "Calculated at next step"} />
        <div className="flex justify-between border-t border-walnut/10 pt-3 font-display text-lg">
          <span>Total</span>
          <span>NPR {(subtotal() + shippingCost).toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted">{label}</span><span>{value}</span></div>;
}