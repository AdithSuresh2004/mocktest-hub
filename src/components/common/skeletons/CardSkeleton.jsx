import { shimmer } from '@/utils/animations';

const shimmerClass = shimmer;

const CardSkeleton = () => (
  <div className="animate-fadeIn rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
    <div className="mb-3 flex gap-2">
      <div
        className={`h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div
        className={`h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
    </div>
    <div
      className={`mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
    ></div>
    <div
      className={`mb-4 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
    ></div>
    <div className="mb-4 flex gap-3">
      <div
        className={`h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div
        className={`h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div
        className={`h-4 w-16 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
    </div>
    <div className="flex gap-2">
      <div
        className={`h-6 w-20 rounded-md bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
      <div
        className={`h-6 w-24 rounded-md bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
      ></div>
    </div>
    <div
      className={`mt-4 h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
    ></div>
  </div>
)

export default CardSkeleton
