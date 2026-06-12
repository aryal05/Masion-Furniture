"use client";
import { useOrderRealtime } from "@/hooks/useOrderRealtime";
import { OrderTimeline } from "@/components/account/OrderTimeline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TrackOrderPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;
  const { order, loading, error } = useOrderRealtime(orderNumber);

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-4 pt-28 pb-24 md:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-walnut/10 rounded" />
          <div className="h-64 bg-walnut/10 rounded-card" />
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="mx-auto max-w-2xl px-4 pt-28 pb-24 text-center md:px-8">
        <h1 className="font-display text-2xl">Order Not Found</h1>
        <p className="mt-2 text-muted">
          We couldn't find an order with that number.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-btn bg-walnut px-8 py-4 text-sm uppercase tracking-label text-ivory"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 pt-28 pb-24 md:px-8">
      <header className="mb-8">
        <p className="eyebrow">Order Tracking</p>
        <h1 className="mt-2 font-display text-3xl">{order.order_number}</h1>
        <div className="mt-2 flex items-center gap-3">
          <StatusBadge status={order.status} size="md" />
          <StatusBadge status={order.payment_status} size="md" />
        </div>
      </header>

      <div className="rounded-card border border-walnut/10 bg-white p-8 shadow-warm">
        <OrderTimeline
          status={order.status}
          createdAt={order.created_at}
          updatedAt={order.updated_at}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
          <h3 className="eyebrow !text-charcoal mb-3">Shipping Address</h3>
          <p className="text-sm">{order.shipping_address?.name}</p>
          <p className="text-sm text-muted">{order.shipping_address?.line1}</p>
          <p className="text-sm text-muted">
            {order.shipping_address?.city}, {order.shipping_address?.district}
          </p>
          <p className="text-sm text-muted">{order.shipping_address?.phone}</p>
        </div>

        <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
          <h3 className="eyebrow !text-charcoal mb-3">Order Total</h3>
          <p className="font-display text-2xl">
            NPR {order.total.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-muted capitalize">
            {order.payment_method.replace("_", " ")}
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        This page updates in real-time. You'll see status changes as they happen.
      </p>
    </main>
  );
}
