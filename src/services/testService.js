import { findAllAttemptsByExamId } from '@/data/attemptRepository'
import { FavoritesStorage } from '@/utils/storage'
import { getTestTypeConfig } from '@/utils/testHelpers'

export const getAttemptStatus = (examId) => {
  const attempts = findAllAttemptsByExamId(examId)
  if (attempts.length === 0) return 'not_attempted'

  const completedAttempts = attempts.filter((att) => att.status === 'completed')
  if (completedAttempts.length > 0) return 'completed'
  return 'in_progress'
}

export const getExamSubjects = (test) => {
  return test.subjects || (test.subject ? [test.subject] : [])
}

export const getExamTopics = (test) => {
  return test.topics || (test.topic ? [test.topic] : [])
}

export const getAllTags = (test) => {
  const subjects = getExamSubjects(test).map((s) => ({
    text: s,
    type: 'subject',
  }))
  const topics = getExamTopics(test).map((t) => ({ text: t, type: 'topic' }))
  return [...subjects, ...topics]
}

export const getFavoriteData = (test) => {
  const testTypeConfig = getTestTypeConfig(test.type)
  return {
    exam_id: test.exam_id,
    exam_name: test.exam_name,
    type: testTypeConfig.label,
    subject: getExamSubjects(test)[0] || test.category || '',
    duration_minutes: test.duration_minutes,
    total_questions: test.total_questions,
    total_marks: test.total_marks,
    exam_strength: test.exam_strength,
  }
}

export const toggleFavoriteStatus = (examId, favoriteData) => {
  return FavoritesStorage.toggle(examId, favoriteData)
}
