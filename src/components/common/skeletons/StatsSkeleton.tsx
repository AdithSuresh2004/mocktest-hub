import Skeleton from "@/components/common/skeletons/Skeleton";
import Card from "@/components/common/Card";

const StatCardSkeleton = () => (
  <Card className="animate-fadeIn p-6">
    <Skeleton className="mb-2 h-4 w-1/2" />
    <Skeleton className="h-8 w-3/4" />
  </Card>
);

const StatsSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[...Array(count)].map((_, i) => (
      <StatCardSkeleton key={i} />
    ))}
  </div>
);

export default StatsSkeleton;
