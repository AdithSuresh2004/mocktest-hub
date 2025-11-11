import CardSkeleton from "@/components/common/skeletons/CardSkeleton";
import Skeleton from "@/components/common/skeletons/Skeleton";
import PageContainer from "@/components/common/PageContainer";

const ExamSelectionSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="animate-fadeIn">
    <PageContainer>
      <Skeleton className="mb-6 h-10 w-48" />
      <Skeleton className="mb-6 h-12 w-full rounded-lg" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(count)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </PageContainer>
  </div>
);

export default ExamSelectionSkeleton;
