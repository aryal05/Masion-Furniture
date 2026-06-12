import type { OrderStatus } from "@/types";

interface Props {
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Order Placed" },
  { status: "confirmed", label: "Confirmed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "out_for_delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  out_for_delivery: 4,
  delivered: 5,
  cancelled: -1,
  refunded: -1,
};

export function OrderTimeline({ status, createdAt, updatedAt }: Props) {
  const currentIndex = STATUS_INDEX[status];

  if (status === "cancelled" || status === "refunded") {
    return (
      <div className="rounded-card border border-rose/20 bg-rose/5 p-6 text-center">
        <span className="text-4xl">
          {status === "cancelled" ? "❌" : "↩️"}
        </span>
        <p className="mt-2 font-display text-lg capitalize">{status}</p>
        <p className="mt-1 text-sm text-muted">
          {new Date(updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {STEPS.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isPending = i > currentIndex;

        return (
          <div key={step.status} className="relative flex gap-4">
            {/* Line */}
            {i < STEPS.length - 1 && (
              <div
                className={`absolute left-[14px] top-8 h-full w-0.5 ${
                  isComplete ? "bg-sage" : "bg-walnut/10"
                }`}
              />
            )}

            {/* Dot */}
            <div
              className={`
                relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full
                ${isComplete ? "bg-sage text-white" : ""}
                ${isCurrent ? "bg-walnut text-ivory" : ""}
                ${isPending ? "border-2 border-walnut/20 bg-white" : ""}
              `}
            >
              {isComplete ? "✓" : i + 1}
            </div>

            {/* Content */}
            <div className="pb-8">
              <p
                className={`font-medium ${
                  isCurrent ? "text-walnut" : isPending ? "text-muted" : ""
                }`}
              >
                {step.label}
              </p>
              {isCurrent && (
                <p className="mt-0.5 text-sm text-muted">
                  {step.status === "pending"
                    ? new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "In progress"}
                </p>
              )}
              {isComplete && i === 0 && (
                <p className="mt-0.5 text-sm text-muted">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
