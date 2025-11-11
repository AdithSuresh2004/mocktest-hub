import Skeleton from "@/components/common/skeletons/Skeleton";
import Card from "@/components/common/Card";

const ListItemSkeleton = () => (
  <Card className="p-4">
    <div className="flex items-center justify-between">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  </Card>
);

const ListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="animate-fadeIn space-y-3">
    {[...Array(count)].map((_, i) => (
      <ListItemSkeleton key={i} />
    ))}
  </div>
);

export default ListSkeleton;
