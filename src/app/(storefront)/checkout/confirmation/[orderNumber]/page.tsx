import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AnimatedCheckmark } from "@/components/checkout/AnimatedCheckmark";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function ConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("order_number", orderNumber)
    .single();

  if (error || !order) notFound();

  return (
    <main className="mx-auto max-w-2xl px-4 pt-28 pb-24 text-center md:px-8">
      <AnimatedCheckmark />

      <h1 className="mt-8 font-display text-3xl md:text-4xl">
        Thank you for your order!
      </h1>

      <p className="mt-4 text-muted">
        Your order <strong>{order.order_number}</strong> has been placed
        successfully.
      </p>

      <div className="mt-8 rounded-card border border-walnut/10 bg-white p-8 text-left shadow-warm">
        <h2 className="font-display text-lg mb-4">Order Summary</h2>

        <div className="space-y-3 border-b border-walnut/10 pb-4">
          {order.items?.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>NPR {order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span>
              {order.shipping_cost === 0
                ? "Free"
                : `NPR ${order.shipping_cost.toLocaleString()}`}
            </span>
          </div>
          {order.discount_amount > 0 && (
            <div className="flex justify-between text-sage">
              <span>Discount</span>
              <span>-NPR {order.discount_amount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-walnut/10 pt-3 font-display text-lg">
            <span>Total</span>
            <span>NPR {order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-card bg-walnut/5 p-6 text-left text-sm">
        <p className="font-medium mb-2">What's next?</p>
        <ul className="space-y-1 text-muted">
          <li>• You'll receive an email confirmation shortly</li>
          <li>• We'll notify you when your order ships</li>
          <li>• Track your order anytime from your account</li>
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href={`/orders/${orderNumber}/track`}
          className="rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory"
        >
          Track Order
        </Link>
        <Link
          href="/shop"
          className="rounded-btn border border-walnut px-8 py-4 text-sm uppercase tracking-label"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
