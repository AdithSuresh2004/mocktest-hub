const calculateSectionTotals = (sectionAnalysis) => {
  let correct = 0, incorrect = 0, unanswered = 0
  for (const section of sectionAnalysis) {
    correct += section.correct
    incorrect += section.incorrect
    unanswered += section.unanswered
  }
  return { correct, incorrect, unanswered }
}

const calculateOverallStats = (
  sectionAnalysis,
  totalQuestionsOverall
) => {
  const totals = calculateSectionTotals(sectionAnalysis)
  const totalAttempted = totals.correct + totals.incorrect

  return {
    correct: totals.correct,
    incorrect: totals.incorrect,
    unanswered: totals.unanswered,
    totalQuestions: totalQuestionsOverall,
    attempted: totalAttempted,
    accuracy: totalAttempted > 0 ? (totals.correct / totalAttempted) * 100 : 0,
    percentage:
      totalQuestionsOverall > 0
        ? (totals.correct / totalQuestionsOverall) * 100
        : 0,
  }
}

export { calculateSectionTotals, calculateOverallStats }
