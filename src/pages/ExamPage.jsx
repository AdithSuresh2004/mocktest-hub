import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useExam from '@/hooks/exam/useExam'
import { useKeyboardShortcuts } from '@/hooks/exam/useKeyboardShortcuts'
import { useModalState } from '@/hooks/exam/useModalState'
import InstructionsPage from '@/pages/InstructionsPage'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import ExamHeader from '@/components/exam/ExamHeader'
import QuestionArea from '@/components/exam/QuestionArea'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import ExamNavigation from '@/components/exam/ExamNavigation'
import ExitTestModal from '@/components/modals/ExitTestModal'
import SubmissionModal from '@/components/modals/SubmissionModal'
import StatusDisplay from '@/components/common/StatusDisplay'

const ExamPage = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const {
    exam,
    attempt,
    loading,
    error,
    isSubmitted,
    hasStarted,
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
  } = useExam(examId)

  useEffect(() => {
    if (attempt && Object.keys(answers).length > 0) {
      setShowInstructions(false)
    }
  }, [attempt, answers])

  const {
    currentSection,
    currentQuestion,
    navigateToQuestion,
    goToNext,
    goToPrev,
  } = navigation
  const { seconds: timeRemaining, stop, isWarning, isCritical } = timer
  const [showInstructions, setShowInstructions] = useState(true)

  const modalState = useModalState()
  const {
    showExitModal,
    showSubmitModal,
    handleExit,
    cancelExit,
    handleSubmit,
    cancelSubmit,
  } = modalState

  const handleStartExam = () => {
    setShowInstructions(false)
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

  const saveAndExit = () => {
    saveAndExitExam()
    cancelExit()
    navigate('/')
  }

  const exitWithoutSaving = () => {
    deleteAndExitExam()
    cancelExit()
    navigate('/')
  }

  const currentSectionObj = exam?.sections?.[currentSection] || {
    questions: [],
  }
  const currentQ = currentSectionObj.questions[currentQuestion] || null
  const totalQuestions =
    exam?.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0

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
    onPrevQuestion: goToPrev,
    onNextQuestion: goToNext,
    onSelectOption: handleSelectOption,
    onMarkForReview: () => currentQ && toggleMarkForReview(currentQ.q_id),
    onToggleFullscreen: handleToggleFullscreen,
    enabled: !showInstructions && !loading,
  })
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-6">
          <SkeletonLoader type="exam" count={1} />
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl text-red-600 dark:text-red-400">{error}</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    )
  }
  if (exam && attempt && showInstructions && !hasStarted) {
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
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-200 dark:bg-gray-900">
      <div className="sticky top-0 z-20 bg-gray-100 transition-colors duration-200 dark:bg-gray-900">
        <ExamHeader
          exam={exam}
          timeRemaining={timeRemaining}
          onExit={handleExit}
          isWarning={isWarning}
          isCritical={isCritical}
        />
      </div>
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-4 lg:grid-rows-1">
        <main className="lg:col-span-3 lg:row-span-1">
          <QuestionArea
            question={currentQ}
            section={currentSectionObj.section_name}
            questionIndex={currentQuestion}
            totalQuestions={currentSectionObj.questions.length}
            selected={answers[currentQ.q_id]}
            markedForReview={markedForReview}
            onAnswer={saveAnswer}
            onMarkForReview={toggleMarkForReview}
          />
        </main>
        <aside className="overflow-y-auto border-t border-gray-200 transition-colors duration-200 lg:col-span-1 lg:row-span-1 lg:border-t-0 lg:border-l dark:border-gray-700">
          <QuestionNavigator
            sections={exam.sections}
            currentSectionIndex={currentSection}
            currentQuestionIndex={currentQuestion}
            answers={answers}
            markedForReview={markedForReview}
            onQuestionSelect={navigateToQuestion}
          />
        </aside>
      </div>
      <div className="sticky bottom-0 z-20 bg-gray-100 transition-colors duration-200 dark:bg-gray-900">
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
          onSaveAndExit={saveAndExit}
          onExitWithoutSaving={exitWithoutSaving}
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
