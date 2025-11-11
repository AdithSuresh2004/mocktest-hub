import Skeleton from "@/components/common/skeletons/Skeleton";
import Card from "@/components/common/Card";

const ExamSkeleton = () => (
  <div className="animate-fadeIn">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <Card className="p-6">
          <Skeleton className="mb-4 h-8 w-1/2" />
          <Skeleton className="mb-3 h-6 w-3/4" />
          <Skeleton className="mb-6 h-40 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </Card>
      </div>
      <aside className="lg:col-span-1">
        <Card className="p-4">
          <Skeleton className="mb-3 h-6 w-3/4" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </Card>
      </aside>
    </div>
  </div>
);

export default ExamSkeleton;
