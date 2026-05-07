import { ShimmerSkeleton } from "./ShimmerSkeleton";

export function OrderCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex -space-x-2 shrink-0">
        <ShimmerSkeleton className="h-11 w-11 rounded-lg border-2 border-card" />
        <ShimmerSkeleton className="h-11 w-11 rounded-lg border-2 border-card" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <ShimmerSkeleton className="h-4 w-32 rounded-md" />
          <ShimmerSkeleton className="h-5 w-16 rounded-full" />
        </div>
        <ShimmerSkeleton className="h-3 w-40 rounded-md" />
      </div>
      <ShimmerSkeleton className="h-4 w-14 rounded-md shrink-0" />
    </div>
  );
}
