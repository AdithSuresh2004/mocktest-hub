import { useResultPage } from "@/hooks/result/useResultPage";
import ResultHeader from "@/components/result/ResultHeader";
import ResultScoreCards from "@/components/result/ResultScoreCards";
import ResultQuickOverview from "@/components/result/ResultQuickOverview";
import ResultSectionAnalysis from "@/components/result/ResultSectionAnalysis";
import ResultActions from "@/components/result/ResultActions";
import PageStatus from "@/components/common/PageStatus";
import PageContainer from "@/components/common/PageContainer";

export default function ResultPage() {
  const {
    attemptId,
    attempt,
    exam,
    analysis,
    enrichedAnalysis,
    loading,
    error,
    analysisRef,
    showAnalysis,
    handleScrollToAnalysis,
  } = useResultPage();

  if (loading || error || !attempt || !exam || !enrichedAnalysis) {
    return (
      <PageStatus
        loading={loading}
        error={
          error ||
          (!attempt || !exam || !enrichedAnalysis
            ? "Attempt data could not be loaded."
            : null)
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <ResultHeader examName={exam.exam_name} />
      <main>
        <PageContainer className="py-4 sm:py-8 lg:py-12">
          <div className="space-y-6 sm:space-y-8">
            <ResultScoreCards analysis={enrichedAnalysis} />
            <ResultQuickOverview
              attempt={attempt}
              exam={exam}
              analysis={analysis}
            />
            <ResultActions
              attemptId={attemptId || ""}
              onShowAnalysis={handleScrollToAnalysis}
              showAnalysis={showAnalysis}
            />
            <div ref={analysisRef}>
              <ResultSectionAnalysis
                analysis={analysis || { sectionAnalysis: [] }}
                showAnalysis={showAnalysis}
              />
            </div>
          </div>
        </PageContainer>
      </main>
    </div>
  );
}
