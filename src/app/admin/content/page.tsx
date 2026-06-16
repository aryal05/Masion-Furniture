"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import type { DbTeamMember, DbMilestone, DbFaq, DbHeroBanner, DbTestimonial } from "@/types/database";

type ContentTab = 'team' | 'milestones' | 'faqs' | 'banners' | 'testimonials';

export default function ContentManagementPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ContentTab>('team');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Queries
  const { data: teamMembers = [] } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*").order("sort_order");
      return data as DbTeamMember[];
    },
  });

  const { data: milestones = [] } = useQuery({
    queryKey: ["admin-milestones"],
    queryFn: async () => {
      const { data } = await supabase.from("milestones").select("*").order("year");
      return data as DbMilestone[];
    },
  });

  const { data: faqs = [] } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: async () => {
      const { data } = await supabase.from("faqs").select("*").order("sort_order");
      return data as DbFaq[];
    },
  });

  const { data: banners = [] } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: async () => {
      const { data } = await supabase.from("hero_banners").select("*").order("sort_order");
      return data as DbHeroBanner[];
    },
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      return data as DbTestimonial[];
    },
  });

  // Generic mutations
  const saveMutation = useMutation({
    mutationFn: async ({ table, data, id }: { table: string; data: Record<string, unknown>; id?: string }) => {
      if (id) {
        const { error } = await supabase.from(table).update(data).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
      setIsModalOpen(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ table, id }: { table: string; id: string }) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ table, id, is_active }: { table: string; id: string; is_active: boolean }) => {
      const { error } = await supabase.from(table).update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
    },
  });

  const tabs = [
    { id: 'team' as const, label: 'Team Members', icon: '👥', count: teamMembers.length },
    { id: 'milestones' as const, label: 'Milestones', icon: '🏆', count: milestones.length },
    { id: 'faqs' as const, label: 'FAQs', icon: '❓', count: faqs.length },
    { id: 'banners' as const, label: 'Hero Banners', icon: '🖼️', count: banners.length },
    { id: 'testimonials' as const, label: 'Testimonials', icon: '💬', count: testimonials.length },
  ];

  const getTableName = () => {
    switch (activeTab) {
      case 'team': return 'team_members';
      case 'milestones': return 'milestones';
      case 'faqs': return 'faqs';
      case 'banners': return 'hero_banners';
      case 'testimonials': return 'testimonials';
    }
  };

  const handleSave = () => {
    if (!editingItem) return;
    const { id, ...data } = editingItem;
    saveMutation.mutate({ table: getTableName(), data, id: id as string | undefined });
  };

  const openNewModal = () => {
    const defaults: Record<ContentTab, Record<string, unknown>> = {
      team: { name: '', role: '', bio: '', image_url: '', sort_order: teamMembers.length, is_active: true },
      milestones: { year: new Date().getFullYear(), title: '', description: '', sort_order: milestones.length, is_active: true },
      faqs: { question: '', answer: '', category: 'general', sort_order: faqs.length, is_active: true },
      banners: { title: '', subtitle: '', cta_text: 'Shop Now', cta_link: '/shop', image_url: '', sort_order: banners.length, is_active: true },
      testimonials: { customer_name: '', customer_title: '', content: '', rating: 5, is_featured: false, is_active: true },
    };
    setEditingItem(defaults[activeTab]);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Content Management</h1>
          <p className="mt-1 text-muted">Manage your site&apos;s dynamic content</p>
        </div>
        <button
          onClick={openNewModal}
          className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory"
        >
          + Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-walnut text-ivory'
                : 'bg-white text-charcoal hover:bg-walnut/10'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id ? 'bg-ivory/20' : 'bg-walnut/10'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-card shadow-sm overflow-hidden">
        {/* Team Members */}
        {activeTab === 'team' && (
          <div className="divide-y divide-walnut/10">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-walnut/10 overflow-hidden flex-shrink-0">
                  {member.image_url && (
                    <Image src={member.image_url} alt={member.name} width={48} height={48} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal">{member.name}</p>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
                <button
                  onClick={() => toggleActiveMutation.mutate({ table: 'team_members', id: member.id, is_active: !member.is_active })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${member.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  {member.is_active ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => { setEditingItem(member); setIsModalOpen(true); }} className="text-sm text-walnut hover:underline">Edit</button>
                <button onClick={() => deleteMutation.mutate({ table: 'team_members', id: member.id })} className="text-sm text-rose hover:underline">Delete</button>
              </div>
            ))}
            {teamMembers.length === 0 && <p className="p-8 text-center text-muted">No team members yet</p>}
          </div>
        )}

        {/* Milestones */}
        {activeTab === 'milestones' && (
          <div className="divide-y divide-walnut/10">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-walnut/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-walnut">{milestone.year}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal">{milestone.title}</p>
                  <p className="text-sm text-muted line-clamp-1">{milestone.description}</p>
                </div>
                <button
                  onClick={() => toggleActiveMutation.mutate({ table: 'milestones', id: milestone.id, is_active: !milestone.is_active })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${milestone.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  {milestone.is_active ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => { setEditingItem(milestone); setIsModalOpen(true); }} className="text-sm text-walnut hover:underline">Edit</button>
                <button onClick={() => deleteMutation.mutate({ table: 'milestones', id: milestone.id })} className="text-sm text-rose hover:underline">Delete</button>
              </div>
            ))}
            {milestones.length === 0 && <p className="p-8 text-center text-muted">No milestones yet</p>}
          </div>
        )}

        {/* FAQs */}
        {activeTab === 'faqs' && (
          <div className="divide-y divide-walnut/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        faq.category === 'general' ? 'bg-blue-100 text-blue-800' :
                        faq.category === 'shipping' ? 'bg-purple-100 text-purple-800' :
                        faq.category === 'returns' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {faq.category}
                      </span>
                    </div>
                    <p className="font-medium text-charcoal">{faq.question}</p>
                    <p className="text-sm text-muted line-clamp-2 mt-1">{faq.answer}</p>
                  </div>
                  <button
                    onClick={() => toggleActiveMutation.mutate({ table: 'faqs', id: faq.id, is_active: !faq.is_active })}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${faq.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {faq.is_active ? 'Active' : 'Hidden'}
                  </button>
                  <button onClick={() => { setEditingItem(faq); setIsModalOpen(true); }} className="text-sm text-walnut hover:underline">Edit</button>
                  <button onClick={() => deleteMutation.mutate({ table: 'faqs', id: faq.id })} className="text-sm text-rose hover:underline">Delete</button>
                </div>
              </div>
            ))}
            {faqs.length === 0 && <p className="p-8 text-center text-muted">No FAQs yet</p>}
          </div>
        )}

        {/* Hero Banners */}
        {activeTab === 'banners' && (
          <div className="grid gap-4 p-4 md:grid-cols-2">
            {banners.map((banner) => (
              <div key={banner.id} className="border border-walnut/10 rounded-lg overflow-hidden">
                <div className="aspect-video bg-walnut/10 relative">
                  {banner.image_url && (
                    <Image src={banner.image_url} alt={banner.title} fill className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-lg">{banner.title}</p>
                    <p className="text-sm opacity-80">{banner.subtitle}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActiveMutation.mutate({ table: 'hero_banners', id: banner.id, is_active: !banner.is_active })}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${banner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {banner.is_active ? 'Active' : 'Hidden'}
                    </button>
                    <span className="text-xs text-muted">Order: {banner.sort_order}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(banner); setIsModalOpen(true); }} className="text-sm text-walnut hover:underline">Edit</button>
                    <button onClick={() => deleteMutation.mutate({ table: 'hero_banners', id: banner.id })} className="text-sm text-rose hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {banners.length === 0 && <p className="p-8 text-center text-muted col-span-2">No banners yet</p>}
          </div>
        )}

        {/* Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="divide-y divide-walnut/10">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-walnut/10 overflow-hidden flex-shrink-0">
                  {testimonial.customer_image && (
                    <Image src={testimonial.customer_image} alt={testimonial.customer_name} width={48} height={48} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-charcoal">{testimonial.customer_name}</p>
                    {testimonial.customer_title && <span className="text-sm text-muted">• {testimonial.customer_title}</span>}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= testimonial.rating ? 'text-amber-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted line-clamp-2">{testimonial.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  {testimonial.is_featured && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-medium">Featured</span>}
                  <button
                    onClick={() => toggleActiveMutation.mutate({ table: 'testimonials', id: testimonial.id, is_active: !testimonial.is_active })}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${testimonial.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {testimonial.is_active ? 'Active' : 'Hidden'}
                  </button>
                  <button onClick={() => { setEditingItem(testimonial); setIsModalOpen(true); }} className="text-sm text-walnut hover:underline">Edit</button>
                  <button onClick={() => deleteMutation.mutate({ table: 'testimonials', id: testimonial.id })} className="text-sm text-rose hover:underline">Delete</button>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && <p className="p-8 text-center text-muted">No testimonials yet</p>}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <h3 className="text-lg font-semibold text-charcoal mb-4">
              {editingItem.id ? 'Edit' : 'Add'} {activeTab === 'team' ? 'Team Member' : activeTab === 'milestones' ? 'Milestone' : activeTab === 'faqs' ? 'FAQ' : activeTab === 'banners' ? 'Banner' : 'Testimonial'}
            </h3>

            <div className="space-y-4">
              {/* Team Member Fields */}
              {activeTab === 'team' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" value={(editingItem.name as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input type="text" value={(editingItem.role as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea value={(editingItem.bio as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })} className="input w-full" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="url" value={(editingItem.image_url as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })} className="input w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                      <input type="url" value={(editingItem.linkedin_url as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, linkedin_url: e.target.value })} className="input w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Twitter URL</label>
                      <input type="url" value={(editingItem.twitter_url as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, twitter_url: e.target.value })} className="input w-full" />
                    </div>
                  </div>
                </>
              )}

              {/* Milestone Fields */}
              {activeTab === 'milestones' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <input type="number" value={(editingItem.year as number) ?? new Date().getFullYear()} onChange={(e) => setEditingItem({ ...editingItem, year: parseInt(e.target.value) })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input type="text" value={(editingItem.title as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea value={(editingItem.description as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} className="input w-full" rows={3} />
                  </div>
                </>
              )}

              {/* FAQ Fields */}
              {activeTab === 'faqs' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select value={(editingItem.category as string) ?? 'general'} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} className="input w-full">
                      <option value="general">General</option>
                      <option value="shipping">Shipping</option>
                      <option value="returns">Returns</option>
                      <option value="payment">Payment</option>
                      <option value="products">Products</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Question</label>
                    <input type="text" value={(editingItem.question as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Answer</label>
                    <textarea value={(editingItem.answer as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })} className="input w-full" rows={4} />
                  </div>
                </>
              )}

              {/* Banner Fields */}
              {activeTab === 'banners' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input type="text" value={(editingItem.title as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input type="text" value={(editingItem.subtitle as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })} className="input w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">CTA Text</label>
                      <input type="text" value={(editingItem.cta_text as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, cta_text: e.target.value })} className="input w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CTA Link</label>
                      <input type="text" value={(editingItem.cta_link as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, cta_link: e.target.value })} className="input w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="url" value={(editingItem.image_url as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })} className="input w-full" />
                  </div>
                </>
              )}

              {/* Testimonial Fields */}
              {activeTab === 'testimonials' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Customer Name</label>
                      <input type="text" value={(editingItem.customer_name as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, customer_name: e.target.value })} className="input w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Title/Role</label>
                      <input type="text" value={(editingItem.customer_title as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, customer_title: e.target.value })} className="input w-full" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Customer Image URL</label>
                    <input type="url" value={(editingItem.customer_image as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, customer_image: e.target.value })} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <select value={(editingItem.rating as number) ?? 5} onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })} className="input w-full">
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea value={(editingItem.content as string) ?? ''} onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })} className="input w-full" rows={4} />
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={(editingItem.is_featured as boolean) ?? false} onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked })} className="rounded" />
                    <span className="text-sm">Featured testimonial</span>
                  </label>
                </>
              )}

              {/* Sort Order (common) */}
              {activeTab !== 'testimonials' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input type="number" value={(editingItem.sort_order as number) ?? 0} onChange={(e) => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) })} className="input w-full" />
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => { setIsModalOpen(false); setEditingItem(null); }} className="px-4 py-2 text-sm font-medium text-charcoal hover:bg-gray-100 rounded-btn">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saveMutation.isPending} className="px-4 py-2 text-sm font-medium text-white bg-walnut hover:bg-walnut/90 rounded-btn disabled:opacity-50">
                {saveMutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
