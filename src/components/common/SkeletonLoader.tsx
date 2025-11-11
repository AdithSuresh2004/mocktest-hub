import CardSkeleton from "@/components/common/skeletons/CardSkeleton";
import ListSkeleton from "@/components/common/skeletons/ListSkeleton";
import StatsSkeleton from "@/components/common/skeletons/StatsSkeleton";
import ExamSkeleton from "@/components/common/skeletons/ExamSkeleton";
import FullPageSkeleton from "@/components/common/skeletons/FullPageSkeleton";
import { shimmer } from "@/utils/common";

const shimmerClass = shimmer;

const TableSkeleton = () => (
  <div className="animate-fadeIn">
    <div
      className={`mb-4 h-10 w-full rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
    ></div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="mb-2 flex gap-4">
        <div
          className={`h-12 flex-1 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
        <div
          className={`h-12 w-24 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
        <div
          className={`h-12 w-24 rounded bg-gray-200 dark:bg-gray-700 ${shimmerClass}`}
        ></div>
      </div>
    ))}
  </div>
);

interface SkeletonLoaderProps {
  type?: "card" | "list" | "stats" | "table" | "exam" | "full-page";
  count?: number;
}

const SkeletonLoader = ({ type = "card", count = 1 }: SkeletonLoaderProps) => {
  const skeletonTypes: Record<string, React.ComponentType> = {
    card: CardSkeleton,
    list: ListSkeleton,
    stats: StatsSkeleton,
    table: TableSkeleton,
    exam: ExamSkeleton,
    "full-page": FullPageSkeleton,
  };

  const SkeletonComponent = skeletonTypes[type] || CardSkeleton;

  if (type === "full-page") {
    return <SkeletonComponent />;
  }

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
