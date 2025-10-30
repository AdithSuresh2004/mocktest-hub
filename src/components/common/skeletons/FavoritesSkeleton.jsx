import CardSkeleton from '@/components/common/skeletons/CardSkeleton'
import { shimmer } from '@/utils/animations';

const shimmerClass = shimmer;

const FavoritesSkeleton = () => (
  <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <div
          className={`h-10 w-64 rounded bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
        <div
          className={`mt-2 h-4 w-80 rounded bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton count={3} />
      </div>
    </div>
  </div>
)

export default FavoritesSkeleton
