import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useExamPage from '@/hooks/exam/useExamPage'
import { useKeyboardShortcuts } from '@/hooks/exam/useKeyboardShortcuts'
import { useModalState } from '@/hooks/exam/useModalState'
import { useExamState } from '@/hooks/exam/useExamState'
import InstructionsPage from '@/pages/InstructionsPage'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import ExamHeader from '@/components/exam/ExamHeader'
import QuestionArea from '@/components/exam/QuestionArea'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import ExamNavigation from '@/components/exam/ExamNavigation'
import ExitTestModal from '@/components/modals/ExitTestModal'
import SubmissionModal from '@/components/modals/SubmissionModal'
import StatusDisplay from '@/components/common/StatusDisplay'
import Button from '@/components/common/Button'

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

  const modalState = useModalState()
  const {
    showExitModal,
    showSubmitModal,
    handleExit,
    cancelExit,
    handleSubmit,
    cancelSubmit,
  } = modalState

  const exitType = useRef(null)
  const saveAndExitExamRef = useRef(saveAndExitExam)
  const deleteAndExitExamRef = useRef(deleteAndExitExam)

  useEffect(() => {
    saveAndExitExamRef.current = saveAndExitExam
    deleteAndExitExamRef.current = deleteAndExitExam
  })

  useEffect(() => {
    return () => {
      if (exitType.current === 'save') {
        saveAndExitExamRef.current()
      } else if (exitType.current === 'delete') {
        deleteAndExitExamRef.current()
      }
    }
  }, [])

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
    if (isSubmitted && attempt?.attempt_id) {
      setTimeout(() => navigate(`/result/${attempt.attempt_id}`), 500)
    }
  }, [isSubmitted, attempt?.attempt_id, navigate])

  const confirmSubmit = () => {
    cancelSubmit()
    finalizeExam()
  }

  const handleSaveAndExit = () => {
    exitType.current = 'save'
    navigate('/')
  }

  const handleExitWithoutSaving = () => {
    exitType.current = 'delete'
    navigate('/')
  }

  const { currentSectionObj, currentQ, totalQuestions, canGoPrev, canGoNext } =
    useExamState(exam, currentSection, currentQuestion)

  const handleSelectOption = (optionIndex) => {
    if (currentQ?.options[optionIndex]) {
      saveAnswer(currentQ.q_id, currentQ.options[optionIndex].opt_id)
    }
  }

  const handleToggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  useKeyboardShortcuts({
    onPrevQuestion: canGoPrev ? goToPrev : null,
    onNextQuestion: canGoNext ? goToNext : null,
    onSelectOption: handleSelectOption,
    onMarkForReview: () => currentQ && toggleMarkForReview(currentQ.q_id),
    onToggleFullscreen: handleToggleFullscreen,
    enabled:
      !shouldShowInstructions && !loading && !showExitModal && !showSubmitModal,
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 dark:bg-gray-900">
        <SkeletonLoader type="exam" count={1} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-lg text-red-600 sm:text-xl dark:text-red-400">
          {error}
        </p>
        <Button onClick={() => (window.location.href = '/')} variant="primary">
          Back to Home
        </Button>
      </div>
    )
  }

  if (shouldShowInstructions) {
    return <InstructionsPage exam={exam} onStart={handleStartExam} />
  }

  if (isSubmitted) {
    return (
      <StatusDisplay
        type="loading"
        message="Submitting exam and preparing results..."
        fullScreen
      />
    )
  }

  if (!exam || !currentQ) {
    return (
      <StatusDisplay
        type="error"
        message="Exam data is incomplete or invalid."
        fullScreen
      />
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 transition-[background-color] duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
      <div className="flex-shrink-0 border-b border-blue-200 bg-white shadow-md backdrop-blur-sm transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm">
        <ExamHeader
          exam={exam}
          timeRemaining={timeRemaining}
          onExit={handleExit}
          isWarning={isWarning}
          isCritical={isCritical}
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar transition-colors duration-300">
          <QuestionArea
            question={currentQ}
            section={currentSectionObj.section_name}
            questionIndex={currentQuestion}
            totalQuestions={currentSectionObj.questions.length}
            selected={answers[currentQ.q_id]}
            markedForReview={markedForReview}
            onAnswer={saveAnswer}
            onMarkForReview={toggleMarkForReview}
            containerClass="p-3 sm:p-4 flex-1"
          />
        </main>
        <QuestionNavigator
          sections={exam.sections}
          currentSectionIndex={currentSection}
          currentQuestionIndex={currentQuestion}
          answers={answers}
          markedForReview={markedForReview}
          onQuestionSelect={navigateToQuestion}
        />
      </div>
      <div className="flex-shrink-0 border-t border-blue-200 bg-white shadow-md backdrop-blur-sm transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm">
        <ExamNavigation
          canGoPrev={currentSection > 0 || currentQuestion > 0}
          canGoNext={
            currentSection < exam.sections.length - 1 ||
            currentQuestion < currentSectionObj.questions.length - 1
          }
          onPrev={goToPrev}
          onNext={goToNext}
          onSubmit={handleSubmit}
        />
      </div>
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
    </div>
  )
}

export default ExamPage
