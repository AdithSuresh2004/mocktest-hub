import { useState, useEffect, useCallback } from "react";
import { getExamById } from "@/api/examApi";
import { useExamNavigation } from "@/hooks/useExamNavigation";
import { useTimer } from "@/hooks/useTimer";
import { createAttemptLocal, deleteAttempt, getLatestAttemptLocal, updateAttemptLocal } from "@/api/attemptApi";
import { calculateScore } from "@/utils/examHelpers"
export default function useExam(examId) {
  const [exam, setExam] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useExamNavigation(exam?.sections || []);
  const { currentSection, currentQuestion, setCurrentSection, setCurrentQuestion } = navigation;
  const timer = useTimer(0, useCallback(() => {
    finalizeExam(true);
  }, []));
  useEffect(() => {
    if (!examId) {
      setLoading(false);
      setError("Invalid exam ID.");
      return;
    }
    const loadExam = async () => {
      setLoading(true);
      setError(null);
      try {
        const examData = await getExamById(examId);
        if (!examData) {
          setError("Exam not found.");
          setLoading(false);
          return;
        }
        if (!examData.sections || examData.sections.length === 0) {
          console.error("Exam has no sections:", examData);
          setError("Exam has no sections.");
          setLoading(false);
          return;
        }
        setExam(examData);
        const examDataId = examData.id || examData.exam_id;
        let activeAttempt = getLatestAttemptLocal(examDataId);
        if (!activeAttempt) {
          activeAttempt = createAttemptLocal(examDataId, examData.duration_minutes);
        }
        setAttempt(activeAttempt);
        const answersObj = {};
        if (activeAttempt.responses && Array.isArray(activeAttempt.responses)) {
          activeAttempt.responses.forEach(response => {
            answersObj[response.q_id] = response.selected_opt_id;
          });
        }
        setAnswers(answersObj);
        setMarkedForReview(new Set(activeAttempt._markedForReview || []));
        const submitted = activeAttempt.status === 'completed';
        setIsSubmitted(submitted);
        setCurrentSection(activeAttempt._currentSection || 0);
        setCurrentQuestion(activeAttempt._currentQuestion || 0);
        timer.setTime(activeAttempt._timeRemainingSeconds || examData.duration_minutes * 60);
        if (activeAttempt.status === 'in_progress') {
          timer.start();
        }
        setLoading(false);
      } catch (e) {
        setError("Failed to load exam attempt: " + e.message);
        console.error("Error loading exam:", e);
        setLoading(false);
      }
    };
    loadExam();
  }, [examId]);
  useEffect(() => {
    if (!attempt?.attempt_id || isSubmitted) return;
    const saveState = setTimeout(() => {
      updateAttemptLocal(attempt.attempt_id, {
        _currentSection: currentSection,
        _currentQuestion: currentQuestion,
        _timeRemainingSeconds: timer.seconds
      });
    }, 5000);
    return () => clearTimeout(saveState);
  }, [currentSection, currentQuestion, timer.seconds, attempt?.attempt_id, isSubmitted]);
  const saveAndExitExam = useCallback(() => {
    if (isSubmitted || !attempt?.attempt_id || !exam) return;
    timer.stop();
    const responses = Object.entries(answers).map(([q_id, selected_opt_id]) => ({
      q_id,
      selected_opt_id
    }));
    const updates = {
      status: 'in_progress',
      _currentSection: currentSection,
      _currentQuestion: currentQuestion,
      _timeRemainingSeconds: timer.seconds,
      responses,
    };
    updateAttemptLocal(attempt.attempt_id, updates);
  }, [isSubmitted, attempt, answers, timer, exam, currentSection, currentQuestion]);
   const deleteAndExitExam = useCallback(() => {
    if (!attempt?.attempt_id) return;
    timer.stop();
    deleteAttempt(attempt.attempt_id); 
    setAttempt(null);
    setAnswers({});
    setMarkedForReview(new Set());
    setIsSubmitted(false); 
  }, [attempt?.attempt_id, timer]);
  const saveAnswer = useCallback((questionId, answer) => {
    if (isSubmitted || !attempt?.attempt_id) return;
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: answer };
      const responses = Object.entries(newAnswers).map(([q_id, selected_opt_id]) => ({
        q_id,
        selected_opt_id
      }));
      updateAttemptLocal(attempt.attempt_id, { responses });
      return newAnswers;
    });
  }, [isSubmitted, attempt?.attempt_id]);
  const toggleMarkForReview = useCallback((questionId) => {
    if (isSubmitted || !attempt?.attempt_id) return;
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      newSet.has(questionId) ? newSet.delete(questionId) : newSet.add(questionId);
      updateAttemptLocal(attempt.attempt_id, { _markedForReview: Array.from(newSet) });
      return newSet;
    });
  }, [isSubmitted, attempt?.attempt_id]);
  const finalizeExam = useCallback((isTimerFinish = false) => {
    if (isSubmitted || !attempt?.attempt_id || !exam) return;
    timer.stop();
    setIsSubmitted(true);
    const timeTakenSeconds = attempt._durationMinutes * 60 - (isTimerFinish ? 0 : timer.seconds);
    const score = calculateScore(exam, answers);
    const responses = Object.entries(answers).map(([q_id, selected_opt_id]) => ({
      q_id,
      selected_opt_id
    }));
    const updates = {
      status: 'completed',
      timestamp: new Date().toISOString(),
      responses,
      score,
      time_taken: timeTakenSeconds,
      _timeRemainingSeconds: isTimerFinish ? 0 : timer.seconds,
    };
    updateAttemptLocal(attempt.attempt_id, updates);
  }, [isSubmitted, attempt, answers, timer, exam, calculateScore]);
  return {
    exam,
    attempt,
    answers,
    markedForReview,
    isSubmitted,
    timeRemaining: timer.seconds,
    saveAnswer,
    toggleMarkForReview,
    finalizeExam,
    saveAndExitExam,
    deleteAndExitExam,
    error,
    loading,
    start: timer.start,
    stop: timer.stop,
    ...navigation,
  };
}