import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageStatus from "@/components/common/PageStatus";
import QuestionNavigator from "@/components/exam/QuestionNavigator";
import ReviewArea from "@/components/review/ReviewArea";
import { reviewStore } from "@/stores/reviewStore";
import ReviewHeader from "@/components/review/ReviewHeader";
import { useKeyboardShortcuts } from "@/hooks/common/useKeyboardShortcuts";
import Card from "@/components/common/Card";

const ReviewPage = () => {
  const { attemptId } = useParams();
  const {
    attempt,
    exam,
    loading,
    error,
    currentSection,
    currentQuestion,
    navigateToQuestion,
    goToNext,
    goToPrev,
    loadReviewData,
  } = reviewStore();

  useEffect(() => {
    if (!attemptId) return;
    void loadReviewData(attemptId);
  }, [attemptId, loadReviewData]);

  const sectionData = exam?.sections?.[currentSection];
  const isFirst = currentSection === 0 && currentQuestion === 0;
  const isLast = Boolean(
    exam &&
      currentSection === exam.sections.length - 1 &&
      sectionData &&
      currentQuestion === sectionData.questions.length - 1,
  );

  useKeyboardShortcuts({
    onPrevQuestion: !isFirst ? goToPrev : null,
    onNextQuestion: !isLast ? goToNext : null,
    onSelectOption: null,
    onMarkForReview: null,
    onToggleFullscreen: null,
    enabled: !loading && !!exam && !!attempt,
  });

  if (loading) {
    return <PageStatus loading loadingMessage="Loading review..." />;
  }

  if (error) {
    return <PageStatus error={error} />;
  }

  if (!attempt || !exam) {
    return <PageStatus error="No data available for review." />;
  }

  const question = sectionData?.questions?.[currentQuestion];

  if (!sectionData || !question) {
    return <PageStatus error="Question data not found." />;
  }

  const answers: Record<string, string> = attempt.responses.reduce(
    (acc, res) => {
      acc[res.q_id] = res.selected_opt_id;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-gray-900">
      <ReviewHeader attemptId={attemptId} attempt={attempt} exam={exam} />

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-4">
        <Card
          padding="none"
          className="flex flex-col overflow-hidden lg:col-span-3"
        >
          <ReviewArea
            question={question}
            sectionName={sectionData.section_name}
            questionIndex={currentQuestion}
            totalQuestions={sectionData.questions.length}
            userAnswer={answers[question.q_id]}
            onNext={goToNext}
            onPrev={goToPrev}
            isFirst={isFirst}
            isLast={isLast}
          />
        </Card>

        <QuestionNavigator
          sections={exam.sections}
          answers={answers}
          currentSectionIndex={currentSection}
          currentQuestionIndex={currentQuestion}
          onQuestionSelect={navigateToQuestion}
          isReviewMode={true}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
