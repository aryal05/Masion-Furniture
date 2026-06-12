interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "animate-shimmer bg-walnut/5";

  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-card",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

// Common skeleton compositions
export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[3/4]" />
      <Skeleton height={20} width="75%" />
      <Skeleton height={16} width="40%" />
      <Skeleton height={16} width="30%" />
    </div>
  );
}

export function TextBlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}
