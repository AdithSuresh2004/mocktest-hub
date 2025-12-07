import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { resultStore } from "@/stores/resultStore";

export const useResultPage = () => {
  const { attemptId } = useParams();
  const {
    attempt,
    exam,
    analysis,
    enrichedAnalysis,
    loading,
    error,
    loadResult,
  } = resultStore();
  const analysisRef = useRef<HTMLDivElement>(null);
  const [showAnalysis, setShowAnalysis] = useState(true);

  useEffect(() => {
    if (attemptId) {
      void loadResult(attemptId);
    }
  }, [attemptId, loadResult]);

  const handleScrollToAnalysis = () => {
    const newShowAnalysis = !showAnalysis;
    setShowAnalysis(newShowAnalysis);
    if (newShowAnalysis) {
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return {
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
  };
};
