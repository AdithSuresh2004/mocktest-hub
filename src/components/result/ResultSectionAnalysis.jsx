const SectionCard = ({ section }) => (
  <div className="rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700">
    <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:mb-0 dark:text-gray-100">
        {section.sectionName}
      </h3>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {section.marksObtained}/{section.totalMarks} marks
        </span>
        <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          {section.accuracy}% accuracy
        </span>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-3 text-center text-sm">
      <div>
        <p className="text-gray-600 dark:text-gray-400">Total</p>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {section.totalQuestions}
        </p>
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400">Correct</p>
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          {section.correct}
        </p>
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400">Incorrect</p>
        <p className="text-lg font-bold text-red-600 dark:text-red-400">
          {section.incorrect}
        </p>
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-400">Skipped</p>
        <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
          {section.unanswered}
        </p>
      </div>
    </div>
  </div>
)

const ResultSectionAnalysis = ({ analysis, showAnalysis }) => {
  if (!showAnalysis || !analysis) return null

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
        Section-wise Analysis
      </h2>
      <div className="space-y-4">
        {analysis.sectionAnalysis.map((section, index) => (
          <SectionCard key={index} section={section} />
        ))}
      </div>
    </div>
  )
}

export default ResultSectionAnalysis
