import Skeleton from "@/components/common/skeletons/Skeleton";
import PageContainer from "@/components/common/PageContainer";
import Card from "@/components/common/Card";

const SkeletonCard = () => (
  <Card className="p-6">
    <Skeleton className="mb-2 h-4 w-1/2" />
    <Skeleton className="h-8 w-3/4" />
  </Card>
);

const FullPageSkeleton = () => (
  <div className="animate-fadeIn">
    <PageContainer>
      <div className="mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <Skeleton className="h-64 w-full" />
        </Card>
        <Card className="p-6">
          <Skeleton className="mb-4 h-8 w-1/2" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </div>
      <div className="mt-10">
        <Card className="p-6">
          <Skeleton className="mb-4 h-8 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </Card>
      </div>
    </PageContainer>
  </div>
);

export default FullPageSkeleton;
