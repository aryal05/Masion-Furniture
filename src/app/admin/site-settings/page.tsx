"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { DbSiteSettings } from "@/types/database";

export default function SiteSettingsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'seo' | 'features'>('general');
  const [formData, setFormData] = useState<Partial<DbSiteSettings>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "default")
        .single();
      if (error) throw error;
      return data as DbSiteSettings;
    },
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<DbSiteSettings>) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", "default");
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      setSaveMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    },
    onError: (error) => {
      setSaveMessage({ type: 'error', text: `Error saving: ${error.message}` });
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    await saveMutation.mutateAsync(formData);
    setIsSaving(false);
  };

  const updateField = (field: keyof DbSiteSettings, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walnut"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '🏠' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'social', label: 'Social', icon: '🔗' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'features', label: 'Features', icon: '⚡' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Site Settings</h1>
          <p className="mt-1 text-muted">Manage your store&apos;s global settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-btn ${saveMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {saveMessage.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-walnut/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-walnut' : 'text-muted hover:text-charcoal'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-walnut" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-card p-6 shadow-sm">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">General Settings</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Site Name</label>
                <input
                  type="text"
                  value={formData.site_name ?? ''}
                  onChange={(e) => updateField('site_name', e.target.value)}
                  className="input w-full"
                  placeholder="Maison Furniture"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Tagline</label>
                <input
                  type="text"
                  value={formData.site_tagline ?? ''}
                  onChange={(e) => updateField('site_tagline', e.target.value)}
                  className="input w-full"
                  placeholder="Handcrafted Furniture for Modern Living"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Logo URL</label>
                <input
                  type="url"
                  value={formData.logo_url ?? ''}
                  onChange={(e) => updateField('logo_url', e.target.value)}
                  className="input w-full"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Favicon URL</label>
                <input
                  type="url"
                  value={formData.favicon_url ?? ''}
                  onChange={(e) => updateField('favicon_url', e.target.value)}
                  className="input w-full"
                  placeholder="https://..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">Footer Text</label>
                <input
                  type="text"
                  value={formData.footer_text ?? ''}
                  onChange={(e) => updateField('footer_text', e.target.value)}
                  className="input w-full"
                  placeholder="© 2024 Maison Furniture. All rights reserved."
                />
              </div>
            </div>

            <div className="border-t border-walnut/10 pt-6">
              <h3 className="text-md font-semibold text-charcoal mb-4">Policies</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Free Shipping Threshold ($)</label>
                  <input
                    type="number"
                    value={formData.free_shipping_threshold ?? 500}
                    onChange={(e) => updateField('free_shipping_threshold', parseFloat(e.target.value))}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Return Days</label>
                  <input
                    type="number"
                    value={formData.return_days ?? 30}
                    onChange={(e) => updateField('return_days', parseInt(e.target.value))}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Warranty Years</label>
                  <input
                    type="number"
                    value={formData.warranty_years ?? 2}
                    onChange={(e) => updateField('warranty_years', parseInt(e.target.value))}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">Contact Information</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                <input
                  type="email"
                  value={formData.contact_email ?? ''}
                  onChange={(e) => updateField('contact_email', e.target.value)}
                  className="input w-full"
                  placeholder="hello@maisonfurniture.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.contact_phone ?? ''}
                  onChange={(e) => updateField('contact_phone', e.target.value)}
                  className="input w-full"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-charcoal mb-2">Address</label>
                <textarea
                  value={formData.contact_address ?? ''}
                  onChange={(e) => updateField('contact_address', e.target.value)}
                  className="input w-full"
                  rows={3}
                  placeholder="123 Design District, New York, NY 10001"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">Social Media Links</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Facebook</label>
                <input
                  type="url"
                  value={formData.social_facebook ?? ''}
                  onChange={(e) => updateField('social_facebook', e.target.value)}
                  className="input w-full"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Instagram</label>
                <input
                  type="url"
                  value={formData.social_instagram ?? ''}
                  onChange={(e) => updateField('social_instagram', e.target.value)}
                  className="input w-full"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Twitter / X</label>
                <input
                  type="url"
                  value={formData.social_twitter ?? ''}
                  onChange={(e) => updateField('social_twitter', e.target.value)}
                  className="input w-full"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Pinterest</label>
                <input
                  type="url"
                  value={formData.social_pinterest ?? ''}
                  onChange={(e) => updateField('social_pinterest', e.target.value)}
                  className="input w-full"
                  placeholder="https://pinterest.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.social_linkedin ?? ''}
                  onChange={(e) => updateField('social_linkedin', e.target.value)}
                  className="input w-full"
                  placeholder="https://linkedin.com/..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">SEO Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Meta Title</label>
                <input
                  type="text"
                  value={formData.meta_title ?? ''}
                  onChange={(e) => updateField('meta_title', e.target.value)}
                  className="input w-full"
                  placeholder="Maison Furniture - Handcrafted Sustainable Furniture"
                />
                <p className="mt-1 text-xs text-muted">Recommended: 50-60 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Meta Description</label>
                <textarea
                  value={formData.meta_description ?? ''}
                  onChange={(e) => updateField('meta_description', e.target.value)}
                  className="input w-full"
                  rows={3}
                  placeholder="Discover handcrafted, sustainable furniture designed for modern living..."
                />
                <p className="mt-1 text-xs text-muted">Recommended: 150-160 characters</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">Feature Flags</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.show_newsletter ?? true}
                  onChange={(e) => updateField('show_newsletter', e.target.checked)}
                  className="w-5 h-5 rounded border-walnut/30 text-walnut focus:ring-walnut"
                />
                <div>
                  <span className="font-medium text-charcoal">Show Newsletter Signup</span>
                  <p className="text-sm text-muted">Display newsletter subscription form in footer</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.show_chat_widget ?? false}
                  onChange={(e) => updateField('show_chat_widget', e.target.checked)}
                  className="w-5 h-5 rounded border-walnut/30 text-walnut focus:ring-walnut"
                />
                <div>
                  <span className="font-medium text-charcoal">Show Chat Widget</span>
                  <p className="text-sm text-muted">Display live chat support widget</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.maintenance_mode ?? false}
                  onChange={(e) => updateField('maintenance_mode', e.target.checked)}
                  className="w-5 h-5 rounded border-walnut/30 text-walnut focus:ring-walnut"
                />
                <div>
                  <span className="font-medium text-charcoal">Maintenance Mode</span>
                  <p className="text-sm text-muted text-rose">⚠️ This will show a maintenance page to all visitors</p>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
