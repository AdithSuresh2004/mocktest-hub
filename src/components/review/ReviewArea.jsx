import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaStar,
  FaUser,
} from 'react-icons/fa'
import FormattedContent from '@/components/common/FormattedContent'

const ReviewArea = ({
  question,
  sectionName,
  questionIndex,
  totalQuestions,
  userAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Select a question to review.
        </p>
      </div>
    )
  }

  const correctOptionId = question.correct_opt_id

  const getOptionClasses = (option) => {
    const isCorrect = option.opt_id === question.correct_opt_id
    const isSelected = option.opt_id === userAnswer

    let baseClasses =
      'flex items-center p-4 rounded-lg border-2 transition-all duration-200'

    if (isSelected && isCorrect) {
      return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-green-500 shadow-md`
    }
    if (isSelected && !isCorrect) {
      return `${baseClasses} bg-red-50 dark:bg-red-900/20 border-red-500`
    }
    if (isCorrect) {
      return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-green-500`
    }
    return `${baseClasses} bg-gray-50 dark:bg-gray-700/20 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600`
  }

  const getOptionIcon = (option) => {
    const isCorrect = option.opt_id === question.correct_opt_id
    const isSelected = option.opt_id === userAnswer

    if (isSelected && isCorrect)
      return <FaCheck className="ml-3 flex-shrink-0 text-green-600" />
    if (isSelected && !isCorrect)
      return <FaTimes className="ml-3 flex-shrink-0 text-red-600" />
    if (isCorrect)
      return <FaStar className="ml-3 flex-shrink-0 text-green-600" />
    return null
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="inline-flex items-center">
              <span
                className="inline-block max-w-[60vw] sm:max-w-xs truncate px-3 py-1 text-sm font-medium text-blue-800 rounded-md bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                title={sectionName}
              >
                {sectionName}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="hidden sm:inline" title={`Question ${questionIndex + 1} of ${totalQuestions}`}>
                Question {questionIndex + 1} of {totalQuestions}
              </span>
              <span className="inline sm:hidden font-semibold" title={`Question ${questionIndex + 1} of ${totalQuestions}`}>
                {questionIndex + 1}
              </span>
            </div>
          </div>
          <FormattedContent 
            text={question.question_text}
            className="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100"
          />
          {/* Question Image */}
          {(question.image || question.image_url || question.question_image) && (
            <div className="mt-4">
              <img 
                src={question.image || question.image_url || question.question_image}
                alt="Question illustration"
                className="max-w-full h-auto rounded-lg border border-gray-300 dark:border-gray-600"
                draggable={false}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {question.options.map((option) => (
            <div key={option.opt_id} className={getOptionClasses(option)}>
              <div className="flex-1">
                <div className="flex items-start">
                  <span className="mr-3 font-bold text-gray-700 dark:text-gray-300">
                    {option.opt_id.toUpperCase()}.
                  </span>
                  <div className="flex-1">
                    <FormattedContent 
                      text={option.text}
                      className="text-gray-900 dark:text-gray-100"
                    />
                    {/* Option Image */}
                    {(option.image || option.image_url) && (
                      <div className="mt-2">
                        <img 
                          src={option.image || option.image_url}
                          alt={`Option ${option.opt_id.toUpperCase()} illustration`}
                          className="max-w-full h-auto rounded border border-gray-300 dark:border-gray-600"
                          draggable={false}
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {getOptionIcon(option)}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700/50">
            <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-gray-100">
              Answer Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <FaUser className="mr-2 text-blue-500" />
                <span className="font-medium">Your Answer:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {userAnswer
                    ? `${userAnswer.toUpperCase()}. ${
                        question.options.find((o) => o.opt_id === userAnswer)
                          ?.text
                      }`
                    : 'Not Answered'}
                </span>
              </div>
              <div className="flex items-center">
                <FaStar className="mr-2 text-green-500" />
                <span className="font-medium">Correct Answer:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {correctOptionId
                    ? `${correctOptionId.toUpperCase()}. ${
                        question.options.find((o) => o.opt_id === correctOptionId)
                          ?.text
                      }`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Explanation section */}
          {question.explanation && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="mb-2 text-base font-bold text-blue-900 dark:text-blue-100">
                Explanation
              </h3>
              <FormattedContent
                text={question.explanation}
                className="text-sm text-blue-800 dark:text-blue-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Fixed navigation at bottom */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FaArrowLeft />
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={isLast}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewArea
