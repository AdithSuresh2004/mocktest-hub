import { animations } from '@/utils/theme'

const shimmerClass = animations.shimmer

const ExamSkeleton = () => (
  <div className="animate-fadeIn">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div
            className={`mb-4 h-8 w-1/2 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
          ></div>
          <div
            className={`mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
          ></div>
          <div
            className={`mb-6 h-40 w-full rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
          ></div>
          <div className="flex gap-3">
            <div
              className={`h-10 w-24 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
            ></div>
            <div
              className={`h-10 w-24 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
            ></div>
          </div>
        </div>
      </div>
      <aside className="lg:col-span-1">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div
            className={`mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
          ></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-8 w-full rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
              ></div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
)

export default ExamSkeleton
