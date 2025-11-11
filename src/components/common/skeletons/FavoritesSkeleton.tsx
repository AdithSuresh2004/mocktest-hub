import CardSkeleton from "@/components/common/skeletons/CardSkeleton";
import Skeleton from "@/components/common/skeletons/Skeleton";
import PageContainer from "@/components/common/PageContainer";

const FavoritesSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="animate-fadeIn">
    <PageContainer>
      <div className="mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-4 w-80" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(count)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </PageContainer>
  </div>
);

export default FavoritesSkeleton;
