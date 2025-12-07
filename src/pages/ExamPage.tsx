import { useEffect, useState } from "react";
import { useParams, useNavigate, useNavigation } from "react-router-dom";
import useExam from "@/hooks/exam/useExam";
import { useKeyboardShortcuts } from "@/hooks/common/useKeyboardShortcuts";
import { getExamState } from "@/services/examService";
import ExamInstructionsDisplay from "@/components/exam/ExamInstructionsDisplay";
import ExamLayout from "@/components/exam/ExamLayout";
import { useFullscreenToggle } from "@/hooks/common/useFullscreenToggle";
import ExitTestModal from "@/components/modals/ExitTestModal";
import SubmissionModal from "@/components/modals/SubmissionModal";
import PageStatus from "@/components/common/PageStatus";
import { globalLoadingStore } from "@/stores/globalLoadingStore";

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const {
    exam,
    attempt,
    loading,
    error,
    isSubmitted,
    currentSection,
    currentQuestion,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    seconds,
    saveAnswer,
    toggleMarkForReview,
    finalizeExam,
    saveAndExit,
    deleteAndExit,
    answers,
    markedForReview,
    startNewExam,
  } = useExam(examId);

  const { handleToggleFullscreen } = useFullscreenToggle();
  const routeNavigation = useNavigation();
  const isRouteLoading = routeNavigation.state === "loading";

  const examState =
    exam && attempt
      ? getExamState(exam, currentSection, currentQuestion)
      : {
          currentSectionObj: null,
          currentQ: null,
          canGoPrev: false,
          canGoNext: false,
        };

  const { currentSectionObj, currentQ, canGoPrev, canGoNext } = examState;

  const handleSelectOption = (optionIndex: number) => {
    if (currentQ?.options[optionIndex]) {
      saveAnswer(currentQ.q_id, currentQ.options[optionIndex].opt_id);
    }
  };

  useKeyboardShortcuts({
    onPrevQuestion: canGoPrev ? prevQuestion : null,
    onNextQuestion: canGoNext ? nextQuestion : null,
    onSelectOption: handleSelectOption,
    onMarkForReview: () => currentQ && toggleMarkForReview(currentQ.q_id),
    onToggleFullscreen: handleToggleFullscreen,
    enabled: !loading && Boolean(attempt?._hasStarted),
  });

  // Navigate to result when submitted
  useEffect(() => {
    if (isSubmitted && attempt) navigate(`/result/${attempt.id}`);
  }, [isSubmitted, attempt, navigate]);

  // Hide global loading when exam is ready
  useEffect(() => {
    const { hide } = globalLoadingStore.getState();
    if (exam && attempt && attempt._hasStarted && currentQ) {
      hide();
    }
  }, [exam, attempt, currentQ]);

  // Early returns for loading/error states
  if (isRouteLoading) {
    return <PageStatus loading loadingMessage="Loading exam..." />;
  }

  if (loading) {
    return <PageStatus loading loadingMessage="Preparing your exam..." />;
  }

  if (error) {
    return <PageStatus error={error} />;
  }

  if (!exam) {
    return <PageStatus error="Exam data could not be loaded." />;
  }

  if (attempt?._hasStarted && !currentQ) {
    return <PageStatus loading loadingMessage="Loading question..." />;
  }

  const handleExit = () => setShowExitModal(true);
  const handleSubmit = () => setShowSubmitModal(true);
  const confirmSubmit = () => {
    setShowSubmitModal(false);
    finalizeExam();
  };

  const handleExitAction = (exitFn: () => void) => {
    setShowExitModal(false);
    setIsExiting(true);
    exitFn();
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  const handleSaveAndExit = () => handleExitAction(saveAndExit);
  const handleExitWithoutSaving = () => handleExitAction(deleteAndExit);

  const handleStartExam = () => {
    setIsStarting(true);
    startNewExam();
  };

  const shouldShowInstructions = !attempt || !attempt._hasStarted;

  if (isExiting) {
    return <PageStatus loading loadingMessage="Saving your progress..." />;
  }

  if (shouldShowInstructions) {
    return (
      <ExamInstructionsDisplay
        exam={exam}
        onStart={handleStartExam}
        isStarting={isStarting}
      />
    );
  }

  const totalQs =
    exam?.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0;

  return (
    <>
      <ExamLayout
        exam={exam}
        timeRemaining={seconds}
        onExit={handleExit}
        isWarning={seconds < 300}
        isCritical={seconds < 60}
        currentQ={currentQ ?? undefined}
        currentSectionObj={currentSectionObj ?? undefined}
        currentSection={currentSection}
        currentQuestion={currentQuestion}
        answers={answers}
        markedForReview={markedForReview}
        saveAnswer={saveAnswer}
        toggleMarkForReview={toggleMarkForReview}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        goToPrev={prevQuestion}
        goToNext={nextQuestion}
        handleSubmit={handleSubmit}
        navigateToQuestion={goToQuestion}
      />
      {showExitModal && (
        <ExitTestModal
          hasAnswers={Object.keys(answers).length > 0}
          onSaveAndExit={handleSaveAndExit}
          onExitWithoutSaving={handleExitWithoutSaving}
          onCancel={() => setShowExitModal(false)}
        />
      )}
      {showSubmitModal && (
        <SubmissionModal
          answeredCount={Object.keys(answers).length}
          totalQuestions={totalQs}
          onConfirm={confirmSubmit}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </>
  );
};

export default ExamPage;
