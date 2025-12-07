import { useExamSelection } from "@/hooks/examSelection/useExamSelection";
import { usePagination } from "@/hooks/common/usePagination";
import { examListStore } from "@/stores/examListStore";
import TestCard from "@/components/common/TestCard";
import PageStatus from "@/components/common/PageStatus";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import ExamTabs from "@/components/examSelection/ExamTabs";
import ExamFilters from "@/components/examSelection/ExamFilters";
import ExamStats from "@/components/examSelection/ExamStats";
import { FaSearch } from "react-icons/fa";
import PageContainer from "@/components/common/PageContainer";
import Card from "@/components/common/Card";

const ExamSelectionPage = () => {
  const {
    loading,
    allTests,
    activeTab,
    filteredTests,
    setActiveTab,
    tabCounts,
    clearAllFilters,
    handleFilterChange,
  } = useExamSelection();

  const { loadExams } = examListStore();
  const pagination = usePagination(filteredTests, 12);

  if (loading) return <PageStatus loading loadingMessage="Loading exams..." />;

  if (!allTests.length) {
    return (
      <EmptyState
        title="No Exams Available"
        message="We're working hard to add more exams. Please check back later!"
        actionLabel="Refresh"
        onAction={loadExams}
      />
    );
  }
  return (
    <PageContainer className="animate-fadeIn">
      <ExamTabs
        tabCounts={tabCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ExamFilters handleFilterChange={handleFilterChange} />

      <div className="my-6 flex items-center justify-between">
        <ExamStats filteredTests={filteredTests} allTests={allTests} />
      </div>
      {filteredTests.length === 0 ? (
        <Card padding="lg" className="py-16 text-center">
          <EmptyState
            icon={FaSearch}
            title="No tests match your criteria"
            message="Try adjusting your search terms or filters to find the perfect practice test for you."
            actionLabel="Clear All Filters"
            onAction={clearAllFilters}
            className="py-8"
          />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {pagination.paginatedItems.map((test) => (
              <TestCard
                key={test.exam_id || `${test.type}-${test.exam_name}`}
                test={test}
              />
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination {...pagination} />
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default ExamSelectionPage;
