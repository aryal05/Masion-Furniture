import { Skeleton } from "@/components/ui/Skeleton";

export function ShopSkeleton() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 pt-28 pb-24">
      {/* Header */}
      <div className="mb-8">
        <Skeleton width={80} height={14} className="mb-2" />
        <Skeleton width={200} height={36} />
      </div>

      <div className="flex gap-10">
        {/* Filter panel skeleton */}
        <aside className="hidden lg:block w-[280px] shrink-0 space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton width={80} height={14} className="mb-4" />
              <div className="space-y-3">
                <Skeleton height={20} />
                <Skeleton height={20} />
                <Skeleton height={20} />
              </div>
            </div>
          ))}
        </aside>

        {/* Product grid skeleton */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between border-b border-walnut/10 pb-4">
            <Skeleton width={150} height={16} />
            <div className="flex gap-3">
              <Skeleton width={100} height={40} />
              <Skeleton width={120} height={40} />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[3/4]" />
                <Skeleton className="mt-4" height={20} width="75%" />
                <Skeleton className="mt-2" height={16} width="40%" />
                <Skeleton className="mt-2" height={16} width="30%" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
