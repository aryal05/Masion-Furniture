"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Order } from "@/types";

export default function AccountOverviewPage() {
  const { user } = useUser();

  const { data: recentOrders } = useQuery({
    queryKey: ["recent-orders", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(3);
      return (data ?? []) as Order[];
    },
    enabled: !!user,
  });

  const { data: wishlistCount } = useQuery({
    queryKey: ["wishlist-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("wishlists")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-xl">
          Welcome back, {user?.user_metadata?.name ?? "there"}!
        </h2>
        <p className="mt-2 text-sm text-muted">
          From your account dashboard you can view your recent orders, manage
          shipping addresses, and edit your account details.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Orders"
          value={recentOrders?.length ?? 0}
          href="/account/orders"
        />
        <StatCard
          label="Wishlist Items"
          value={wishlistCount ?? 0}
          href="/account/wishlist"
        />
        <StatCard
          label="Saved Addresses"
          value="—"
          href="/account/addresses"
        />
      </div>

      {/* Recent orders */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Recent Orders</h3>
          <Link
            href="/account/orders"
            className="text-sm text-walnut underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        {recentOrders?.length === 0 ? (
          <div className="rounded-card border border-walnut/10 bg-white p-8 text-center">
            <p className="text-muted">You haven't placed any orders yet.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders?.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between rounded-card border border-walnut/10 bg-white p-4 shadow-warm transition-shadow hover:shadow-warm-lg"
              >
                <div>
                  <p className="font-medium">{order.order_number}</p>
                  <p className="text-sm text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={order.status} />
                  <p className="mt-1 text-sm">
                    NPR {order.total.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number | string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm transition-shadow hover:shadow-warm-lg"
    >
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </Link>
  );
}
