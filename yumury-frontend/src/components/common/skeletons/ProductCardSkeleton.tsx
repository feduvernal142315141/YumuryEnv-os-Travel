import { ShimmerSkeleton } from "./ShimmerSkeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-3">
      <ShimmerSkeleton className="aspect-square w-full rounded-xl" />
      <div className="mt-3 space-y-2 px-1">
        <ShimmerSkeleton className="h-3 w-3/4 rounded-md" />
        <ShimmerSkeleton className="h-4 w-1/2 rounded-md" />
        <div className="flex items-center justify-between pt-1">
          <ShimmerSkeleton className="h-5 w-16 rounded-md" />
          <ShimmerSkeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}
