export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const CardSkeleton = () => (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
      <div className="mb-4 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
      <div className="mb-4 flex gap-3">
        <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-700"></div>
        <div className="h-6 w-24 rounded-md bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="mt-4 h-10 w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
    </div>
  )
  const ListSkeleton = () => (
    <div className="animate-pulse space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-2 h-5 w-2/3 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  )
  const StatsSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="mb-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  )
  const TableSkeleton = () => (
    <div className="animate-pulse">
      <div className="mb-4 h-10 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="mb-2 flex gap-4">
          <div className="h-12 flex-1 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-12 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-12 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  )
  const ExamSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 h-8 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mb-3 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mb-6 h-40 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex gap-3">
              <div className="h-10 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-3 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-full rounded bg-gray-300 dark:bg-gray-700"
                ></div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
  const skeletonTypes = {
    card: CardSkeleton,
    list: ListSkeleton,
    stats: StatsSkeleton,
    table: TableSkeleton,
    exam: ExamSkeleton,
  }
  const SkeletonComponent = skeletonTypes[type] || CardSkeleton
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  )
}
