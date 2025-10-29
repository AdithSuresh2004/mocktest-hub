const getQuestionMarks = (question) => {
  if (typeof question.marks === 'number') {
    return question.marks
  }
  if (typeof question.marks === 'object' && question.marks?.total) {
    return question.marks.total
  }
  return 1
}

const getTotalMarks = (exam) => {
  if (!exam?.sections) return 0
  return exam.sections.reduce((sum, section) => {
    if (!Array.isArray(section.questions)) return sum
    return (
      sum +
      section.questions.reduce((qSum, q) => {
        return qSum + getQuestionMarks(q)
      }, 0)
    )
  }, 0)
}

const getScore = (attempt) => {
  if (typeof attempt?.score === 'number') {
    return attempt.score
  }
  if (
    typeof attempt?.score === 'object' &&
    attempt.score?.total !== undefined
  ) {
    return attempt.score.total
  }
  return 0
}

const getPerformanceLevel = (percentage) => {
  const numPercentage = parseFloat(percentage)
  if (numPercentage >= 90)
    return { text: 'Excellent', color: 'text-green-600 dark:text-green-400' }
  if (numPercentage >= 75)
    return { text: 'Very Good', color: 'text-blue-600 dark:text-blue-400' }
  if (numPercentage >= 60)
    return { text: 'Good', color: 'text-yellow-600 dark:text-yellow-400' }
  if (numPercentage >= 40)
    return { text: 'Average', color: 'text-orange-600 dark:text-orange-400' }
  return { text: 'Needs Improvement', color: 'text-red-600 dark:text-red-400' }
}

const calculateAccuracy = (correct, attempted) => {
  if (!attempted || attempted === 0) return 0
  return ((correct / attempted) * 100).toFixed(1)
}

const getTotalQuestions = (exam) => {
  if (!exam?.sections) return 0
  return exam.sections.reduce((sum, section) => {
    if (!Array.isArray(section.questions)) return sum
    return sum + section.questions.length
  }, 0)
}

const calculateTotalMarks = (exam) => {
  if (!exam?.sections) return 0
  return exam.sections.reduce((sum, section) => {
    if (!Array.isArray(section.questions)) return sum
    return (
      sum +
      section.questions.reduce((qSum, q) => {
        return qSum + getQuestionMarks(q)
      }, 0)
    )
  }, 0)
}

export { 
  getQuestionMarks, 
  getTotalMarks, 
  getScore, 
  getPerformanceLevel, 
  calculateAccuracy, 
  getTotalQuestions,
  calculateTotalMarks
}




