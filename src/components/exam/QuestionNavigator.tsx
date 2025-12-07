import { useState, useRef } from "react";
import { getQuestionStatusClasses } from "@/utils/styleUtils";
import { calculateSectionStats } from "@/services/examService";
import { cn } from "@/utils/cn";
import { IoClose, IoChevronDown, IoGrid } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import QuestionLegend from "@/components/exam/QuestionLegend";
import type { Section } from "@/types";

interface QuestionNavigatorProps {
  sections: Section[];
  answers?: Record<string, string>;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  onQuestionSelect: (sectionIndex: number, questionIndex: number) => void;
  markedForReview?: Set<string>;
  isReviewMode?: boolean;
}

const NAVIGATOR_STYLES = {
  container:
    "flex h-full flex-col bg-gray-50 shadow-lg transition-colors duration-200 md:relative md:inset-auto md:z-auto md:w-96 md:max-w-[28rem] md:min-w-80 md:flex-shrink-0 md:overflow-y-auto dark:bg-gray-800",
  mobileButton:
    "fixed right-4 bottom-20 z-50 rounded-full bg-blue-600 p-3 text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:hidden",
  overlay:
    "fixed inset-0 z-40 bg-gray-900/50 transition-opacity duration-200 md:hidden dark:bg-gray-900/80",
  header:
    "flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4 transition-colors duration-200 dark:border-gray-700",
  dropdown: {
    button:
      "flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    menu: "absolute top-full right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-xl transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800",
    item: {
      active:
        "bg-blue-50 font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      inactive:
        "text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
    },
  },
  questionGrid:
    "grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] justify-items-center gap-3",
  questionButton:
    "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
} as const;

export default function QuestionNavigator({
  sections,
  answers = {},
  currentSectionIndex,
  currentQuestionIndex,
  onQuestionSelect,
  markedForReview = new Set<string>(),
  isReviewMode = false,
}: QuestionNavigatorProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileOpen = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSectionChange = (sectionIndex: number) => {
    onQuestionSelect(sectionIndex, 0);
    setIsDropdownOpen(false);
  };

  const handleQuestionClick = (questionIndex: number) => {
    onQuestionSelect(currentSectionIndex, questionIndex);
    if (isMobileOpen) closeMobile();
  };

  const currentSectionData = sections[currentSectionIndex];
  const stats = calculateSectionStats(
    currentSectionData?.questions,
    answers,
    markedForReview,
    isReviewMode,
  );

  return (
    <>
      <button
        onClick={toggleMobileOpen}
        className={NAVIGATOR_STYLES.mobileButton}
        aria-label="Toggle Question Navigator"
      >
        <IoGrid className="h-5 w-5" />
      </button>
      {isMobileOpen && (
        <div className={NAVIGATOR_STYLES.overlay} onClick={closeMobile}></div>
      )}
      <div
        className={cn(
          NAVIGATOR_STYLES.container,
          isMobileOpen ? "fixed inset-0 z-50" : "hidden md:block",
        )}
      >
        {isMobileOpen && (
          <div className={NAVIGATOR_STYLES.header}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Question Navigator
            </h3>
            <button
              onClick={closeMobile}
              className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-400 dark:hover:text-gray-200"
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
            className={NAVIGATOR_STYLES.dropdown.button}
            aria-expanded={isDropdownOpen}
          >
            <span className="truncate font-medium">
              {currentSectionData?.section_name}
            </span>
            <IoChevronDown
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform dark:text-gray-400",
                isDropdownOpen && "rotate-180",
              )}
            />
          </button>
          {isDropdownOpen && (
            <div className={NAVIGATOR_STYLES.dropdown.menu}>
              {sections.map((section, sIndex) => (
                <button
                  key={section.section_id}
                  onClick={() => handleSectionChange(sIndex)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm transition-colors duration-200",
                    sIndex === currentSectionIndex
                      ? NAVIGATOR_STYLES.dropdown.item.active
                      : NAVIGATOR_STYLES.dropdown.item.inactive,
                  )}
                >
                  {section.section_name}
                </button>
              ))}
            </div>
          )}
          <QuestionLegend stats={stats} isReviewMode={isReviewMode} />
        </div>
        <div className="flex-1 p-4">
          <div className={NAVIGATOR_STYLES.questionGrid}>
            {currentSectionData?.questions.map((question, qIndex) => {
              const isAnswered = answers[question.q_id];
              const isMarked = markedForReview.has(question.q_id);
              const isCorrect =
                isReviewMode &&
                isAnswered &&
                answers[question.q_id] === question.correct_opt_id;
              const isIncorrect =
                isReviewMode &&
                isAnswered &&
                answers[question.q_id] !== question.correct_opt_id;

              return (
                <button
                  key={question.q_id}
                  onClick={() => handleQuestionClick(qIndex)}
                  className={cn(
                    NAVIGATOR_STYLES.questionButton,
                    "relative",
                    getQuestionStatusClasses({
                      question,
                      qIndex,
                      answers,
                      markedForReview,
                      currentQuestionIndex,
                      isReviewMode,
                    }),
                  )}
                  aria-current={
                    qIndex === currentQuestionIndex ? "page" : undefined
                  }
                  aria-label={`Go to question ${qIndex + 1}`}
                >
                  {qIndex + 1}
                  {isCorrect && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-green-600 shadow-sm">
                      ✓
                    </span>
                  )}
                  {isIncorrect && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                      <FaTimes className="h-2.5 w-2.5 text-red-600" />
                    </span>
                  )}
                  {!isReviewMode && isAnswered && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white shadow-sm">
                      ✓
                    </span>
                  )}
                  {isMarked && (
                    <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white shadow-sm">
                      !
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
