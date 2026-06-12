"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { DataTable } from "@/components/admin/DataTable";
import { useUI } from "@/stores/ui";
import { formatPrice, formatDate } from "@/lib/utils";
import type { PromoCode } from "@/types";

export default function AdminPromoCodesPage() {
  const queryClient = useQueryClient();
  const addToast = useUI((s) => s.addToast);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PromoCode | null>(null);

  const { data: promoCodes = [], isLoading } = useQuery({
    queryKey: ["admin-promo-codes"],
    queryFn: async () => {
      const { data } = await supabase
        .from("promo_codes")
        .select("*")
        .order("created_at", { ascending: false });
      return (data ?? []) as PromoCode[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("promo_codes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-promo-codes"] });
      addToast({ type: "success", message: "Promo code deleted" });
    },
  });

  const columns = [
    {
      key: "code" as const,
      label: "Code",
      render: (item: PromoCode) => (
        <span className="font-mono font-medium">{item.code}</span>
      ),
    },
    {
      key: "type" as const,
      label: "Discount",
      render: (item: PromoCode) => (
        <span>
          {item.type === "percentage"
            ? `${item.value}%`
            : formatPrice(item.value)}
        </span>
      ),
    },
    {
      key: "used_count" as const,
      label: "Usage",
      render: (item: PromoCode) => (
        <span>
          {item.used_count}
          {item.usage_limit ? ` / ${item.usage_limit}` : ""}
        </span>
      ),
    },
    {
      key: "is_active" as const,
      label: "Status",
      render: (item: PromoCode) => {
        const isExpired = new Date(item.expires_at) < new Date();
        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-label font-medium ${
              !item.is_active || isExpired
                ? "bg-gray-100 text-gray-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {!item.is_active ? "Inactive" : isExpired ? "Expired" : "Active"}
          </span>
        );
      },
    },
    {
      key: "expires_at" as const,
      label: "Expires",
      sortable: true,
      render: (item: PromoCode) => (
        <span className="text-muted">{formatDate(item.expires_at)}</span>
      ),
    },
    {
      key: "actions" as string,
      label: "",
      render: (item: PromoCode) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setEditing(item);
              setShowForm(true);
            }}
            className="text-sm text-walnut hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm("Delete this promo code?")) {
                deleteMutation.mutate(item.id);
              }
            }}
            className="text-sm text-rose hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Promo Codes</h1>
          <p className="mt-1 text-muted">{promoCodes.length} promo codes</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
        >
          + Create Code
        </button>
      </div>

      <DataTable
        data={promoCodes}
        columns={columns}
        keyField="id"
        loading={isLoading}
        emptyMessage="No promo codes yet"
      />

      <AnimatePresence>
        {showForm && (
          <PromoCodeFormModal
            promo={editing}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PromoCodeFormModal({
  promo,
  onClose,
}: {
  promo: PromoCode | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const addToast = useUI((s) => s.addToast);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    code: promo?.code ?? "",
    type: promo?.type ?? ("percentage" as "percentage" | "fixed"),
    value: promo?.value ?? 10,
    min_order: promo?.min_order ?? null as number | null,
    max_discount: promo?.max_discount ?? null as number | null,
    usage_limit: promo?.usage_limit ?? null as number | null,
    starts_at: promo?.starts_at
      ? new Date(promo.starts_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    expires_at: promo?.expires_at
      ? new Date(promo.expires_at).toISOString().split("T")[0]
      : "",
    is_active: promo?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        code: form.code.toUpperCase(),
        type: form.type,
        value: form.value,
        min_order: form.min_order,
        max_discount: form.max_discount,
        usage_limit: form.usage_limit,
        starts_at: new Date(form.starts_at).toISOString(),
        expires_at: new Date(form.expires_at).toISOString(),
        is_active: form.is_active,
      };

      if (promo) {
        const { error } = await supabase
          .from("promo_codes")
          .update(payload)
          .eq("id", promo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("promo_codes")
          .insert({ ...payload, used_count: 0 });
        if (error) throw error;
      }

      queryClient.invalidateQueries({ queryKey: ["admin-promo-codes"] });
      addToast({
        type: "success",
        message: promo ? "Promo code updated" : "Promo code created",
      });
      onClose();
    } catch (error: any) {
      addToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-charcoal/40 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-card bg-ivory p-6 shadow-warm-lg max-h-[90vh] overflow-y-auto"
      >
        <h3 className="font-display text-xl mb-6">
          {promo ? "Edit Promo Code" : "Create Promo Code"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Code</label>
            <input
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              className="input font-mono"
              placeholder="SUMMER2024"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as "percentage" | "fixed",
                  })
                }
                className="input"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (NPR)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Value</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) =>
                  setForm({ ...form, value: Number(e.target.value) })
                }
                className="input"
                min={0}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Min Order (NPR)
              </label>
              <input
                type="number"
                value={form.min_order ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    min_order: e.target.value ? Number(e.target.value) : null,
                  })
                }
                className="input"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Max Discount (NPR)
              </label>
              <input
                type="number"
                value={form.max_discount ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    max_discount: e.target.value
                      ? Number(e.target.value)
                      : null,
                  })
                }
                className="input"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Starts At
              </label>
              <input
                type="date"
                value={form.starts_at}
                onChange={(e) =>
                  setForm({ ...form, starts_at: e.target.value })
                }
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Expires At
              </label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) =>
                  setForm({ ...form, expires_at: e.target.value })
                }
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Usage Limit
            </label>
            <input
              type="number"
              value={form.usage_limit ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  usage_limit: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="input max-w-[200px]"
              placeholder="Unlimited"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.checked })
              }
              className="h-4 w-4 accent-walnut"
            />
            <span className="text-sm">Active</span>
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-btn border border-walnut/20 px-5 py-2.5 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-btn bg-walnut px-6 py-2.5 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
            >
              {loading ? "Saving..." : promo ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
