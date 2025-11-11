import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { attemptStore } from "@/stores/attemptStore";
import type { Attempt } from "@/types";
import DeletePendingTestModal from "@/components/modals/DeletePendingTestModal";
import PendingTestList from "@/components/pending/PendingTestList";
import NoPendingTests from "@/components/pending/NoPendingTests";
import PageContainer from "@/components/common/PageContainer";

export default function PendingTestsPage() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Attempt | null>(null);
  const { attempts, removeAttempt } = attemptStore();

  const pendingTests = Object.values(attempts).filter(
    (a) => a.status === "in_progress",
  );

  const handleResume = (examId: string) => navigate(`/exam/${examId}`);

  const handleDeleteClick = (test: Attempt) => {
    setSelectedTest(test);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedTest) {
      removeAttempt(selectedTest.id);
      setShowDeleteModal(false);
      setSelectedTest(null);
    }
  };

  return (
    <div className="animate-fadeIn">
      <PageContainer>
        <div>
          {pendingTests.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <NoPendingTests />
            </div>
          ) : (
            <PendingTestList
              tests={pendingTests}
              onDelete={handleDeleteClick}
              onResume={handleResume}
            />
          )}
        </div>
      </PageContainer>
      {showDeleteModal && selectedTest && (
        <DeletePendingTestModal
          testName={selectedTest.exam_id}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedTest(null);
          }}
        />
      )}
    </div>
  );
}
