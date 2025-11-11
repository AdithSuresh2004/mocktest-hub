import StatsSkeleton from "@/components/common/skeletons/StatsSkeleton";
import ListSkeleton from "@/components/common/skeletons/ListSkeleton";
import Skeleton from "@/components/common/skeletons/Skeleton";
import PageContainer from "@/components/common/PageContainer";

const AttemptsSkeleton = () => (
  <div className="animate-fadeIn">
    <PageContainer>
      <Skeleton className="mb-6 h-10 w-48" />
      <StatsSkeleton count={4} />
      <Skeleton className="my-6 h-16 w-full rounded-lg" />
      <ListSkeleton count={3} />
    </PageContainer>
  </div>
);

export default AttemptsSkeleton;
