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
    <div className="overflow-x-auto border-b border-blue-50 bg-white px-4 py-5 transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900 sm:px-6 sm:py-7">
      <FormattedContent
        text={questionText}
        className="text-sm leading-relaxed text-gray-900 transition-colors sm:text-base dark:text-gray-50 md:text-lg"
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
