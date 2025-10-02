import { Link, useParams } from 'react-router-dom'
import { findAttemptById } from '@/data/attemptRepository'
import { findExamById } from '@/data/examRepository'
import { useEffect, useState } from 'react'
import ReviewArea from '@/components/review/ReviewArea'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import { getQuestionStatusClasses } from '@/utils/helpers/examHelpers'
import { formatTime } from '@/utils/helpers/examHelpers'
import { FaArrowLeft, FaTrophy, FaClock } from 'react-icons/fa'

export default function ReviewPage() {
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
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [attemptId])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading review...</p>
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

  const percentage =
    exam.total_marks > 0
      ? ((attempt.score / exam.total_marks) * 100).toFixed(1)
      : 0

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <Link
            to={`/result/${attempt.attempt_id}`}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to Results</span>
          </Link>
        </div>
        <div className="min-w-0 flex-1 px-4">
          <h1 className="truncate text-center text-base font-bold text-gray-900 sm:text-lg dark:text-gray-100">
            {exam.exam_name}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FaTrophy className="mr-1.5 text-yellow-500" />
            <span className="hidden sm:inline">Score:</span>
            <span className="ml-1 font-semibold">
              {attempt.score}/{exam.total_marks}
            </span>
          </div>
          <div className="hidden items-center text-sm text-gray-600 md:flex dark:text-gray-400">
            <FaClock className="mr-1.5 text-blue-500" />
            Time:{' '}
            <span className="ml-1 font-semibold">
              {formatTime(attempt.time_taken)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-4">
        {/* Review Area */}
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

        {/* Question Navigator */}
        <aside className="overflow-y-auto rounded-lg bg-white shadow-md lg:col-span-1 dark:bg-gray-800">
          <QuestionNavigator
            sections={exam.sections}
            answers={answers}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={navigateToQuestion}
            getQuestionStatusClasses={getQuestionStatusClasses}
          />
        </aside>
      </div>
    </div>
  )
}
