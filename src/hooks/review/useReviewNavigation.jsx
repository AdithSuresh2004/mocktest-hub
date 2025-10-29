import { useState, useEffect, useCallback } from 'react';

export const useReviewNavigation = (exam) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navigateToQuestion = useCallback((sectionIndex, questionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(questionIndex);
  }, []);

  const goToNext = useCallback(() => {
    if (!exam) return;
    const currentSection = exam.sections[currentSectionIndex];
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < exam.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  }, [currentQuestionIndex, currentSectionIndex, exam]);

  const goToPrev = useCallback(() => {
    if (!exam) return;
    const currentSection = exam.sections[currentSectionIndex];
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = exam.sections[currentSectionIndex - 1];
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  }, [currentQuestionIndex, currentSectionIndex, exam]);

  useEffect(() => {
    if (!exam) return;

    const handleKeyNavigation = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [exam, goToPrev, goToNext]);

  return {
    currentSectionIndex,
    currentQuestionIndex,
    navigateToQuestion,
    goToNext,
    goToPrev,
  };
};
