"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { DataTable } from "@/components/admin/DataTable";
import { useUI } from "@/stores/ui";
import type { Product, Variant } from "@/types";

interface InventoryRow {
  id: string;
  product_name: string;
  product_id: string;
  sku: string;
  color: string | null;
  size: string | null;
  stock: number;
  price: number | null;
  product_price: number;
}

export default function AdminInventoryPage() {
  const queryClient = useQueryClient();
  const addToast = useUI((s) => s.addToast);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<string>("all");

  const { data: inventory = [], isLoading } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: async () => {
      const { data } = await supabase
        .from("variants")
        .select("*, products!inner(name, price)")
        .order("stock", { ascending: true });

      return (data ?? []).map((v: any) => ({
        id: v.id,
        product_name: v.products?.name ?? "",
        product_id: v.product_id,
        sku: v.sku,
        color: v.color,
        size: v.size,
        stock: v.stock,
        price: v.price,
        product_price: v.products?.price ?? 0,
      })) as InventoryRow[];
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: string; stock: number }) => {
      const { error } = await supabase
        .from("variants")
        .update({ stock })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inventory"] });
      addToast({ type: "success", message: "Stock updated" });
    },
  });

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      !search ||
      item.product_name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "out" && item.stock === 0) ||
      (stockFilter === "low" && item.stock > 0 && item.stock <= 10) ||
      (stockFilter === "in" && item.stock > 10);
    return matchesSearch && matchesStock;
  });

  const outOfStock = inventory.filter((i) => i.stock === 0).length;
  const lowStock = inventory.filter(
    (i) => i.stock > 0 && i.stock <= 10
  ).length;

  const columns = [
    {
      key: "product_name" as const,
      label: "Product",
      render: (item: InventoryRow) => (
        <div>
          <p className="font-medium">{item.product_name}</p>
          <p className="text-xs text-muted">
            {[item.color, item.size].filter(Boolean).join(" / ") || "Default"}
          </p>
        </div>
      ),
    },
    {
      key: "sku" as const,
      label: "SKU",
      render: (item: InventoryRow) => (
        <span className="font-mono text-sm">{item.sku}</span>
      ),
    },
    {
      key: "stock" as const,
      label: "Stock",
      sortable: true,
      render: (item: InventoryRow) => (
        <div className="flex items-center gap-2">
          <input
            type="number"
            defaultValue={item.stock}
            min={0}
            onBlur={(e) => {
              const newStock = parseInt(e.target.value);
              if (!isNaN(newStock) && newStock !== item.stock) {
                updateStockMutation.mutate({ id: item.id, stock: newStock });
              }
            }}
            className="input !py-1.5 w-20"
          />
          {item.stock === 0 && (
            <span className="rounded bg-rose/10 px-2 py-0.5 text-[10px] uppercase tracking-label text-rose font-medium">
              Out
            </span>
          )}
          {item.stock > 0 && item.stock <= 10 && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] uppercase tracking-label text-amber-800 font-medium">
              Low
            </span>
          )}
        </div>
      ),
    },
    {
      key: "status" as string,
      label: "Status",
      render: (item: InventoryRow) => (
        <span
          className={`inline-flex h-2.5 w-2.5 rounded-full ${
            item.stock === 0
              ? "bg-rose"
              : item.stock <= 10
              ? "bg-amber-400"
              : "bg-sage"
          }`}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Inventory</h1>
        <p className="mt-1 text-muted">
          Manage stock levels for all product variants
        </p>
      </div>

      {/* Alert banners */}
      {outOfStock > 0 && (
        <div className="rounded-card border border-rose/20 bg-rose/5 p-4 flex items-center gap-3">
          <span className="text-lg">⚠️</span>
          <p className="text-sm">
            <strong className="text-rose">{outOfStock} variants</strong> are
            out of stock.
          </p>
        </div>
      )}
      {lowStock > 0 && (
        <div className="rounded-card border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
          <span className="text-lg">📉</span>
          <p className="text-sm">
            <strong className="text-amber-800">{lowStock} variants</strong>{" "}
            have low stock (≤10 units).
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name or SKU..."
          className="input max-w-xs"
        />
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="input max-w-[180px]"
        >
          <option value="all">All Stock Levels</option>
          <option value="out">Out of Stock</option>
          <option value="low">Low Stock (≤10)</option>
          <option value="in">In Stock (&gt;10)</option>
        </select>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyField="id"
        loading={isLoading}
        emptyMessage="No inventory items found"
      />
    </div>
  );
}
