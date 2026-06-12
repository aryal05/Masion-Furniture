"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { addressSchema, type AddressForm } from "@/lib/checkout-schemas";
import { useCheckout } from "@/stores/checkout";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

const PROVINCES = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];

export function StepAddress() {
  const { address, setAddress } = useCheckout();
  const { user } = useUser();
  const [showNewForm, setShowNewForm] = useState(false);

  const { data: savedAddresses } = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("addresses").select("*").order("is_default", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: address ?? undefined, // hydrate from store — back button preserves data
  });

  const showForm = !user || showNewForm || (savedAddresses?.length ?? 0) === 0;

  return (
    <section>
      <h2 className="font-display text-2xl mb-6">Delivery Address</h2>

      {/* Saved addresses as selectable cards */}
      {user && (savedAddresses?.length ?? 0) > 0 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {savedAddresses!.map((a) => (
            <button
              key={a.id}
              onClick={() => setAddress({
                name: a.name, phone: a.phone, line1: a.line1, line2: a.line2 ?? "",
                city: a.city, district: a.district, province: a.province, pincode: a.pincode,
              })}
              className="rounded-card border border-walnut/15 bg-white p-4 text-left text-sm shadow-warm transition-all hover:border-walnut hover:-translate-y-0.5"
            >
              <p className="font-medium">{a.name} {a.is_default && <span className="ml-1 rounded bg-brass/15 px-1.5 py-0.5 text-[10px] uppercase tracking-label text-brass">Default</span>}</p>
              <p className="mt-1 text-muted">{a.line1}, {a.city}, {a.district}</p>
              <p className="text-muted">{a.phone}</p>
            </button>
          ))}
          <button onClick={() => setShowNewForm(true)} className="rounded-card border border-dashed border-walnut/30 p-4 text-sm text-walnut">
            + Add new address
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit(setAddress)} noValidate className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" error={errors.name?.message}>
            <input {...register("name")} className="input" autoComplete="name" />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register("phone")} className="input" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" />
          </Field>
          {!user && (
            <Field label="Email (for order updates)" error={errors.email?.message} full>
              <input {...register("email")} className="input" type="email" autoComplete="email" />
            </Field>
          )}
          <Field label="Address Line 1" error={errors.line1?.message} full>
            <input {...register("line1")} className="input" autoComplete="address-line1" />
          </Field>
          <Field label="Address Line 2 (optional)" full>
            <input {...register("line2")} className="input" autoComplete="address-line2" />
          </Field>
          <Field label="City" error={errors.city?.message}>
            <input {...register("city")} className="input" />
          </Field>
          <Field label="District" error={errors.district?.message}>
            <input {...register("district")} className="input" />
          </Field>
          <Field label="Province" error={errors.province?.message}>
            <select {...register("province")} className="input">
              <option value="">Select province</option>
              {PROVINCES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Pincode" error={errors.pincode?.message}>
            <input {...register("pincode")} className="input" inputMode="numeric" />
          </Field>
          <div className="sm:col-span-2">
            <button type="submit" className="w-full rounded-btn bg-walnut py-4 text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-12">
              Continue to Shipping
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({ label, error, full, children }: {
  label: string; error?: string; full?: boolean; children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-xs text-rose">{error}</span>}
    </label>
  );
}