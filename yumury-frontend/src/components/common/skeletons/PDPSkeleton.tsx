import { ShimmerSkeleton } from "./ShimmerSkeleton";

export function PDPSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <ShimmerSkeleton className="h-3 w-16 rounded-md" />
        <ShimmerSkeleton className="h-3 w-3 rounded-full" />
        <ShimmerSkeleton className="h-3 w-24 rounded-md" />
        <ShimmerSkeleton className="h-3 w-3 rounded-full" />
        <ShimmerSkeleton className="h-3 w-32 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Gallery */}
        <div className="space-y-3">
          <ShimmerSkeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerSkeleton key={i} className="h-16 w-16 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <ShimmerSkeleton className="h-3 w-20 rounded-full" />
          <ShimmerSkeleton className="h-8 w-3/4 rounded-md" />
          <div className="flex items-center gap-2">
            <ShimmerSkeleton className="h-4 w-4 rounded-full" />
            <ShimmerSkeleton className="h-3 w-24 rounded-md" />
          </div>
          <ShimmerSkeleton className="h-8 w-24 rounded-md" />
          <ShimmerSkeleton className="h-4 w-full rounded-md" />
          <ShimmerSkeleton className="h-4 w-5/6 rounded-md" />
          <ShimmerSkeleton className="h-4 w-2/3 rounded-md" />
          <div className="flex gap-2 pt-4">
            <ShimmerSkeleton className="h-12 flex-1 rounded-full" />
            <ShimmerSkeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
