"use client";
import { useCheckout } from "@/stores/checkout";
import { useCart } from "@/stores/cart";
import { SHIPPING_METHODS, estimatedDeliveryDate } from "@/lib/shipping";

export function StepShipping() {
  const { shipping, setShipping, goTo } = useCheckout();
  const subtotal = useCart((s) => s.subtotal());

  return (
    <section>
      <h2 className="font-display text-2xl mb-6">Shipping Method</h2>
      <div className="space-y-3">
        {SHIPPING_METHODS.map((m) => {
          const cost = m.cost(subtotal);
          const selected = shipping?.method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setShipping({ method: m.id })}
              aria-pressed={selected}
              className={`flex w-full items-center justify-between rounded-card border bg-white p-5 text-left transition-all ${
                selected ? "border-walnut shadow-warm" : "border-walnut/15 hover:border-walnut/40"
              }`}
            >
              <div>
                <p className="font-medium">{m.label}</p>
                <p className="mt-1 text-sm text-muted">
                  {m.eta[0] === 0 ? "Ready today" :
                    `Arrives by ${estimatedDeliveryDate(m.eta[1])}`}
                </p>
              </div>
              <span className={cost === 0 ? "text-sage font-medium" : ""}>
                {cost === 0 ? "Free" : `NPR ${cost.toLocaleString()}`}
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={() => goTo(1)} className="mt-8 text-sm text-muted underline underline-offset-4">
        ← Back to Address
      </button>
    </section>
  );
}