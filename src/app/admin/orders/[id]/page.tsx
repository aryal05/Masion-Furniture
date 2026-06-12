"use client";
import { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { OrderTimeline } from "@/components/account/OrderTimeline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";
import { useUI } from "@/stores/ui";
import type { Order, OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refunded",
];

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const addToast = useUI((s) => s.addToast);

  const { data: order, isLoading } = useQuery({
    queryKey: ["admin-order", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", id)
        .single();
      return data as Order;
    },
  });

  const statusMutation = useMutation({
    mutationFn: async (newStatus: OrderStatus) => {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-order", id] });
      addToast({ type: "success", message: "Order status updated" });
    },
    onError: (error) => {
      addToast({ type: "error", message: error.message });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-shimmer rounded" />
        <div className="h-64 animate-shimmer rounded-card" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
        <p className="font-display text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => router.push("/admin/orders")}
            className="text-sm text-muted hover:text-walnut"
          >
            ← Back to Orders
          </button>
          <h1 className="mt-2 font-display text-3xl">{order.order_number}</h1>
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Update */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => statusMutation.mutate(status)}
                  disabled={statusMutation.isPending || order.status === status}
                  className={`rounded-btn px-4 py-2 text-sm capitalize transition-colors ${
                    order.status === status
                      ? "bg-walnut text-ivory"
                      : "border border-walnut/20 hover:border-walnut"
                  } disabled:opacity-50`}
                >
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Order Timeline</h3>
            <OrderTimeline
              status={order.status}
              createdAt={order.created_at}
              updatedAt={order.updated_at}
            />
          </div>

          {/* Items */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">
              Items ({order.items?.length ?? 0})
            </h3>
            <div className="divide-y divide-walnut/5">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div
                    className="h-16 w-16 shrink-0 rounded-btn bg-walnut/5 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image_url})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">{item.variant_label}</p>
                    <p className="text-sm text-muted">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Summary</h3>
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

          {/* Customer */}
          <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
            <h3 className="font-display text-lg mb-4">Customer</h3>
            <div className="text-sm space-y-2">
              <p>{order.email}</p>
              <p className="text-muted capitalize">
                Payment: {order.payment_method?.replace("_", " ")}
              </p>
              <p className="text-muted capitalize">
                Shipping: {order.shipping_method?.replace("_", " ")}
              </p>
            </div>
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

          {order.notes && (
            <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
              <h3 className="font-display text-lg mb-4">Notes</h3>
              <p className="text-sm text-muted">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
