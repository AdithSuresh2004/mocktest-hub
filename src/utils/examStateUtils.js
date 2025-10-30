export const getExamState = (exam, currentSection, currentQuestion) => {
  if (!exam) {
    return {
      currentSectionObj: { questions: [] },
      currentQ: null,
      totalQuestions: 0,
      canGoPrev: false,
      canGoNext: false,
    }
  }

  const currentSectionObj = exam.sections?.[currentSection] || {
    questions: [],
  }
  const currentQ = currentSectionObj.questions[currentQuestion] || null

  const totalQuestions =
    exam.sections?.reduce((sum, s) => sum + s.questions.length, 0) || 0

  const canGoPrev = currentSection > 0 || currentQuestion > 0
  const canGoNext =
    currentSection < exam.sections.length - 1 ||
    currentQuestion < currentSectionObj.questions.length - 1

  return {
    currentSectionObj,
    currentQ,
    totalQuestions,
    canGoPrev,
    canGoNext,
  }
}
