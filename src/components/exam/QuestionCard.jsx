import { useEffect } from 'react'
import QuestionHeader from '@/components/exam/QuestionHeader'
import QuestionContent from '@/components/exam/QuestionContent'
import QuestionOption from '@/components/exam/QuestionOption'

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  selected,
  onAnswer,
  markedForReview,
  onMarkForReview,
}) {
  const questionId = question?.q_id

  const handleOptionSelect = (optionId) => {
    if (onAnswer && questionId) {
      onAnswer(questionId, optionId)
    }
  }

  const handleMarkToggle = () => {
    if (onMarkForReview && questionId) {
      onMarkForReview(questionId)
    }
  }

  if (!question) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-white p-8 shadow-md transition-colors duration-200 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Loading question...</p>
      </div>
    )
  }

  return (
    <article
      className="flex min-h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 dark:bg-gray-800"
      role="article"
      aria-labelledby="question-header"
    >
      <QuestionHeader
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        sectionName={sectionName}
        markedForReview={markedForReview}
        onMarkForReview={handleMarkToggle}
      />

      <QuestionContent
        questionText={question.question_text}
        image={question.image}
        image_url={question.image_url}
        question_image={question.question_image}
      />

      <div
        className="flex-1 space-y-4 bg-gray-50 p-6 transition-colors duration-300 dark:bg-gray-900"
        role="radiogroup"
        aria-labelledby="question-header"
      >
        {question.options.map((option, index) => (
          <div
            key={option.opt_id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <QuestionOption
              option={option}
              optionId={option.opt_id}
              isSelected={selected === option.opt_id}
              onSelect={handleOptionSelect}
              questionId={questionId}
              index={index}
            />
          </div>
        ))}
      </div>
    </article>
  )
}
