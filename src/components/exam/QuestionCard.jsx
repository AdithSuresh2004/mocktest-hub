import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
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
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Q{questionNumber} of {totalQuestions}
          </h3>
          <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{sectionName}</span>
        </div>
        <button
          onClick={onMarkForReview}
          title={markedForReview ? "Marked for Review" : "Mark for Review"}
          className="p-2 rounded-md text-gray-500 hover:text-yellow-500 transition"
        >
          {markedForReview ? (
            <IoBookmark className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
          ) : (
            <IoBookmarkOutline className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="p-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700 overflow-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
          {question.question_text}
        </p>
      </div>
      <div className="p-4 flex-1 overflow-auto space-y-3">
        {question.options.map((option) => (
          <label
            key={option.opt_id}
            className={`block p-3 rounded-lg cursor-pointer transition-all border ${selected === option.opt_id
              ? "bg-blue-50 dark:bg-blue-900/40 border-blue-500 shadow-sm"
              : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }`}
          >
            <input
              type="radio"
              name={`question-${question.q_id}`}
              value={option.opt_id}
              checked={selected === option.opt_id}
              onChange={() => onAnswer(question.q_id, option.opt_id)}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${selected === option.opt_id ? "bg-blue-500 border-blue-500" : "border border-gray-400 dark:border-gray-600"
                  }`}
              >
                {selected === option.opt_id && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <span className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-100">
                {option.text}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}