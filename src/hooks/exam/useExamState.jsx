export const useExamState = (exam, currentSection, currentQuestion) => {
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

export const getExamAnimations = (isLandscape) => ({
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transformDelay: isLandscape ? '150ms' : '0ms',
})

export const getAnsweredCount = (answers, totalQuestions) => ({
  answered: Object.keys(answers).length,
  total: totalQuestions,
  percentage:
    totalQuestions > 0
      ? Math.round((Object.keys(answers).length / totalQuestions) * 100)
      : 0,
})
