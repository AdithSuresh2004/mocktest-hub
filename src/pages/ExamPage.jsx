import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StatusDisplay from '@/components/common/StatusDisplay'
import QuestionArea from '@/components/exam/QuestionArea'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import ExamNavigation from '@/components/exam/ExamNavigation'
import ExamHeader from '@/components/exam/ExamHeader'
import SubmissionModal from '@/components/modals/SubmissionModal'
import ExitTestModal from '@/components/modals/ExitTestModal'
import useExam from '@/hooks/exam/useExam'
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
    restartExam,
  } = useExam(examId)

  const {
    currentSection,
    currentQuestion,
    navigateToQuestion,
    goToNext,
    goToPrev,
  } = navigation

  const { seconds: timeRemaining, stop } = timer

  const [showExitModal, setShowExitModal] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

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
  const handleSubmit = () => setShowSubmitModal(true)
  const cancelSubmit = () => setShowSubmitModal(false)
  const confirmSubmit = () => {
    setShowSubmitModal(false)
    finalizeExam()
  }
  const handleExit = () => setShowExitModal(true)
  const cancelExit = () => setShowExitModal(false)
  const saveAndExit = () => {
    setShowExitModal(false)
    saveAndExitExam()
    navigate('/')
  }
  const exitWithoutSaving = () => {
    setShowExitModal(false)
    deleteAndExitExam()
    navigate('/')
  }

  const currentSectionObj = useMemo(
    () => exam?.sections?.[currentSection] || { questions: [] },
    [exam?.sections, currentSection],
  )

  const currentQ = useMemo(
    () => currentSectionObj.questions[currentQuestion] || null,
    [currentSectionObj.questions, currentQuestion],
  )

  const totalQuestions = useMemo(
    () => exam?.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0,
    [exam?.sections],
  )

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
        return
      if (e.key === 'ArrowLeft' && !e.shiftKey) {
        goToPrev()
      } else if (e.key === 'ArrowRight' && !e.shiftKey) {
        goToNext()
      } else if (e.key >= '1' && e.key <= '4' && currentQ) {
        const optionIndex = parseInt(e.key) - 1
        if (currentQ.options[optionIndex]) {
          saveAnswer(currentQ.q_id, currentQ.options[optionIndex])
        }
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMarkForReview(currentQ.q_id)
      } else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQ, goToPrev, goToNext, saveAnswer, toggleMarkForReview])

  if (loading) {
    return <StatusDisplay type="loading" message="Loading exam..." fullScreen />
  }

  if (error) {
    return <StatusDisplay type="error" message={error} fullScreen />
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

  if (!exam || !attempt || !currentQ) {
    return (
      <StatusDisplay
        type="error"
        message="Exam data is incomplete or invalid."
        fullScreen
      />
    )
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <ExamHeader
        exam={exam}
        timeRemaining={timeRemaining}
        onExit={handleExit}
      />
      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-4">
        <main className="overflow-y-auto lg:col-span-3">
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
        <aside className="overflow-y-auto border-t border-gray-200 lg:col-span-1 lg:border-t-0 lg:border-l dark:border-gray-700">
          <QuestionNavigator
            sections={exam.sections}
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            answers={answers}
            markedForReview={markedForReview}
            onNavigate={navigateToQuestion}
          />
        </aside>
      </div>
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
