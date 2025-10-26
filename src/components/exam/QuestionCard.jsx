import QuestionHeader from './QuestionHeader'
import QuestionContent from './QuestionContent'
import QuestionOption from './QuestionOption'

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
      className="flex min-h-full flex-col rounded-lg bg-white shadow-md transition-colors duration-200 dark:bg-gray-800"
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
        className="space-y-4 bg-white p-6 transition-colors duration-200 dark:bg-gray-800"
        role="radiogroup"
        aria-labelledby="question-header"
      >
        {question.options.map((option, index) => (
          <QuestionOption
            key={option.opt_id}
            option={option}
            optionId={option.opt_id}
            isSelected={selected === option.opt_id}
            onSelect={handleOptionSelect}
            questionId={questionId}
            index={index}
          />
        ))}
      </div>
    </article>
  )
}
