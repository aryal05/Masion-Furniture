"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { KpiCard } from "@/components/admin/KpiCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { OrdersDonut } from "@/components/admin/OrdersDonut";
import { formatPrice } from "@/lib/utils";
import type { Order, Product } from "@/types";

export default function AdminAnalyticsPage() {
  const { data: orders = [] } = useQuery({
    queryKey: ["analytics-orders"],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: true });
      return (data ?? []) as Order[];
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["analytics-products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, product_images(url, alt, sort_order)")
        .eq("status", "published")
        .order("review_count", { ascending: false })
        .limit(5);
      // Supabase joins return product_images as objects, not matching local Product type
      return (data ?? []) as unknown as Product[];
    },
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const conversionRate =
    totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : "0";

  // Monthly revenue for chart
  const monthlyRevenue: Record<string, number> = {};
  orders.forEach((o) => {
    const month = new Date(o.created_at).toLocaleDateString("en-US", {
      month: "short",
    });
    monthlyRevenue[month] = (monthlyRevenue[month] ?? 0) + o.total;
  });
  const revenueData = Object.entries(monthlyRevenue).map(([label, value]) => ({
    label,
    value,
  }));

  // Order status breakdown
  const statusCounts: Record<string, number> = {};
  orders.forEach((o) => {
    statusCounts[o.status] = (statusCounts[o.status] ?? 0) + 1;
  });
  const statusColors: Record<string, string> = {
    delivered: "#4A7C59",
    shipped: "#6366f1",
    processing: "#C9933A",
    pending: "#f59e0b",
    confirmed: "#3b82f6",
    cancelled: "#C1554D",
    refunded: "#8A7E72",
    out_for_delivery: "#06b6d4",
  };
  const donutData = Object.entries(statusCounts).map(([label, value]) => ({
    label: label.replace("_", " "),
    value,
    color: statusColors[label] ?? "#8A7E72",
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Analytics</h1>
        <p className="mt-1 text-muted">
          Performance overview and key metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon="💰"
          trend="up"
        />
        <KpiCard
          title="Total Orders"
          value={totalOrders.toString()}
          icon="📦"
          trend="up"
        />
        <KpiCard
          title="Avg Order Value"
          value={formatPrice(avgOrderValue)}
          icon="📈"
          trend="neutral"
        />
        <KpiCard
          title="Completion Rate"
          value={`${conversionRate}%`}
          icon="✅"
          trend={Number(conversionRate) > 50 ? "up" : "down"}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {revenueData.length > 1 ? (
            <RevenueChart data={revenueData} />
          ) : (
            <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
              <h3 className="font-display text-lg mb-4">Revenue Overview</h3>
              <p className="text-center text-muted py-12">
                Not enough data to display chart
              </p>
            </div>
          )}
        </div>
        <OrdersDonut data={donutData} total={totalOrders} />
      </div>

      {/* Top Products */}
      <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h3 className="font-display text-lg mb-6">Top Products</h3>
        {products.length === 0 ? (
          <p className="text-center text-muted py-8">No products yet</p>
        ) : (
          <div className="divide-y divide-walnut/5">
            {products.map((product, i) => {
              const p = product as any;
              const img = p.images?.sort(
                (a: any, b: any) => a.sort_order - b.sort_order
              )[0];
              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="w-6 text-center text-sm font-medium text-muted">
                    #{i + 1}
                  </span>
                  <div
                    className="h-12 w-12 shrink-0 rounded-btn bg-walnut/5 bg-cover bg-center"
                    style={{
                      backgroundImage: img ? `url(${img.url})` : undefined,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted">
                      ⭐ {product.average_rating.toFixed(1)} ({product.review_count}{" "}
                      reviews)
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(product.price)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
