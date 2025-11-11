import ListSkeleton from "@/components/common/skeletons/ListSkeleton";
import Skeleton from "@/components/common/skeletons/Skeleton";
import PageContainer from "@/components/common/PageContainer";

const PendingTestsSkeleton = () => (
  <div className="animate-fadeIn">
    <PageContainer>
      <Skeleton className="mb-6 h-10 w-48" />
      <Skeleton className="mb-4 h-4 w-64" />
      <ListSkeleton count={3} />
    </PageContainer>
  </div>
);

export default PendingTestsSkeleton;
