import FormattedContent from "@/components/common/FormattedContent";

interface QuestionImageProps {
  src: string;
  alt: string;
}

const QuestionImage = ({ src, alt }: QuestionImageProps) => (
  <div className="mt-4">
    <img
      src={src}
      alt={alt}
      className="h-auto max-w-full rounded-lg border border-gray-300 dark:border-gray-600"
      loading="lazy"
      draggable={false}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </div>
);

interface QuestionContentProps {
  text: string;
  image?: string;
}

const QuestionContent = ({ text, image }: QuestionContentProps) => {
  return (
    <div className="overflow-x-auto border-b border-blue-50 bg-white px-4 py-5 transition-[background-color,border-color] duration-300 sm:px-6 sm:py-7 dark:border-gray-800 dark:bg-gray-900">
      <FormattedContent
        text={text}
        className="text-sm leading-relaxed text-gray-900 transition-colors sm:text-base md:text-lg dark:text-gray-50"
      />
      {image && <QuestionImage src={image} alt="Question illustration" />}
    </div>
  );
};

export default QuestionContent;
