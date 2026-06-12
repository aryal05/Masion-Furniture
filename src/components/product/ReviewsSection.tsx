"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { ReviewFormModal } from "./ReviewFormModal";
import type { Review } from "@/types";

interface Props {
  productId: string;
  averageRating: number;
  reviewCount: number;
}

export function ReviewsSection({ productId, averageRating, reviewCount }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "helpful">("newest");

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", productId, sortBy],
    queryFn: async () => {
      const q = supabase
        .from("reviews")
        .select("*, user:profiles(name, avatar_url)")
        .eq("product_id", productId);

      if (sortBy === "newest") {
        q.order("created_at", { ascending: false });
      } else {
        q.order("helpful_count", { ascending: false });
      }

      const { data } = await q.limit(10);
      return (data ?? []) as Review[];
    },
  });

  return (
    <section className="mt-16 border-t border-walnut/10 pt-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl">Customer Reviews</h2>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-brass text-lg">{"★".repeat(Math.round(averageRating))}</span>
              <span className="font-medium">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-muted">Based on {reviewCount} reviews</span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-btn border border-walnut px-6 py-3 text-sm uppercase tracking-label transition-colors hover:bg-walnut hover:text-ivory"
        >
          Write a Review
        </button>
      </div>

      {/* Sort */}
      <div className="mt-6 flex gap-4 text-sm">
        <button
          onClick={() => setSortBy("newest")}
          className={sortBy === "newest" ? "text-walnut font-medium" : "text-muted"}
        >
          Most Recent
        </button>
        <button
          onClick={() => setSortBy("helpful")}
          className={sortBy === "helpful" ? "text-walnut font-medium" : "text-muted"}
        >
          Most Helpful
        </button>
      </div>

      {/* Reviews list */}
      <div className="mt-8 space-y-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-shimmer h-32 rounded-card" />
          ))
        ) : reviews?.length === 0 ? (
          <p className="text-center text-muted py-10">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>

      <ReviewFormModal
        productId={productId}
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-card border border-walnut/10 bg-white p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-walnut/10 text-sm font-medium">
            {review.user?.name?.charAt(0) ?? "U"}
          </div>
          <div>
            <p className="font-medium">{review.user?.name ?? "Anonymous"}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-brass">{"★".repeat(review.rating)}</span>
              {review.is_verified && (
                <span className="rounded bg-sage/10 px-1.5 py-0.5 text-[10px] uppercase tracking-label text-sage">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        </div>
        <span className="text-xs text-muted">
          {new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {review.title && (
        <h4 className="mt-4 font-medium">{review.title}</h4>
      )}
      <p className="mt-2 text-sm text-muted">{review.body}</p>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <button
          onClick={() => setHelpful(true)}
          disabled={helpful}
          className={`flex items-center gap-1 ${helpful ? "text-sage" : "text-muted hover:text-charcoal"}`}
        >
          {helpful ? "✓" : "👍"} Helpful ({review.helpful_count + (helpful ? 1 : 0)})
        </button>
      </div>
    </motion.div>
  );
}
