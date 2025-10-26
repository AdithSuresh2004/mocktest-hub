import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findAttemptById } from '@/data/attemptRepository'
import { findExamById } from '@/data/examRepository'
import { formatTime } from '@/utils/formatters/formatters'
import { FaTrophy, FaHome, FaClock, FaArrowLeft } from 'react-icons/fa'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import ReviewArea from '@/components/review/ReviewArea'

const ReviewPage = () => {
  const { attemptId } = useParams()
  const [attempt, setAttempt] = useState(null)
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const attemptData = findAttemptById(attemptId)
        if (!attemptData) {
          setError('Attempt not found.')
          setLoading(false)
          return
        }
        setAttempt(attemptData)

        const examData = await findExamById(attemptData.exam_id)
        if (!examData) {
          setError('Exam not found for this attempt.')
          setLoading(false)
          return
        }
        setExam(examData)
      } catch (e) {
        setError('Failed to load review data.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [attemptId])

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
          <h1 className="mb-4 text-2xl font-bold text-red-600">Error</h1>
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
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              aria-label="Go to home"
            >
              <FaHome className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to={`/result/${attemptId}`}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              aria-label="Back to results"
            >
              <FaArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Results</span>
            </Link>
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
              <span className="hidden sm:inline">{formatTime(attempt.time_taken)}</span>
              <span className="sm:hidden">
                {attempt.time_taken < 60 
                  ? `${attempt.time_taken}s` 
                  : `${Math.floor(attempt.time_taken / 60)}m`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-1 gap-4 p-4 lg:h-[calc(100vh-5rem)] lg:grid-cols-4">
        <main className="flex flex-col rounded-lg bg-white shadow-md lg:col-span-3 lg:h-full lg:overflow-hidden dark:bg-gray-800">
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

        {/* Question Navigator */}
        <aside className="overflow-y-auto rounded-lg bg-white shadow-md lg:col-span-1 lg:h-full dark:bg-gray-800">
          <QuestionNavigator
            sections={exam.sections}
            answers={answers}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={navigateToQuestion}
            isReviewMode={true}
          />
        </aside>
      </div>
    </div>
  )
}

export default ReviewPage
