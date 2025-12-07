import { useCallback, useEffect, useRef, useState } from "react";
import { examStore } from "@/stores/examStore";
import { attemptStore } from "@/stores/attemptStore";
import { examListStore } from "@/stores/examListStore";
import { globalLoadingStore } from "@/stores/globalLoadingStore";
import { calculateAnalysis } from "@/utils/exam/attemptCalculations";
import { getResponsesFromAnswers } from "@/services/examService";

/**
 * Consolidated exam hook - manages loading, state sync, and lifecycle
 */
const useExam = (examId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef<string | null>(null);

  // Store state
  const examState = examStore();
  const {
    exams,
    loading: examListLoading,
    getExam,
    loadExams,
  } = examListStore();
  const { attempts, addAttempt, updateAttempt, removeAttempt } = attemptStore();

  // Load exam list if needed
  useEffect(() => {
    if (!exams.length && !examListLoading) {
      void loadExams();
    }
  }, [exams.length, examListLoading, loadExams]);

  // Load exam and attempt
  useEffect(() => {
    if (!examId) {
      setLoading(false);
      return;
    }
    if (examListLoading) {
      setLoading(true);
      return;
    }
    if (initializedRef.current === examId) return;

    initializedRef.current = examId;
    setLoading(true);
    setError(null);

    const exam = getExam(examId);
    if (!exam) {
      setError("Exam not found");
      setLoading(false);
      return;
    }

    const attempt = Object.values(attempts).find(
      (a) => a.exam_id === examId && a.status === "in_progress",
    );

    examStore.getState().loadExam(exam, attempt || null, () => {
      finalizeExam(true);
    });

    if (attempt?._hasStarted) {
      examStore.getState().startTimer();
    }

    setLoading(false);
  }, [examId, examListLoading, getExam, attempts]);

  // Auto-sync state to attempt store
  useEffect(() => {
    const unsubscribe = examStore.subscribe((state, prevState) => {
      if (!state.hasStarted || !state.attempt) return;

      const hasChanged =
        state.seconds !== prevState.seconds ||
        state.currentSection !== prevState.currentSection ||
        state.currentQuestion !== prevState.currentQuestion ||
        state.markedForReview !== prevState.markedForReview ||
        state.answers !== prevState.answers;

      if (hasChanged && state.attempt && state.seconds > 0) {
        updateAttempt(state.attempt.id, {
          ...state.attempt,
          _currentSection: state.currentSection,
          _currentQuestion: state.currentQuestion,
          _timeRemainingSeconds: state.seconds,
          _markedForReview: Array.from(state.markedForReview),
          responses: getResponsesFromAnswers(state.answers),
        });
      }
    });
    return () => unsubscribe();
  }, [updateAttempt]);

  // Auto-finalize on time up
  useEffect(() => {
    const { isTimeUp, isSubmitted } = examStore.getState();
    if (isTimeUp && !isSubmitted) {
      finalizeExam(true);
    }
  }, [examState.isTimeUp, examState.isSubmitted]);

  // Actions
  const finalizeExam = useCallback(
    (_isTimeout = false) => {
      const { show, hide } = globalLoadingStore.getState();
      show("Submitting exam...");

      setTimeout(() => {
        const {
          exam,
          attempt,
          answers,
          seconds,
          stopTimer,
          setSubmitted,
          resetExamState,
        } = examStore.getState();
        if (!exam || !attempt) {
          hide();
          return;
        }

        stopTimer();

        const attemptData = {
          ...attempt,
          responses: getResponsesFromAnswers(answers),
        };
        const analysis = calculateAnalysis(exam, attemptData);

        const finalAttempt = {
          ...attempt,
          status: "completed" as const,
          score: analysis.score,
          time_taken: exam.duration_minutes * 60 - seconds,
          responses: getResponsesFromAnswers(answers),
          _hasStarted: true,
        };

        updateAttempt(finalAttempt.id, finalAttempt);
        setSubmitted();

        setTimeout(() => {
          hide();
          resetExamState();
        }, 300);
      }, 100);
    },
    [updateAttempt],
  );

  const saveAndExit = useCallback(() => {
    const {
      isSubmitted,
      attempt,
      exam,
      seconds,
      currentSection,
      currentQuestion,
      markedForReview,
      answers,
      hasStarted,
      stopTimer,
      resetExamState,
    } = examStore.getState();
    if (isSubmitted || !attempt?.id || !exam) return;

    stopTimer();
    updateAttempt(attempt.id, {
      ...attempt,
      _currentSection: currentSection,
      _currentQuestion: currentQuestion,
      _timeRemainingSeconds: seconds,
      _markedForReview: Array.from(markedForReview),
      responses: getResponsesFromAnswers(answers),
      _hasStarted: hasStarted,
    });
    resetExamState();
  }, [updateAttempt]);

  const deleteAndExit = useCallback(() => {
    const { attempt, stopTimer, resetExamState } = examStore.getState();
    stopTimer();
    if (attempt) removeAttempt(attempt.id);
    resetExamState();
  }, [removeAttempt]);

  const startNewExam = useCallback(() => {
    const { exam } = examStore.getState();
    if (!exam) return;

    const newAttempt = {
      id: `${exam.exam_id}-${Date.now()}`,
      exam_id: exam.exam_id,
      status: "in_progress" as const,
      date: new Date().toISOString(),
      responses: [],
      _currentSection: 0,
      _currentQuestion: 0,
      _timeRemainingSeconds: exam.duration_minutes * 60,
      _markedForReview: [],
      _hasStarted: true,
    };

    addAttempt(newAttempt);
    examStore.getState().loadExam(exam, newAttempt, () => finalizeExam(true));
    examStore.getState().startTimer();
  }, [addAttempt, finalizeExam]);

  return {
    // State
    exam: examState.exam,
    attempt: examState.attempt,
    loading: loading || examState.loading,
    error,
    isSubmitted: examState.isSubmitted,
    isTimeUp: examState.isTimeUp,
    answers: examState.answers,
    markedForReview: examState.markedForReview,
    seconds: examState.seconds,

    // Navigation
    currentSection: examState.currentSection,
    currentQuestion: examState.currentQuestion,
    goToQuestion: examState.goToQuestion,
    nextQuestion: examState.nextQuestion,
    prevQuestion: examState.prevQuestion,
    goToSection: examState.goToSection,

    // Actions
    saveAnswer: examState.saveAnswer,
    toggleMarkForReview: examState.toggleMarkForReview,
    startNewExam,
    finalizeExam,
    saveAndExit,
    deleteAndExit,
  };
};

export default useExam;
