import { shimmer } from '@/utils/animations';
import CardSkeleton from '@/components/common/skeletons/CardSkeleton'

const shimmerClass = shimmer;

const ExamSelectionSkeleton = () => (
  <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
    <div className="mx-auto max-w-7xl">
      <div
        className={`mb-6 h-10 w-48 rounded bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div
        className={`mb-6 h-12 w-full rounded-lg bg-gray-300 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardSkeleton count={8} />
      </div>
    </div>
  </div>
)

export default ExamSelectionSkeleton
