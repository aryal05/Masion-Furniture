"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from "@/components/motion/presets";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Bot detected

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="grain relative overflow-hidden bg-walnut py-24">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F8F5F0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-display text-3xl text-ivory md:text-4xl">
          Join the Maison Family
        </h2>
        <p className="mt-4 text-ivory/70">
          Be the first to know about new collections, exclusive offers, and
          design inspiration.
        </p>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-card bg-white/10 px-6 py-4 text-ivory"
          >
            ✓ Welcome to Maison! Check your inbox for a special welcome offer.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-btn bg-white/10 px-6 py-4 text-ivory placeholder:text-ivory/50 outline-none ring-ivory/30 focus:ring-2"
              />
              {/* Honeypot field */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px]"
                tabIndex={-1}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-btn bg-brass px-8 py-4 text-sm uppercase tracking-label text-ivory transition-all hover:bg-brass/90 disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-3 text-sm text-rose">
                Something went wrong. Please try again.
              </p>
            )}
            <p className="mt-4 text-xs text-ivory/50">
              No spam, unsubscribe anytime. Read our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}
