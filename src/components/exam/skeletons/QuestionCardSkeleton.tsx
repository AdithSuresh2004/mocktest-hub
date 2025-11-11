import Skeleton from "@/components/common/skeletons/Skeleton";

const QuestionCardSkeleton = () => {
  return (
    <article className="flex min-h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
      {/* Skeleton for QuestionHeader */}
      <div className="border-b border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Skeleton for QuestionContent */}
      <div className="flex-grow p-6">
        <Skeleton className="mb-4 h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </div>

      {/* Skeleton for Options */}
      <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-900">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    </article>
  );
};

export default QuestionCardSkeleton;
