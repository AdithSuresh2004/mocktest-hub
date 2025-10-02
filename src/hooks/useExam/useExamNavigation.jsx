import { useState, useCallback } from 'react';
export function useExamNavigation(sections) {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigateToQuestion = useCallback((sectionIdx, questionIdx) => {
    setCurrentSection(sectionIdx);
    setCurrentQuestion(questionIdx);
  }, []);
  const goToNext = useCallback(() => {
    const section = sections[currentSection];
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(q => q + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(s => s + 1);
      setCurrentQuestion(0);
    }
  }, [sections, currentSection, currentQuestion]);
  const goToPrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(q => q - 1);
    } else if (currentSection > 0) {
      setCurrentSection(s => s - 1);
      const prevSection = sections[currentSection - 1];
      setCurrentQuestion(prevSection.questions.length - 1);
    }
  }, [sections, currentSection, currentQuestion]);
  return { currentSection, currentQuestion, setCurrentQuestion, setCurrentSection, navigateToQuestion, goToNext, goToPrev };
}