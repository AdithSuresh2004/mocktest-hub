import { IoChevronDown, IoGrid, IoClose } from "react-icons/io5";
import QuestionLegend from "@/components/exam/QuestionLegend";
import { getQuestionStatusClasses } from "@/utils/helpers/examHelpers";
import { useQuestionNavigator } from "@/hooks/useExam/useQuestionNavigator"; 
export default function QuestionNavigator({
  sections,
  currentSection,
  currentQuestion,
  onNavigate,
  answers = {},
  markedForReview = new Set(),
}) {
  const {
    isMobileOpen,
    isDropdownOpen,
    dropdownRef,
    currentSectionData,
    visibleSectionIndex,
    stats,
    toggleMobileOpen,
    toggleDropdown,
    handleSectionChange,
    handleQuestionClick,
    closeMobile,
  } = useQuestionNavigator({
    sections,
    currentSection,
    currentQuestion,
    answers,
    markedForReview,
    onNavigate,
  });
  return (
    <>
      <button
        onClick={toggleMobileOpen}
        className="lg:hidden fixed bottom-20 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Toggle Question Navigator"
      >
        <IoGrid className="w-5 h-5" />
      </button>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 dark:bg-gray-900/80 lg:hidden" 
          onClick={closeMobile}
        ></div>
      )}
      <div 
        className={`${isMobileOpen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800' : 'hidden lg:block'} 
        lg:relative lg:inset-auto lg:z-auto h-full flex flex-col bg-white dark:bg-gray-800`}
      >
        {isMobileOpen && (
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Question Navigator</h3>
            <button
              onClick={closeMobile}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg transition"
              aria-label="Close Navigator"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="relative w-full" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="w-full p-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-100 flex items-center justify-between transition hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
              aria-expanded={isDropdownOpen}
              aria-controls="section-dropdown-list"
            >
              <span className="truncate font-medium">{currentSectionData?.section_name}</span>
              <IoChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div 
                id="section-dropdown-list"
                className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-xl max-h-60 overflow-y-auto z-10"
              >
                {sections.map((section, sIndex) => (
                  <button
                    key={section.section_id}
                    onClick={() => handleSectionChange(sIndex)}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      sIndex === visibleSectionIndex
                        ? "bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-medium"
                        : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {section.section_name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <QuestionLegend stats={stats} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-3 justify-items-center">
            {currentSectionData?.questions.map((question, qIndex) => (
              <button
                key={question.q_id}
                onClick={() => handleQuestionClick(qIndex)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-colors ${getQuestionStatusClasses({
                    question,
                    qIndex,
                    answers,
                    markedForReview,
                    currentSectionIndex: currentSection,
                    currentQuestionIndex: currentQuestion,
                    visibleSectionIndex, 
                })}`}
                aria-current={visibleSectionIndex === currentSection && qIndex === currentQuestion ? 'page' : undefined}
                aria-label={`Go to question ${qIndex + 1}`}
              >
                {qIndex + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}