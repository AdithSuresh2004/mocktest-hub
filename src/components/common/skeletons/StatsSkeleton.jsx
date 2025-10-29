import { animations } from '@/utils/animations'

const shimmerClass = animations.shimmer

const StatsSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="animate-fadeIn rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <div
          className={`mb-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
        <div
          className={`h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
      </div>
    ))}
  </div>
)

export default StatsSkeleton
