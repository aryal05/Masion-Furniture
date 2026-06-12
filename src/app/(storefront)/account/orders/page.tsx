"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

export default function AccountOrdersPage() {
  const { user } = useUser();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["account-orders", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return (data ?? []) as Order[];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl">Order History</h2>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-shimmer rounded-card" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
          <span className="text-4xl">📦</span>
          <p className="mt-4 font-display text-lg">No orders yet</p>
          <p className="mt-2 text-sm text-muted">
            When you place an order, it will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block rounded-card border border-walnut/10 bg-white p-5 shadow-warm transition-shadow hover:shadow-warm-lg"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{order.order_number}</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Placed on {formatDate(order.created_at)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-display text-lg">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-muted">
                    {order.items?.length ?? 0} item
                    {(order.items?.length ?? 0) !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Order item thumbnails */}
              {order.items && order.items.length > 0 && (
                <div className="mt-4 flex gap-2 overflow-hidden">
                  {order.items.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="h-14 w-14 shrink-0 rounded-btn bg-walnut/5 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image_url})` }}
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-btn bg-walnut/5 text-xs text-muted">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
