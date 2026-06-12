"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase/client";
import { useUI } from "@/stores/ui";

interface Props {
  productId: string;
  open: boolean;
  onClose: () => void;
}

export function ReviewFormModal({ productId, open, onClose }: Props) {
  const { user } = useUser();
  const { openAuthModal } = useUI();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onClose();
      openAuthModal();
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from("reviews").insert({
        product_id: productId,
        user_id: user.id,
        rating,
        title,
        body,
      });

      if (insertError) throw insertError;

      onClose();
      setTitle("");
      setBody("");
      setRating(5);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-card bg-white p-8 shadow-warm-lg"
          >
            <h2 className="font-display text-2xl">Write a Review</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Star rating */}
              <div>
                <label className="mb-2 block text-sm font-medium">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${
                        star <= rating ? "text-brass" : "text-walnut/20"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="review-title" className="mb-1.5 block text-sm font-medium">
                  Review Title
                </label>
                <input
                  id="review-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Sum it up in a few words"
                  className="input"
                />
              </div>

              {/* Body */}
              <div>
                <label htmlFor="review-body" className="mb-1.5 block text-sm font-medium">
                  Your Review
                </label>
                <textarea
                  id="review-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                  rows={4}
                  required
                  className="input resize-none"
                />
              </div>

              {error && <p className="text-sm text-rose">{error}</p>}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-btn border border-walnut/20 px-6 py-3 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !body.trim()}
                  className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-muted hover:text-charcoal"
            >
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
