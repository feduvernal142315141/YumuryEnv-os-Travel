import { ShimmerSkeleton } from "./ShimmerSkeleton";

export function TrackingTimelineSkeleton() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <ShimmerSkeleton className="h-8 w-8 rounded-full" />
            {i < 4 && <ShimmerSkeleton className="h-12 w-0.5" />}
          </div>
          <div className="flex-1 pb-6 space-y-1.5">
            <ShimmerSkeleton className="h-4 w-32 rounded-md" />
            <ShimmerSkeleton className="h-3 w-48 rounded-md" />
            <ShimmerSkeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
