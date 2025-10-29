import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatTime } from '@/utils/formatters/formatters'
import { FaTrophy, FaHome, FaClock, FaArrowLeft } from 'react-icons/fa'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import ReviewArea from '@/components/review/ReviewArea'
import Button from '@/components/common/Button'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useReviewData } from '@/hooks/review/useReviewData'

const ReviewPage = () => {
  const { attemptId } = useParams()
  const { attempt, exam, loading, error, setAttempt, setExam } = useReviewData(attemptId)

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (!exam) return

    const handleKeyNavigation = (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1)
        } else if (currentSectionIndex > 0) {
          const prevSection = exam.sections[currentSectionIndex - 1]
          setCurrentSectionIndex(currentSectionIndex - 1)
          setCurrentQuestionIndex(prevSection.questions.length - 1)
        }
      } else if (e.key === 'ArrowRight') {
        if (
          currentQuestionIndex <
          exam.sections[currentSectionIndex].questions.length - 1
        ) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else if (currentSectionIndex < exam.sections.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1)
          setCurrentQuestionIndex(0)
        }
      }
    }

    window.addEventListener('keydown', handleKeyNavigation)
    return () => window.removeEventListener('keydown', handleKeyNavigation)
  }, [currentSectionIndex, currentQuestionIndex, exam])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
          <SkeletonLoader type="exam" count={1} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
            Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  if (!attempt || !exam) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No data available for review.
          </p>
        </div>
      </div>
    )
  }

  const currentSection = exam.sections[currentSectionIndex]
  const currentQuestion = currentSection.questions[currentQuestionIndex]

  const answers = attempt.responses.reduce((acc, res) => {
    acc[res.q_id] = res.selected_opt_id
    return acc
  }, {})

  const navigateToQuestion = (sectionIndex, questionIndex) => {
    setCurrentSectionIndex(sectionIndex)
    setCurrentQuestionIndex(questionIndex)
  }

  const goToNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentSectionIndex < exam.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setCurrentQuestionIndex(0)
    }
  }

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentSectionIndex > 0) {
      const prevSection = exam.sections[currentSectionIndex - 1]
      setCurrentSectionIndex(currentSectionIndex - 1)
      setCurrentQuestionIndex(prevSection.questions.length - 1)
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              as={Link}
              to="/"
              variant="secondary"
              size="sm"
              icon={FaHome}
              aria-label="Go to home"
            >
              <span className="hidden sm:inline">Home</span>
            </Button>

            <Button
              as={Link}
              to={`/result/${attemptId}`}
              variant="secondary"
              size="sm"
              icon={FaArrowLeft}
              aria-label="Back to results"
            >
              <span className="hidden sm:inline">Results</span>
            </Button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-sm">
              <FaTrophy className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {attempt.score || 0}/{exam.total_marks}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaClock className="h-4 w-4" />
              <span className="hidden sm:inline">
                {formatTime(attempt.time_taken)}
              </span>
              <span className="sm:hidden">
                {attempt.time_taken < 60
                  ? `${attempt.time_taken}s`
                  : `${Math.floor(attempt.time_taken / 60)}m`}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-4">
        <main className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md lg:col-span-3 dark:bg-gray-800">
          <ReviewArea
            question={currentQuestion}
            sectionName={currentSection.section_name}
            questionIndex={currentQuestionIndex}
            totalQuestions={currentSection.questions.length}
            userAnswer={answers[currentQuestion.q_id]}
            onNext={goToNext}
            onPrev={goToPrev}
            isFirst={currentSectionIndex === 0 && currentQuestionIndex === 0}
            isLast={
              currentSectionIndex === exam.sections.length - 1 &&
              currentQuestionIndex === currentSection.questions.length - 1
            }
          />
        </main>

        <QuestionNavigator
          sections={exam.sections}
          answers={answers}
          currentSectionIndex={currentSectionIndex}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionSelect={navigateToQuestion}
          isReviewMode={true}
        />
      </div>
    </div>
  )
}

export default ReviewPage
