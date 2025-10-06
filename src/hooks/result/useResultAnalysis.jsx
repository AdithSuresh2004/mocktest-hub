import { useState, useEffect, useCallback } from 'react'
import { findAttemptById } from '@/data/attemptRepository'

import { findExamById } from '@/data/examRepository'

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

const calculateAnalysis = (examData, attemptData) => {
  const responsesMap = {}
  if (attemptData.responses) {
    attemptData.responses.forEach((r) => {
      responsesMap[r.q_id] = r.selected_opt_id
    })
  }
  const sectionScores =
    typeof attemptData.score === 'object' && attemptData.score?.per_section
      ? attemptData.score.per_section
      : {}
  let totalCorrect = 0
  let totalIncorrect = 0
  let totalUnanswered = 0
  const totalQuestionsOverall = getTotalMarks(examData)
  const sectionAnalysis = examData.sections.map((section, sectionIndex) => {
    let sectionCorrect = 0
    let sectionIncorrect = 0
    let sectionUnanswered = 0
    let sectionMarks = 0
    let sectionTotalMarks = 0
    const sectionKey =
      section.section_id ||
      section.section_name?.[0] ||
      String.fromCharCode(65 + sectionIndex)
    section.questions.forEach((question) => {
      const userAnswer = responsesMap[question.q_id]
      const questionMarks = getQuestionMarks(question)
      sectionTotalMarks += questionMarks
      if (!userAnswer) {
        sectionUnanswered++
      } else if (userAnswer === question.correct_opt_id) {
        sectionCorrect++
        sectionMarks += questionMarks
      } else {
        sectionIncorrect++
      }
    })
    totalCorrect += sectionCorrect
    totalIncorrect += sectionIncorrect
    totalUnanswered += sectionUnanswered
    const actualSectionMarks =
      sectionScores[sectionKey] !== undefined
        ? sectionScores[sectionKey]
        : sectionMarks
    return {
      sectionName: section.section_name,
      correct: sectionCorrect,
      incorrect: sectionIncorrect,
      unanswered: sectionUnanswered,
      totalQuestions: section.questions.length,
      marksObtained: actualSectionMarks,
      totalMarks: sectionTotalMarks,
      accuracy:
        section.questions.length > 0
          ? ((sectionCorrect / section.questions.length) * 100).toFixed(1)
          : 0,
    }
  })
  const totalAttempted = totalCorrect + totalIncorrect
  return {
    sectionAnalysis,
    overall: {
      correct: totalCorrect,
      incorrect: totalIncorrect,
      unanswered: totalUnanswered,
      totalQuestions: totalQuestionsOverall,
      attempted: totalAttempted,
      accuracy:
        totalAttempted > 0
          ? ((totalCorrect / totalAttempted) * 100).toFixed(1)
          : 0,
      percentage:
        totalQuestionsOverall > 0
          ? ((totalCorrect / totalQuestionsOverall) * 100).toFixed(1)
          : 0,
    },
  }
}

export default function useResultAnalysis(attemptId) {
  const [attempt, setAttempt] = useState(null)
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const loadResult = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const attemptData = findAttemptById(attemptId)
      if (!attemptData) {
        setError('Attempt not found.')
        setLoading(false)
        return
      }
      if (attemptData.status !== 'completed') {
        setError('This attempt is not completed yet.')
        setLoading(false)
        return
      }
      const examData = await findExamById(attemptData.exam_id)
      if (!examData) {
        setError('Exam details not found.')
        setLoading(false)
        return
      }
      const analysisData = calculateAnalysis(examData, attemptData)
      setAttempt(attemptData)
      setExam(examData)
      setAnalysis(analysisData)
      setLoading(false)
    } catch (err) {
      setError(err.message || 'Failed to load result.')
      setLoading(false)
    }
  }, [attemptId])
  useEffect(() => {
    loadResult()
  }, [loadResult])
  const totalMarks = exam ? getTotalMarks(exam) : 0
  const actualScore = attempt ? getScore(attempt) : 0
  return {
    loading,
    error,
    attempt,
    exam,
    analysis,
    totalMarks,
    actualScore,
  }
}

export const getPerformanceLevel = (percentage) => {
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
