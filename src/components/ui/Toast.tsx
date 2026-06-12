"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useUI, type Toast as ToastType } from "@/stores/ui";

export function ToastContainer() {
  const { toasts, removeToast } = useUI();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastType; onDismiss: () => void }) {
  const duration = toast.duration ?? 5000;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  const colors = {
    success: "bg-sage text-white",
    error: "bg-rose text-white",
    info: "bg-walnut text-ivory",
    warning: "bg-brass text-white",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`
        flex items-center gap-3 rounded-card px-5 py-4 shadow-warm-lg
        ${colors[toast.type]}
      `}
    >
      <span className="text-lg" aria-hidden>
        {icons[toast.type]}
      </span>
      <p className="text-sm font-medium">{toast.message}</p>
      {toast.action && (
        <button
          onClick={() => {
            toast.action!.onClick();
            onDismiss();
          }}
          className="ml-2 text-sm underline underline-offset-2 opacity-90 hover:opacity-100"
        >
          {toast.action.label}
        </button>
      )}
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="ml-3 opacity-70 hover:opacity-100"
      >
        ✕
      </button>
    </motion.div>
  );
}
