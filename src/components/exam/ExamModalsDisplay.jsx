import React from 'react';
import ExitTestModal from '@/components/modals/ExitTestModal';
import SubmissionModal from '@/components/modals/SubmissionModal';

const ExamModalsDisplay = ({
  showExitModal,
  showSubmitModal,
  answers,
  totalQuestions,
  confirmSubmit,
  cancelSubmit,
  handleSaveAndExit,
  handleExitWithoutSaving,
  cancelExit,
}) => {
  return (
    <>
      {showExitModal && (
        <ExitTestModal
          hasAnswers={Object.keys(answers).length > 0}
          onSaveAndExit={handleSaveAndExit}
          onExitWithoutSaving={handleExitWithoutSaving}
          onCancel={cancelExit}
        />
      )}
      {showSubmitModal && (
        <SubmissionModal
          answeredCount={Object.keys(answers).length}
          totalQuestions={totalQuestions}
          onConfirm={confirmSubmit}
          onCancel={cancelSubmit}
        />
      )}
    </>
  );
};

export default ExamModalsDisplay;
