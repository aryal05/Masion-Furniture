type BadgeVariant = "default" | "sale" | "bestseller" | "new" | "outOfStock";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-walnut/10 text-walnut",
  sale: "bg-rose text-white",
  bestseller: "bg-brass text-white",
  new: "bg-sage text-white",
  outOfStock: "bg-charcoal/10 text-charcoal/60",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-btn px-2.5 py-1
        text-[11px] uppercase tracking-label font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
