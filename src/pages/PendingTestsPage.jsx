import { useNavigate } from "react-router-dom";
import { usePendingTests } from "@/hooks/usePendingTests/usePendingTests";
import PendingTestList from "@/components/pending/PendingTestList";
import NoPendingTests from "@/components/pending/NoPendingTests";

export default function PendingTestsPage() {
  const navigate = useNavigate();
  const { pendingTests, loading, deletePendingTest } = usePendingTests();

  const handleResume = (examId) => {
    navigate(`/exam/${examId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pending Tests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Resume your incomplete exams</p>
        </div>
        {pendingTests.length === 0 ? (
          <NoPendingTests />
        ) : (
          <PendingTestList
            tests={pendingTests}
            onDelete={deletePendingTest}
            onResume={handleResume}
          />
        )}
      </div>
    </div>
  );
}
