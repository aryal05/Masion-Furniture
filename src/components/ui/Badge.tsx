type BadgeVariant = "default" | "sale" | "bestseller" | "new" | "outOfStock";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary",
  sale: "bg-rose text-white",
  bestseller: "bg-gold text-white",
  new: "bg-primary text-white",
  outOfStock: "bg-muted/10 text-muted/60",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-1
        text-xs uppercase tracking-widest font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
