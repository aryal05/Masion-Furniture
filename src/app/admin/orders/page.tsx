"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      return (data ?? []) as Order[];
    },
  });

  const filtered = orders.filter((o) => {
    const matchesSearch =
      !search ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "order_number" as const,
      label: "Order",
      sortable: true,
      render: (item: Order) => (
        <span className="font-medium">{item.order_number}</span>
      ),
    },
    {
      key: "email" as const,
      label: "Customer",
      render: (item: Order) => (
        <div>
          <p className="text-sm">{item.email}</p>
        </div>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      render: (item: Order) => <StatusBadge status={item.status} />,
    },
    {
      key: "payment_status" as const,
      label: "Payment",
      render: (item: Order) => <StatusBadge status={item.payment_status} />,
    },
    {
      key: "total" as const,
      label: "Total",
      sortable: true,
      render: (item: Order) => (
        <span className="font-medium">{formatPrice(item.total)}</span>
      ),
    },
    {
      key: "created_at" as const,
      label: "Date",
      sortable: true,
      render: (item: Order) => (
        <span className="text-muted">{formatDate(item.created_at)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Orders</h1>
        <p className="mt-1 text-muted">
          {orders.length} total orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order # or email..."
          className="input max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input max-w-[180px]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyField="id"
        loading={isLoading}
        onRowClick={(item) => router.push(`/admin/orders/${item.id}`)}
        emptyMessage="No orders found"
      />
    </div>
  );
}
