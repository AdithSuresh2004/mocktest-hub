import { findExamById } from '@/data/examRepository'

export async function normalizeAttempt(attempt) {
  if (!attempt) return null

  try {
    const exam = await findExamById(attempt.exam_id)
    if (!exam) return null

    const totalQuestions = exam.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0,
    )

    const getScorePercentage = (score) => {
      if (score === null || score === undefined) return 0
      if (typeof score === 'number') return score
      if (typeof score === 'object') {
        // Handles { actual, total } structure
        if (
          typeof score.actual === 'number' &&
          typeof score.total === 'number' &&
          score.total > 0
        ) {
          return (score.actual / score.total) * 100
        }
        // Handles { total: correctAnswers } structure
        if (typeof score.total === 'number' && totalQuestions > 0) {
          // Assuming positive marking only for now.
          // This might need to be adjusted based on exam marking scheme.
          const maxScore = totalQuestions // Simplified: 1 question = 1 mark
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
      // Add exam metadata for filtering
      category: exam.category,
      subjects: exam.subjects || (exam.subject ? [exam.subject] : []),
      topics: exam.topics || (exam.topic ? [exam.topic] : []),
      // Keep internal properties if they exist
      _startedAt: attempt._startedAt,
      _durationMinutes: attempt._durationMinutes,
      _timeRemainingSeconds: attempt._timeRemainingSeconds,
    }
  } catch (error) {
    return null
  }
}
