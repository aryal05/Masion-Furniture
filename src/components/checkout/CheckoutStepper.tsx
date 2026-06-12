"use client";
import { m } from "framer-motion";
import { useCheckout } from "@/stores/checkout";

const LABELS = ["Address", "Shipping", "Payment", "Review"];

export function CheckoutStepper() {
  const { step, maxReachedStep, goTo } = useCheckout();

  return (
    <nav aria-label="Checkout progress" className="flex items-center">
      {LABELS.map((label, i) => {
        const n = (i + 1) as 1 | 2 | 3 | 4;
        const isActive = n === step;
        const isComplete = n < maxReachedStep || (n < step);
        const isReachable = n <= maxReachedStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <button
              onClick={() => isReachable && goTo(n)}
              disabled={!isReachable}
              aria-current={isActive ? "step" : undefined}
              className="flex items-center gap-2.5 disabled:cursor-not-allowed"
            >
              <m.span
                animate={{
                  backgroundColor: isActive || isComplete ? "#3B2314" : "rgba(59,35,20,0)",
                  borderColor: "#3B2314",
                  scale: isActive ? 1.1 : 1,
                }}
                className="grid h-9 w-9 place-items-center rounded-full border text-sm"
                style={{ color: isActive || isComplete ? "#F8F5F0" : "#3B2314" }}
              >
                {isComplete ? "✓" : n}
              </m.span>
              <span className={`hidden text-sm sm:block ${isActive ? "font-medium" : "text-muted"}`}>
                {label}
              </span>
            </button>
            {i < LABELS.length - 1 && (
              <div className="mx-3 h-px flex-1 bg-walnut/15">
                <m.div
                  className="h-full bg-walnut origin-left"
                  animate={{ scaleX: isComplete ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}