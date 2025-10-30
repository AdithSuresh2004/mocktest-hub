import { useExamSelectionContext, ExamSelectionProvider } from '@/contexts/ExamSelectionContext';
import { usePagination } from '@/hooks/common/usePagination';
import TestCard from '@/components/common/TestCard';
import ExamSelectionSkeleton from '@/components/common/skeletons/ExamSelectionSkeleton';
import Pagination from '@/components/common/Pagination';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import EmptyState from '@/components/common/EmptyState';
import ExamTabs from '@/components/examSelection/ExamTabs';
import ExamFilters from '@/components/examSelection/ExamFilters';
import ExamStats from '@/components/examSelection/ExamStats';
import { FaSearch } from 'react-icons/fa';

const ExamSelectionPageContent = () => {
  const {
    loading,
    error,
    allTests,
    activeTab,
    filteredTests,
    loadManifest,
    setActiveTab,
    ...filterProps
  } = useExamSelectionContext();

  const pagination = usePagination(filteredTests, 12);

  if (loading) {
    return <ExamSelectionSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} onAction={loadManifest} />;
  }

  if (!allTests.length) {
    return (
      <EmptyState
        title="No Exams Available"
        message="We're working hard to add more exams. Please check back later!"
        actionLabel="Refresh"
        onAction={loadManifest}
      />
    );
  }
  return (
    <div className="min-h-full animate-fadeIn bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ExamTabs
          tabCounts={filterProps.tabCounts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <ExamFilters />

        <div className="my-6 flex items-center justify-between">
          <ExamStats filteredTests={filteredTests} allTests={allTests} />
        </div>
        {filteredTests.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <EmptyState
              icon={FaSearch}
              title="No tests match your criteria"
              message="Try adjusting your search terms or filters to find the perfect practice test for you."
              actionLabel="Clear All Filters"
              onAction={filterProps.clearAllFilters}
              className="py-8"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {pagination.paginatedItems.map((test) => (
                <TestCard
                  key={
                    test.uid || test.exam_id || `${test.type}-${test.exam_name}`
                  }
                  test={test}
                  selectedTopic={
                    filterProps.selectedTopic !== 'All Topics'
                      ? filterProps.selectedTopic
                      : undefined
                  }
                  selectedSubject={
                    filterProps.selectedSubject !== 'All Subjects'
                      ? filterProps.selectedSubject
                      : undefined
                  }
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
      </div>
    </div>
  );
};

const ExamSelectionPage = () => (
  <ExamSelectionProvider>
    <ExamSelectionPageContent />
  </ExamSelectionProvider>
);

export default ExamSelectionPage;
