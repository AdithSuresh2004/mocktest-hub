import { animations } from '@/utils/theme'

const shimmerClass = animations.shimmer

const FullPageSkeleton = () => (
  <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div
          className={`h-8 w-48 rounded bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
        <div
          className={`h-10 w-32 rounded-md bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${shimmerClass}`}
          >
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-10 xl:grid-cols-2">
        <div
          className={`rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${shimmerClass}`}
        >
          <div className="mb-4 h-8 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-64 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div
          className={`rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${shimmerClass}`}
        >
          <div className="mb-4 h-8 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-64 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  </div>
)

export default FullPageSkeleton
