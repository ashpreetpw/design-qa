export default function SkeletonCard() {
  return (
    <div
      data-component="SkeletonCard"
      className="overflow-hidden rounded-xl border border-strokeLight bg-white animate-pulse"
    >
      {/* Hero area skeleton */}
      <div className="h-[120px] bg-strokeLight w-full" />

      {/* Body skeleton */}
      <div className="flex flex-col gap-8 pt-12 px-16 pb-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex flex-col gap-4 w-1/2">
            <div className="h-4 bg-strokeLight rounded w-1/3" />
            <div className="h-6 bg-strokeLight rounded w-2/3" />
          </div>
          <div className="h-6 bg-strokeLight rounded w-16" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-4 bg-strokeLight rounded w-3/4" />
          <div className="h-4 bg-strokeLight rounded w-1/2" />
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="flex items-end gap-6 w-1/2">
            <div className="h-6 bg-strokeLight rounded w-1/3" />
            <div className="h-4 bg-strokeLight rounded w-1/4" />
          </div>
          <div className="h-10 bg-strokeLight rounded w-24" />
        </div>
      </div>
    </div>
  );
}
