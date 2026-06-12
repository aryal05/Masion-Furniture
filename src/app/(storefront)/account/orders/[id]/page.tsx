"use client";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { OrderTimeline } from "@/components/account/OrderTimeline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useUser();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order-detail", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", id)
        .eq("user_id", user!.id)
        .single();
      return data as Order;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-shimmer rounded" />
        <div className="h-64 animate-shimmer rounded-card" />
        <div className="h-48 animate-shimmer rounded-card" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
        <p className="font-display text-lg">Order not found</p>
        <Link
          href="/account/orders"
          className="mt-4 inline-block text-sm text-walnut underline"
        >
          ← Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/account/orders"
            className="text-sm text-muted hover:text-walnut"
          >
            ← Back to orders
          </Link>
          <h2 className="mt-2 font-display text-xl">{order.order_number}</h2>
          <p className="text-sm text-muted">
            Placed on {formatDate(order.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} size="md" />
          <StatusBadge status={order.payment_status} size="md" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Timeline + Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Order Status</h3>
            <OrderTimeline
              status={order.status}
              createdAt={order.created_at}
              updatedAt={order.updated_at}
            />
          </div>

          {/* Items */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Items</h3>
            <div className="divide-y divide-walnut/5">
              {order.items?.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div
                    className="h-20 w-20 shrink-0 rounded-btn bg-walnut/5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image_url})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">{item.variant_label}</p>
                    <p className="text-sm text-muted">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Summary + Shipping */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Order Summary</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd>
                  {order.shipping_cost === 0
                    ? "Free"
                    : formatPrice(order.shipping_cost)}
                </dd>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-sage">
                  <dt>Discount</dt>
                  <dd>-{formatPrice(order.discount_amount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-walnut/10 pt-3 font-display text-lg">
                <dt>Total</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>

          {/* Shipping Address */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Shipping Address</h3>
            {order.shipping_address && (
              <div className="text-sm text-muted space-y-1">
                <p className="font-medium text-charcoal">
                  {order.shipping_address.name}
                </p>
                <p>{order.shipping_address.phone}</p>
                <p>{order.shipping_address.line1}</p>
                {order.shipping_address.line2 && (
                  <p>{order.shipping_address.line2}</p>
                )}
                <p>
                  {order.shipping_address.city},{" "}
                  {order.shipping_address.district}
                </p>
                <p>
                  {order.shipping_address.province}{" "}
                  {order.shipping_address.pincode}
                </p>
              </div>
            )}
          </div>

          {/* Payment & Shipping Method */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Payment</dt>
                <dd className="capitalize">
                  {order.payment_method?.replace("_", " ")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="capitalize">
                  {order.shipping_method?.replace("_", " ")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
