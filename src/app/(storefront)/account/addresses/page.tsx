"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { AddressCard } from "@/components/account/AddressCard";
import { addressSchema, type AddressForm } from "@/lib/checkout-schemas";
import type { Address } from "@/types";

const PROVINCES = [
  "Province 1", "Madhesh", "Bagmati", "Gandaki",
  "Lumbini", "Karnali", "Sudurpashchim",
];

export default function AddressesPage() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user!.id)
        .order("is_default", { ascending: false });
      return (data ?? []) as Address[];
    },
    enabled: !!user,
  });

  const saveMutation = useMutation({
    mutationFn: async (formData: AddressForm) => {
      if (editing) {
        await supabase
          .from("addresses")
          .update(formData)
          .eq("id", editing.id);
      } else {
        await supabase.from("addresses").insert({
          ...formData,
          user_id: user!.id,
          is_default: addresses.length === 0,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      setShowForm(false);
      setEditing(null);
    },
  });

  const handleEdit = (address: Address) => {
    setEditing(address);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">Saved Addresses</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="rounded-btn bg-walnut px-5 py-2.5 text-sm uppercase tracking-label text-ivory"
        >
          + Add Address
        </button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 animate-shimmer rounded-card" />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
          <span className="text-4xl">📍</span>
          <p className="mt-4 font-display text-lg">No addresses yet</p>
          <p className="mt-2 text-sm text-muted">
            Add a shipping address to speed up checkout.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                onEdit={() => handleEdit(addr)}
                onDelete={() =>
                  queryClient.invalidateQueries({ queryKey: ["addresses"] })
                }
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <AddressFormModal
            address={editing}
            onSubmit={(data) => saveMutation.mutate(data)}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
            loading={saveMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AddressFormModal({
  address,
  onSubmit,
  onClose,
  loading,
}: {
  address: Address | null;
  onSubmit: (data: AddressForm) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<AddressForm>({
    name: address?.name ?? "",
    phone: address?.phone ?? "",
    email: address?.email ?? "",
    line1: address?.line1 ?? "",
    line2: address?.line2 ?? "",
    city: address?.city ?? "",
    district: address?.district ?? "",
    province: address?.province ?? "",
    pincode: address?.pincode ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addressSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(result.data);
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
          {address ? "Edit Address" : "Add New Address"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Ram Bahadur"
            />
          </Field>

          <Field label="Phone Number" error={errors.phone}>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input"
              placeholder="98XXXXXXXX"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              placeholder="optional@email.com"
            />
          </Field>

          <Field label="Street Address" error={errors.line1}>
            <input
              value={form.line1}
              onChange={(e) => setForm({ ...form, line1: e.target.value })}
              className="input"
              placeholder="Street, ward no."
            />
          </Field>

          <Field label="Address Line 2" error={errors.line2}>
            <input
              value={form.line2}
              onChange={(e) => setForm({ ...form, line2: e.target.value })}
              className="input"
              placeholder="Apartment, landmark (optional)"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" error={errors.city}>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="District" error={errors.district}>
              <input
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="input"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Province" error={errors.province}>
              <select
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className="input"
              >
                <option value="">Select province</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Postal Code" error={errors.pincode}>
              <input
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                className="input"
                placeholder="44600"
              />
            </Field>
          </div>

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
              {loading ? "Saving..." : address ? "Update" : "Save Address"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-rose">{error}</p>}
    </div>
  );
}
