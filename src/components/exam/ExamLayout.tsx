import ExamHeader from "@/components/exam/ExamHeader";
import QuestionArea from "@/components/exam/QuestionArea";
import QuestionNavigator from "@/components/exam/QuestionNavigator";
import ExamNavigation from "@/components/exam/ExamNavigation";
import type { ExamLayoutProps } from "@/types/components-props";

const ExamLayout = ({
  exam,
  timeRemaining,
  onExit,
  isWarning,
  isCritical,
  currentQ,
  currentSectionObj,
  currentSection,
  currentQuestion,
  answers,
  markedForReview,
  saveAnswer,
  toggleMarkForReview,
  canGoPrev,
  canGoNext,
  goToPrev,
  goToNext,
  handleSubmit,
  navigateToQuestion,
}: ExamLayoutProps) => {
  if (!currentQ || !currentSectionObj) {
    return null;
  }

  const mainContainerClasses =
    "flex h-screen flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 transition-[background-color] duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950";
  const headerBarClasses =
    "flex-shrink-0 border-b border-blue-200 bg-white shadow-md backdrop-blur-sm transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm";
  const footerClasses =
    "flex-shrink-0 border-t border-blue-200 bg-white shadow-md backdrop-blur-sm transition-[background-color,border-color] duration-300 dark:border-gray-800 dark:bg-gray-900/95 dark:backdrop-blur-sm";

  return (
    <div className={mainContainerClasses}>
      <div className={headerBarClasses}>
        <ExamHeader
          exam={exam}
          timeRemaining={timeRemaining}
          onExit={onExit}
          isWarning={isWarning}
          isCritical={isCritical}
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-y-scroll transition-colors duration-300">
          <QuestionArea
            question={currentQ}
            section={currentSectionObj.section_name}
            questionIndex={currentQuestion}
            totalQuestions={currentSectionObj.questions.length}
            selected={answers[currentQ.q_id]}
            markedForReview={markedForReview}
            onAnswer={saveAnswer}
            onMarkForReview={toggleMarkForReview}
            containerClass="p-3 sm:p-4 flex-1"
          />
        </main>
        <QuestionNavigator
          sections={exam.sections}
          currentSectionIndex={currentSection}
          currentQuestionIndex={currentQuestion}
          answers={answers}
          markedForReview={markedForReview}
          onQuestionSelect={navigateToQuestion}
        />
      </div>
      <div className={footerClasses}>
        <ExamNavigation
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPrev={goToPrev}
          onNext={goToNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ExamLayout;
