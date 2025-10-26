import { useState } from 'react'

export function useExamNavigation(sections) {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const navigateToQuestion = (sectionIdx, questionIdx) => {
    setCurrentSection(sectionIdx)
    setCurrentQuestion(questionIdx)
  }

  const goToNext = () => {
    const section = sections[currentSection]
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion((q) => q + 1)
    } else if (currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1)
      setCurrentQuestion(0)
    }
  }

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1)
    } else if (currentSection > 0) {
      setCurrentSection((s) => s - 1)
      const prevSection = sections[currentSection - 1]
      setCurrentQuestion(prevSection.questions.length - 1)
    }
  }

  return {
    currentSection,
    currentQuestion,
    setCurrentQuestion,
    setCurrentSection,
    navigateToQuestion,
    goToNext,
    goToPrev,
  }
}
