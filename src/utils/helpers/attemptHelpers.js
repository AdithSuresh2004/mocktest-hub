import { findExamById } from '@/data/examRepository'

export async function normalizeAttempt(attempt) {
  if (!attempt) return null
  try {
    const exam = await findExamById(attempt.exam_id)
    if (!exam) return null
    const totalQuestions = exam.sections.reduce((sum, section) => {
      if (!Array.isArray(section.questions)) return sum
      return sum + section.questions.length
    }, 0)
    const totalMarks = exam.sections.reduce((sum, section) => {
      if (!Array.isArray(section.questions)) return sum
      return (
        sum +
        section.questions.reduce((sectionSum, question) => {
          const rawMarks = Number(question?.marks)
          const marks = Number.isFinite(rawMarks) ? rawMarks : 4
          return sectionSum + Math.max(marks, 0)
        }, 0)
      )
    }, 0)
    const getScorePercentage = (score) => {
      if (score === null || score === undefined) return 0
      if (typeof score === 'number') {
        if (totalMarks > 0) {
          return (score / totalMarks) * 100
        }
        return score
      }
      if (typeof score === 'object') {
        if (
          typeof score.actual === 'number' &&
          typeof score.total === 'number' &&
          score.total > 0
        ) {
          return (score.actual / score.total) * 100
        }
        if (typeof score.total === 'number' && totalQuestions > 0) {
          const maxScore = totalQuestions
          return (score.total / maxScore) * 100
        }
      }
      return 0
    }
    return {
      id: attempt.id || attempt.attempt_id,
      examId: attempt.exam_id,
      examName: exam.title || attempt.exam_name || `Exam ${attempt.exam_id}`,
      date: attempt.date || attempt.timestamp,
      status: attempt.status,
      timeTaken: attempt.time_taken,
      score: getScorePercentage(attempt.score),
      rawScore: attempt.score,
      responses: attempt.responses,
      category: exam.category,
      subjects: exam.subjects || (exam.subject ? [exam.subject] : []),
      topics: exam.topics || (exam.topic ? [exam.topic] : []),
      _startedAt: attempt._startedAt,
      _durationMinutes: attempt._durationMinutes,
      _timeRemainingSeconds: attempt._timeRemainingSeconds,
    }
  } catch {
    return null
  }
}
