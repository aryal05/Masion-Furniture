"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { DataTable } from "@/components/admin/DataTable";
import type { DbReview, DbProduct } from "@/types/database";

interface ReviewWithProduct extends DbReview {
  product?: Pick<DbProduct, 'id' | 'name' | 'slug'>;
  profiles?: { name: string | null; email: string };
}

export default function AdminReviewsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<ReviewWithProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          *,
          product:products(id, name, slug),
          profiles(name, email)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ReviewWithProduct[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      setIsModalOpen(false);
      setSelectedReview(null);
    },
  });

  const toggleVerifiedMutation = useMutation({
    mutationFn: async ({ id, is_verified }: { id: string; is_verified: boolean }) => {
      const { error } = await supabase
        .from("reviews")
        .update({ is_verified })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      !search ||
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.body?.toLowerCase().includes(search.toLowerCase()) ||
      r.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.profiles?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === "all" || r.rating === parseInt(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const columns = [
    {
      key: "product" as const,
      label: "Product",
      render: (item: ReviewWithProduct) => (
        <div className="min-w-0">
          <p className="font-medium truncate">{item.product?.name ?? 'Unknown Product'}</p>
        </div>
      ),
    },
    {
      key: "rating" as const,
      label: "Rating",
      sortable: true,
      render: (item: ReviewWithProduct) => (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className={star <= item.rating ? 'text-amber-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "title" as const,
      label: "Review",
      render: (item: ReviewWithProduct) => (
        <div className="max-w-xs">
          {item.title && <p className="font-medium truncate">{item.title}</p>}
          <p className="text-sm text-muted truncate">{item.body}</p>
        </div>
      ),
    },
    {
      key: "profiles" as const,
      label: "Customer",
      render: (item: ReviewWithProduct) => (
        <div className="text-sm">
          <p className="font-medium">{item.profiles?.name ?? 'Anonymous'}</p>
          <p className="text-muted">{item.profiles?.email}</p>
        </div>
      ),
    },
    {
      key: "is_verified" as const,
      label: "Status",
      render: (item: ReviewWithProduct) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleVerifiedMutation.mutate({ id: item.id, is_verified: !item.is_verified });
          }}
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.is_verified
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.is_verified ? '✓ Verified' : 'Unverified'}
        </button>
      ),
    },
    {
      key: "created_at" as const,
      label: "Date",
      sortable: true,
      render: (item: ReviewWithProduct) => (
        <span className="text-sm text-muted">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions" as const,
      label: "",
      render: (item: ReviewWithProduct) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedReview(item);
            setIsModalOpen(true);
          }}
          className="text-rose hover:text-rose/80 text-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  // Stats
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  const verifiedCount = reviews.filter(r => r.is_verified).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Reviews</h1>
          <p className="mt-1 text-muted">
            {reviews.length} total reviews • {avgRating} avg rating • {verifiedCount} verified
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = reviews.filter(r => r.rating === rating).length;
          const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
          return (
            <div key={rating} className="bg-white rounded-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400">{'★'.repeat(rating)}</span>
                <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
              </div>
              <p className="text-2xl font-bold text-charcoal">{count}</p>
              <p className="text-sm text-muted">{percentage}%</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reviews..."
          className="input max-w-xs"
        />
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="input max-w-[160px]"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        keyField="id"
        loading={isLoading}
        emptyMessage="No reviews found"
      />

      {/* Delete Confirmation Modal */}
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-card p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-charcoal mb-4">Delete Review</h3>
            <p className="text-muted mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="bg-gray-50 rounded-btn p-4 mb-6">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= selectedReview.rating ? 'text-amber-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              {selectedReview.title && <p className="font-medium">{selectedReview.title}</p>}
              <p className="text-sm text-muted line-clamp-2">{selectedReview.body}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedReview(null);
                }}
                className="px-4 py-2 text-sm font-medium text-charcoal hover:bg-gray-100 rounded-btn"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(selectedReview.id)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-rose hover:bg-rose/90 rounded-btn disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
