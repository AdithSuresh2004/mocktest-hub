import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useExamPage from '@/hooks/exam/useExamPage'
import { useKeyboardShortcuts } from '@/hooks/exam/useKeyboardShortcuts'
import { useExamModals } from '@/hooks/exam/useExamModals';
import { useExamState } from '@/hooks/exam/useExamState'
import ExamStatusDisplay from '@/components/exam/ExamStatusDisplay'
import ExamInstructionsDisplay from '@/components/exam/ExamInstructionsDisplay'
import ExamLayout from '@/components/exam/ExamLayout'
import ExamModalsDisplay from '@/components/exam/ExamModalsDisplay'
import { useExamStateSaver } from '@/hooks/exam/useExamStateSaver'
import { useFullscreenToggle } from '@/hooks/common/useFullscreenToggle'
import { useExamExitHandler } from '@/hooks/exam/useExamExitHandler'
import { useExamResultNavigation } from '@/hooks/exam/useExamResultNavigation'

const ExamPage = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const {
    exam,
    attempt,
    loading,
    error,
    isSubmitted,
    navigation,
    timer,
    handleAnswer: saveAnswer,
    toggleMarkForReview,
    finalizeExam,
    saveAndExitExam,
    deleteAndExitExam,
    answers,
    markedForReview,
    startExamTimer,
  } = useExamPage(examId)

  const {
    currentSection,
    currentQuestion,
    navigateToQuestion,
    goToNext,
    goToPrev,
  } = navigation
  const { seconds: timeRemaining, stop, isWarning, isCritical } = timer

  const {
    showExitModal,
    showSubmitModal,
    handleExit,
    cancelExit,
    handleSubmit,
    cancelSubmit,
    confirmSubmit,
    handleSaveAndExit,
    handleExitWithoutSaving,
    exitType,
  } = useExamModals({
    onConfirmSubmit: finalizeExam,
    onSaveAndExit: () => {
      if (document.fullscreenElement) document.exitFullscreen()
      navigate('/')
    },
    onExitWithoutSaving: () => {
      if (document.fullscreenElement) document.exitFullscreen()
      navigate('/')
    },
  });

  useExamExitHandler(saveAndExitExam, deleteAndExitExam, exitType);

  const shouldShowInstructions =
    !loading && exam && attempt && !attempt._hasStarted

  const handleStartExam = () => {
    startExamTimer()
  }

  useEffect(() => {
    return () => {
      if (stop) stop()
    }
  }, [stop])

  useEffect(() => {
    if (isSubmitted && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isSubmitted]);

  useExamResultNavigation(isSubmitted, attempt);

  const { currentSectionObj, currentQ, totalQuestions, canGoPrev, canGoNext } =
    useExamState(exam, currentSection, currentQuestion)

  const handleSelectOption = (optionIndex) => {
    if (currentQ?.options[optionIndex]) {
      saveAnswer(currentQ.q_id, currentQ.options[optionIndex].opt_id)
    }
  }

  const { handleToggleFullscreen } = useFullscreenToggle();

  useKeyboardShortcuts({
    onPrevQuestion: canGoPrev ? goToPrev : null,
    onNextQuestion: canGoNext ? goToNext : null,
    onSelectOption: handleSelectOption,
    onMarkForReview: () => currentQ && toggleMarkForReview(currentQ.q_id),
    onToggleFullscreen: handleToggleFullscreen,
    enabled:
      !shouldShowInstructions && !loading && !showExitModal && !showSubmitModal,
  })

  useExamStateSaver(
    attempt,
    isSubmitted,
    currentSection,
    currentQuestion,
    timeRemaining,
    markedForReview,
    answers
  );

  const statusDisplay = ExamStatusDisplay({ loading, error, isSubmitted, exam, currentQ });
  if (statusDisplay) return statusDisplay;

  const instructionsDisplay = ExamInstructionsDisplay({ shouldShowInstructions, exam, onStart: handleStartExam });
  if (instructionsDisplay) return instructionsDisplay;

  return (
    <>
      <ExamLayout
        exam={exam}
        timeRemaining={timeRemaining}
        onExit={handleExit}
        isWarning={isWarning}
        isCritical={isCritical}
        currentQ={currentQ}
        currentSectionObj={currentSectionObj}
        currentQuestion={currentQuestion}
        answers={answers}
        markedForReview={markedForReview}
        saveAnswer={saveAnswer}
        toggleMarkForReview={toggleMarkForReview}
        canGoPrev={currentSection > 0 || currentQuestion > 0}
        canGoNext={
          currentSection < exam.sections.length - 1 ||
          currentQuestion < currentSectionObj.questions.length - 1
        }
        goToPrev={goToPrev}
        goToNext={goToNext}
        handleSubmit={handleSubmit}
        navigateToQuestion={navigateToQuestion}
      />
      <ExamModalsDisplay
        showExitModal={showExitModal}
        showSubmitModal={showSubmitModal}
        answers={answers}
        totalQuestions={totalQuestions}
        confirmSubmit={confirmSubmit}
        cancelSubmit={cancelSubmit}
        handleSaveAndExit={handleSaveAndExit}
        handleExitWithoutSaving={handleExitWithoutSaving}
        cancelExit={cancelExit}
      />
    </>
  );
};
