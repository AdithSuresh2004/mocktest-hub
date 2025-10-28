import { animations } from '@/utils/theme'
import ListSkeleton from '@/components/common/skeletons/ListSkeleton'

const shimmerClass = animations.shimmer

const PendingTestsSkeleton = () => (
  <div className="min-h-screen animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl">
      <div
        className={`mb-6 h-10 w-48 rounded bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div
        className={`mb-4 h-4 w-64 rounded bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <ListSkeleton count={3} />
    </div>
  </div>
)

export default PendingTestsSkeleton
