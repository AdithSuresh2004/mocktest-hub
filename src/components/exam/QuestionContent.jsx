import FormattedContent from '@/components/common/FormattedContent'

const QuestionImage = ({ src, alt }) => (
  <div className="mt-4">
    <img
      src={src}
      alt={alt}
      className="h-auto max-w-full rounded-lg border border-gray-300 dark:border-gray-600"
      draggable={false}
      onError={(e) => {
        e.target.style.display = 'none'
      }}
    />
  </div>
)

const QuestionContent = ({ questionText, image, image_url, question_image }) => {
  const imageSrc = image || image_url || question_image

  return (
    <div className="border-b border-gray-200 bg-blue-50 p-6 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-900">
      <FormattedContent
        text={questionText}
        className="text-base leading-relaxed text-gray-800 md:text-lg dark:text-gray-200"
      />
      {imageSrc && (
        <QuestionImage
          src={imageSrc}
          alt="Question illustration"
        />
      )}
    </div>
  )
}

export default QuestionContent
