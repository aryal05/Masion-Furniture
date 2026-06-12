import type { OrderStatus, PaymentStatus } from "@/types";

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus;
  size?: "sm" | "md";
}

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800" },
  processing: { label: "Processing", className: "bg-indigo-100 text-indigo-800" },
  shipped: { label: "Shipped", className: "bg-purple-100 text-purple-800" },
  out_for_delivery: { label: "Out for Delivery", className: "bg-cyan-100 text-cyan-800" },
  delivered: { label: "Delivered", className: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-800" },
  refunded: { label: "Refunded", className: "bg-rose/10 text-rose" },
};

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  pending: { label: "Payment Pending", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-green-100 text-green-800" },
  failed: { label: "Payment Failed", className: "bg-rose/10 text-rose" },
  refunded: { label: "Refunded", className: "bg-gray-100 text-gray-800" },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config =
    orderStatusConfig[status as OrderStatus] ||
    paymentStatusConfig[status as PaymentStatus];

  if (!config) return null;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium uppercase tracking-label
        ${config.className}
        ${sizeClasses[size]}
      `}
    >
      {config.label}
    </span>
  );
}
