import Skeleton from "@/components/common/skeletons/Skeleton";
import Card from "@/components/common/Card";

const CardSkeleton = () => (
  <Card className="animate-fadeIn p-4">
    <div className="mb-3 flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <Skeleton className="mb-2 h-6 w-3/4" />
    <Skeleton className="mb-4 h-4 w-1/2" />
    <div className="mb-4 flex gap-3">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-24" />
    </div>
    <Skeleton className="mt-4 h-10 w-full rounded-lg" />
  </Card>
);

export default CardSkeleton;
