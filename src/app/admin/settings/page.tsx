"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useUI } from "@/stores/ui";

export default function AdminSettingsPage() {
  const addToast = useUI((s) => s.addToast);

  const [storeSettings, setStoreSettings] = useState({
    storeName: "Maison Furniture",
    email: "info@maisonfurniture.com.np",
    phone: "+977-01-5555555",
    address: "Durbar Marg, Kathmandu, Nepal",
    currency: "NPR",
    taxRate: 13,
    freeShippingThreshold: 50000,
    standardShippingCost: 500,
    expressShippingCost: 1500,
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/maisonfurniture",
    instagram: "https://instagram.com/maisonfurniture",
    tiktok: "",
    youtube: "",
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      // In production, save to a settings table in Supabase
      const { error } = await supabase.from("store_settings").upsert({
        id: "default",
        settings: { ...storeSettings, social: socialLinks },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      addToast({ type: "success", message: "Settings saved successfully" });
    },
    onError: (error) => {
      addToast({ type: "error", message: error.message });
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Settings</h1>
        <p className="mt-1 text-muted">
          Manage your store configuration
        </p>
      </div>

      {/* Store Information */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Store Information</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Store Name
            </label>
            <input
              value={storeSettings.storeName}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, storeName: e.target.value })
              }
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Contact Email
            </label>
            <input
              value={storeSettings.email}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, email: e.target.value })
              }
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Phone</label>
            <input
              value={storeSettings.phone}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, phone: e.target.value })
              }
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Address</label>
            <input
              value={storeSettings.address}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, address: e.target.value })
              }
              className="input"
            />
          </div>
        </div>
      </section>

      {/* Commerce Settings */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Commerce</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Currency
            </label>
            <select
              value={storeSettings.currency}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, currency: e.target.value })
              }
              className="input"
            >
              <option value="NPR">NPR — Nepali Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="INR">INR — Indian Rupee</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={storeSettings.taxRate}
              onChange={(e) =>
                setStoreSettings({
                  ...storeSettings,
                  taxRate: Number(e.target.value),
                })
              }
              className="input"
              min={0}
              max={100}
            />
          </div>
        </div>
      </section>

      {/* Shipping Configuration */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Shipping</h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-3xl">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Free Shipping Threshold (NPR)
            </label>
            <input
              type="number"
              value={storeSettings.freeShippingThreshold}
              onChange={(e) =>
                setStoreSettings({
                  ...storeSettings,
                  freeShippingThreshold: Number(e.target.value),
                })
              }
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Standard Shipping (NPR)
            </label>
            <input
              type="number"
              value={storeSettings.standardShippingCost}
              onChange={(e) =>
                setStoreSettings({
                  ...storeSettings,
                  standardShippingCost: Number(e.target.value),
                })
              }
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Express Shipping (NPR)
            </label>
            <input
              type="number"
              value={storeSettings.expressShippingCost}
              onChange={(e) =>
                setStoreSettings({
                  ...storeSettings,
                  expressShippingCost: Number(e.target.value),
                })
              }
              className="input"
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Social Links</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Facebook
            </label>
            <input
              value={socialLinks.facebook}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, facebook: e.target.value })
              }
              className="input"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Instagram
            </label>
            <input
              value={socialLinks.instagram}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, instagram: e.target.value })
              }
              className="input"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">TikTok</label>
            <input
              value={socialLinks.tiktok}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, tiktok: e.target.value })
              }
              className="input"
              placeholder="https://tiktok.com/@..."
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">YouTube</label>
            <input
              value={socialLinks.youtube}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, youtube: e.target.value })
              }
              className="input"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="rounded-btn bg-walnut px-8 py-3 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
        >
          {saveMutation.isPending ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}
