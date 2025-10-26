import { useState, useRef } from 'react'
import { getQuestionStatusClasses } from '@/utils/helpers/examHelpers'
import { IoClose, IoChevronDown, IoGrid } from 'react-icons/io5'
import QuestionLegend from '@/components/exam/QuestionLegend'

export default function QuestionNavigator({
  sections,
  answers = {},
  currentSectionIndex,
  currentQuestionIndex,
  onQuestionSelect,
  markedForReview = new Set(),
  isReviewMode = false,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleMobileOpen = () => setIsMobileOpen(!isMobileOpen)
  const closeMobile = () => setIsMobileOpen(false)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleSectionChange = (sectionIndex) => {
    onQuestionSelect(sectionIndex, 0)
    setIsDropdownOpen(false)
  }

  const handleQuestionClick = (questionIndex) => {
    onQuestionSelect(currentSectionIndex, questionIndex)
    if (isMobileOpen) closeMobile()
  }

  const currentSectionData = sections[currentSectionIndex]
  const stats = {
    total: currentSectionData?.questions.length || 0,
    answered:
      currentSectionData?.questions.filter((q) => answers[q.q_id] != null)
        .length || 0,
    marked:
      currentSectionData?.questions.filter((q) => markedForReview.has(q.q_id))
        .length || 0,
    notVisited:
      currentSectionData?.questions.filter(
        (q) => answers[q.q_id] == null && !markedForReview.has(q.q_id)
      ).length || 0,
  }

  return (
    <>
      <button
        onClick={toggleMobileOpen}
        className="fixed right-4 bottom-20 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all duration-200 hover:bg-blue-700 lg:hidden"
        aria-label="Toggle Question Navigator"
      >
        <IoGrid className="h-5 w-5" />
      </button>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 transition-opacity duration-200 lg:hidden dark:bg-gray-900/80"
          onClick={closeMobile}
        ></div>
      )}
      <div
        className={`${isMobileOpen ? 'fixed inset-0 z-50' : 'hidden lg:block'} flex h-full flex-col rounded-lg bg-gray-50 shadow-lg transition-colors duration-200 lg:relative lg:inset-auto lg:z-auto dark:bg-gray-800`}
      >
        {isMobileOpen && (
          <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4 transition-colors duration-200 lg:hidden dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Question Navigator
            </h3>
            <button
              onClick={closeMobile}
              className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close Navigator"
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>
        )}
        <div
          className="relative flex-shrink-0 border-b border-gray-200 p-3 transition-colors duration-200 dark:border-gray-700"
          ref={dropdownRef}
        >
          <button
            onClick={toggleDropdown}
            className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-colors duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            aria-expanded={isDropdownOpen}
          >
            <span className="truncate font-medium">
              {currentSectionData?.section_name}
            </span>
            <IoChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform dark:text-gray-400 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-xl transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
              {sections.map((section, sIndex) => (
                <button
                  key={section.section_id}
                  onClick={() => handleSectionChange(sIndex)}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors duration-200 ${
                    sIndex === currentSectionIndex
                      ? 'bg-blue-50 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {section.section_name}
                </button>
              ))}
            </div>
          )}
          <QuestionLegend stats={stats} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] justify-items-center gap-3">
            {currentSectionData?.questions.map((question, qIndex) => (
              <button
                key={question.q_id}
                onClick={() => handleQuestionClick(qIndex)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${getQuestionStatusClasses(
                  {
                    question,
                    qIndex,
                    answers,
                    markedForReview,
                    currentSectionIndex,
                    currentQuestionIndex,
                    isReviewMode,
                  }
                )}`}
                aria-current={
                  qIndex === currentQuestionIndex ? 'page' : undefined
                }
                aria-label={`Go to question ${qIndex + 1}`}
              >
                {qIndex + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
