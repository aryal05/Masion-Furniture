"use client";
import { KpiCard } from "@/components/admin/KpiCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { OrdersDonut } from "@/components/admin/OrdersDonut";
import { LiveOrdersFeed } from "@/components/admin/LiveOrdersFeed";

const MOCK_REVENUE = [
  { label: "Jan", value: 450000 },
  { label: "Feb", value: 520000 },
  { label: "Mar", value: 480000 },
  { label: "Apr", value: 610000 },
  { label: "May", value: 720000 },
  { label: "Jun", value: 680000 },
];

const MOCK_ORDER_STATUS = [
  { label: "Delivered", value: 145, color: "#4A7C59" },
  { label: "Shipped", value: 32, color: "#6366f1" },
  { label: "Processing", value: 18, color: "#C9933A" },
  { label: "Pending", value: 8, color: "#f59e0b" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted">Welcome back. Here's what's happening today.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value="NPR 3.46M"
          change={12.5}
          trend="up"
          icon="💰"
        />
        <KpiCard
          title="Orders"
          value="203"
          change={8.2}
          trend="up"
          icon="📦"
        />
        <KpiCard
          title="Customers"
          value="1,429"
          change={5.1}
          trend="up"
          icon="👥"
        />
        <KpiCard
          title="Avg Order Value"
          value="NPR 17,044"
          change={-2.3}
          trend="down"
          icon="📈"
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={MOCK_REVENUE} />
        </div>
        <OrdersDonut data={MOCK_ORDER_STATUS} total={203} />
      </div>

      {/* Live feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        <LiveOrdersFeed />
        <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
          <h3 className="font-display text-lg mb-4">Quick Actions</h3>
          <div className="grid gap-3">
            <a
              href="/admin/products/new"
              className="rounded-btn border border-walnut/20 p-4 text-sm hover:border-walnut"
            >
              ➕ Add New Product
            </a>
            <a
              href="/admin/orders"
              className="rounded-btn border border-walnut/20 p-4 text-sm hover:border-walnut"
            >
              📦 View All Orders
            </a>
            <a
              href="/admin/inventory"
              className="rounded-btn border border-walnut/20 p-4 text-sm hover:border-walnut"
            >
              📋 Manage Inventory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
