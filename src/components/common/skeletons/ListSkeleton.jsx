import { animations } from '@/utils/theme'

const shimmerClass = animations.shimmer

const ListSkeleton = () => (
  <div className="animate-fadeIn space-y-3">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <div
              className={`h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
            ></div>
            <div
              className={`h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
            ></div>
          </div>
          <div
            className={`h-8 w-20 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
          ></div>
        </div>
      </div>
    ))}
  </div>
)

export default ListSkeleton
