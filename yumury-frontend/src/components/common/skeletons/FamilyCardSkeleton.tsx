import { ShimmerSkeleton } from "./ShimmerSkeleton";

export function FamilyCardSkeleton() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6">
      <ShimmerSkeleton className="h-16 w-16 rounded-full" />
      <ShimmerSkeleton className="mt-4 h-5 w-24 rounded-md" />
      <ShimmerSkeleton className="mt-2 h-3 w-32 rounded-md" />
      <div className="mt-4 w-full space-y-2">
        <ShimmerSkeleton className="h-3 w-full rounded-md" />
        <ShimmerSkeleton className="h-3 w-3/4 rounded-md" />
      </div>
      <div className="mt-4 w-full border-t border-border pt-3">
        <ShimmerSkeleton className="h-3 w-1/2 rounded-md" />
      </div>
      <div className="mt-4 flex w-full gap-2">
        <ShimmerSkeleton className="h-9 flex-1 rounded-lg" />
        <ShimmerSkeleton className="h-9 w-20 rounded-lg" />
        <ShimmerSkeleton className="h-9 w-9 rounded-lg" />
      </div>
    </div>
  );
}
