import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SkeletonLoader from '@/components/common/SkeletonLoader'
import QuestionNavigator from '@/components/exam/QuestionNavigator'
import ReviewArea from '@/components/review/ReviewArea'
import { useReviewData } from '@/hooks/review/useReviewData'
import { useReviewNavigation } from '@/hooks/review/useReviewNavigation'
import ReviewHeader from '@/components/review/ReviewHeader'

const ReviewPage = () => {
  const { attemptId } = useParams()
  const { attempt, exam, loading, error } = useReviewData(attemptId)

  const {
    currentSectionIndex,
    currentQuestionIndex,
    navigateToQuestion,
    goToNext,
    goToPrev,
  } = useReviewNavigation(exam)

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

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-gray-900">
      <ReviewHeader attemptId={attemptId} attempt={attempt} exam={exam} />

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
