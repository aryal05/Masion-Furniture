"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUI } from "@/stores/ui";
import { supabase } from "@/lib/supabase/client";

export function AuthModal() {
  const { authModalOpen, authModalView, closeAuthModal, setAuthView } = useUI();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError(null);
    setMessage(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      closeAuthModal();
      resetForm();
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email to confirm your account.");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for a password reset link.");
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/50"
            onClick={closeAuthModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-card bg-white p-8 shadow-warm-lg"
          >
            <h2 className="font-display text-2xl text-center">
              {authModalView === "login" && "Welcome Back"}
              {authModalView === "register" && "Create Account"}
              {authModalView === "forgot" && "Reset Password"}
            </h2>

            {message ? (
              <div className="mt-6 rounded-card bg-sage/10 p-4 text-center text-sage">
                {message}
              </div>
            ) : (
              <form
                onSubmit={
                  authModalView === "login"
                    ? handleSignIn
                    : authModalView === "register"
                    ? handleSignUp
                    : handleForgotPassword
                }
                className="mt-6 space-y-4"
              >
                {authModalView === "register" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                {authModalView !== "forgot" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      required
                      minLength={6}
                    />
                  </div>
                )}

                {error && <p className="text-sm text-rose">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-btn bg-walnut py-4 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
                >
                  {loading
                    ? "Loading..."
                    : authModalView === "login"
                    ? "Sign In"
                    : authModalView === "register"
                    ? "Create Account"
                    : "Send Reset Link"}
                </button>
              </form>
            )}

            {/* Links */}
            <div className="mt-6 space-y-2 text-center text-sm">
              {authModalView === "login" && (
                <>
                  <button
                    onClick={() => {
                      setAuthView("forgot");
                      resetForm();
                    }}
                    className="text-muted hover:text-charcoal"
                  >
                    Forgot password?
                  </button>
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <button
                      onClick={() => {
                        setAuthView("register");
                        resetForm();
                      }}
                      className="text-walnut underline"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              )}

              {authModalView === "register" && (
                <p className="text-muted">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthView("login");
                      resetForm();
                    }}
                    className="text-walnut underline"
                  >
                    Sign in
                  </button>
                </p>
              )}

              {authModalView === "forgot" && (
                <button
                  onClick={() => {
                    setAuthView("login");
                    resetForm();
                  }}
                  className="text-walnut underline"
                >
                  Back to sign in
                </button>
              )}
            </div>

            <button
              onClick={closeAuthModal}
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
