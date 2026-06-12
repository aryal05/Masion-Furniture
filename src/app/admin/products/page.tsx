"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, product_images(url, alt, sort_order)")
        .order("created_at", { ascending: false });
      return (data ?? []) as Product[];
    },
  });

  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "name" as const,
      label: "Product",
      render: (item: Product) => {
        const img = item.images?.sort((a, b) => a.sort_order - b.sort_order)[0];
        return (
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-btn bg-walnut/5 overflow-hidden">
              {img && (
                <Image
                  src={img.url}
                  alt={img.alt ?? item.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-xs text-muted truncate">{item.slug}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "status" as const,
      label: "Status",
      render: (item: Product) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-label font-medium ${
            item.status === "published"
              ? "bg-green-100 text-green-800"
              : item.status === "draft"
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "price" as const,
      label: "Price",
      sortable: true,
      render: (item: Product) => (
        <div>
          <span>{formatPrice(item.price)}</span>
          {item.compare_at_price && (
            <span className="ml-2 text-xs text-muted line-through">
              {formatPrice(item.compare_at_price)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "total_stock" as const,
      label: "Stock",
      sortable: true,
      render: (item: Product) => (
        <span
          className={
            item.total_stock <= 5
              ? "text-rose font-medium"
              : item.total_stock <= 20
              ? "text-amber-600"
              : ""
          }
        >
          {item.total_stock}
        </span>
      ),
    },
    {
      key: "average_rating" as const,
      label: "Rating",
      sortable: true,
      render: (item: Product) => (
        <span>
          ⭐ {item.average_rating.toFixed(1)}{" "}
          <span className="text-muted">({item.review_count})</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="mt-1 text-muted">
            {products.length} total products
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/products/new")}
          className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
        >
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input max-w-[160px]"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyField="id"
        loading={isLoading}
        onRowClick={(item) => router.push(`/admin/products/${item.id}/edit`)}
        emptyMessage="No products found"
      />
    </div>
  );
}
