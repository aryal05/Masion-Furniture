"use client";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice, formatDate, getInitials } from "@/lib/utils";
import type { Order, User } from "@/types";

export default function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data: customer, isLoading: loadingCustomer } = useQuery({
    queryKey: ["admin-customer", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      return data as User;
    },
  });

  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ["admin-customer-orders", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      return (data ?? []) as Order[];
    },
  });

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  if (loadingCustomer) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-shimmer rounded" />
        <div className="h-48 animate-shimmer rounded-card" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
        <p className="font-display text-lg">Customer not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/admin/customers")}
        className="text-sm text-muted hover:text-walnut"
      >
        ← Back to Customers
      </button>

      {/* Customer Profile Card */}
      <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <div className="flex items-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-walnut/10 text-2xl font-medium">
            {getInitials(customer.name ?? customer.email)}
          </div>
          <div>
            <h1 className="font-display text-2xl">
              {customer.name ?? "Unnamed"}
            </h1>
            <p className="text-muted">{customer.email}</p>
            {customer.phone && (
              <p className="text-sm text-muted">{customer.phone}</p>
            )}
            <p className="mt-1 text-xs text-muted">
              Member since {formatDate(customer.created_at)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
          <p className="text-sm text-muted">Total Orders</p>
          <p className="mt-1 font-display text-2xl">{orders.length}</p>
        </div>
        <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
          <p className="text-sm text-muted">Total Spent</p>
          <p className="mt-1 font-display text-2xl">{formatPrice(totalSpent)}</p>
        </div>
        <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
          <p className="text-sm text-muted">Avg Order Value</p>
          <p className="mt-1 font-display text-2xl">
            {orders.length > 0
              ? formatPrice(totalSpent / orders.length)
              : "—"}
          </p>
        </div>
      </div>

      {/* Order History */}
      <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h3 className="font-display text-lg mb-4">Order History</h3>

        {loadingOrders ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-shimmer rounded" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-muted py-8">No orders yet</p>
        ) : (
          <div className="divide-y divide-walnut/5">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/admin/orders/${order.id}`)}
                className="flex items-center justify-between py-4 cursor-pointer hover:bg-walnut/5 -mx-6 px-6 transition-colors"
              >
                <div>
                  <p className="font-medium">{order.order_number}</p>
                  <p className="text-sm text-muted">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <span className="font-medium">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
