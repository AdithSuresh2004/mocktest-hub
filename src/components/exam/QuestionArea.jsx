import QuestionCard from '@/components/exam/QuestionCard'

export default function QuestionArea({
  question,
  section,
  questionIndex,
  totalQuestions,
  selected,
  markedForReview,
  onAnswer,
  onMarkForReview,
}) {
  if (!question) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-8 transition-colors duration-200 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading question...</p>
      </div>
    )
  }

  const displayQuestionNumber = questionIndex + 1
  const isMarked = markedForReview.has(question.q_id)
  const handleMarkToggle = () => onMarkForReview(question.q_id)

  return (
    <QuestionCard
      question={question}
      questionNumber={displayQuestionNumber}
      totalQuestions={totalQuestions}
      sectionName={section}
      selected={selected}
      markedForReview={isMarked}
      onAnswer={onAnswer}
      onMarkForReview={handleMarkToggle}
    />
  )
}
