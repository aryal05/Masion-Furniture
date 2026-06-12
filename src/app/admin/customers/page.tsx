"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { DataTable } from "@/components/admin/DataTable";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";

interface CustomerRow extends User {
  order_count?: number;
  total_spent?: number;
}

export default function AdminCustomersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      return (data ?? []) as CustomerRow[];
    },
  });

  const filtered = customers.filter(
    (c) =>
      !search ||
      (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "name" as const,
      label: "Customer",
      render: (item: CustomerRow) => (
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-walnut/10 text-sm font-medium">
            {item.name?.charAt(0)?.toUpperCase() ??
              item.email.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">{item.name ?? "—"}</p>
            <p className="text-xs text-muted truncate">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone" as const,
      label: "Phone",
      render: (item: CustomerRow) => (
        <span className="text-muted">{item.phone ?? "—"}</span>
      ),
    },
    {
      key: "role" as const,
      label: "Role",
      render: (item: CustomerRow) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-label font-medium ${
            item.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : "bg-walnut/10 text-walnut"
          }`}
        >
          {item.role}
        </span>
      ),
    },
    {
      key: "created_at" as const,
      label: "Joined",
      sortable: true,
      render: (item: CustomerRow) => (
        <span className="text-muted">{formatDate(item.created_at)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Customers</h1>
        <p className="mt-1 text-muted">{customers.length} registered users</p>
      </div>

      <div className="flex items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="input max-w-xs"
        />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyField="id"
        loading={isLoading}
        onRowClick={(item) => router.push(`/admin/customers/${item.id}`)}
        emptyMessage="No customers found"
      />
    </div>
  );
}
