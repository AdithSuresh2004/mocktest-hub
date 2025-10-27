/**
 * Helper functions for exam selection logic
 */

import { TEST_TYPES } from '@/utils/constants/filterOptions'

/**
 * Transform manifest data into normalized test objects
 */
export const normalizeTests = (manifest) => {
  const testTypes = ['full_tests', 'subject_tests', 'topic_tests']

  return testTypes
    .flatMap((type, typeIndex) => {
      const tests = manifest[type] || []
      return tests.map((t, index) => ({
        ...t,
        type,
        exam_id: t.id || t.exam_id,
        exam_name: t.name || t.exam_name,
        exam_strength: t.difficulty || t.exam_strength,
        uid: `${type}-${t.id || t.exam_id || index}`,
      }))
    })
    .filter((t) => t.exam_id && t.exam_name)
}

/**
 * Extract unique exam names from tests
 */
export const getExamNames = (tests) => {
  return [
    'All Exams',
    ...new Set(
      tests
        .map((t) => t.category)
        .filter(Boolean)
        .map((cat) => cat.toUpperCase())
        .sort()
    ),
  ]
}

/**
 * Extract unique topics from tests
 */
export const getTopics = (tests) => {
  const topicSet = new Set()
  tests.forEach((t) => {
    if (Array.isArray(t.topics))
      t.topics.forEach((topic) => topicSet.add(topic))
    if (t.topic) topicSet.add(t.topic)
  })
  return ['All Topics', ...Array.from(topicSet).filter(Boolean).sort()]
}

/**
 * Extract unique subjects from tests
 */
export const getSubjects = (tests) => {
  const subjectSet = new Set()
  tests.forEach((t) => {
    if (Array.isArray(t.subjects))
      t.subjects.forEach((subject) => subjectSet.add(subject))
    if (t.subject) subjectSet.add(t.subject)
  })
  return ['All Subjects', ...Array.from(subjectSet).filter(Boolean).sort()]
}

/**
 * Calculate tab counts for each test type
 */
export const calculateTabCounts = (tests) => {
  return TEST_TYPES.map((type) => ({
    ...type,
    count:
      type.id === 'all'
        ? tests.length
        : tests.filter((t) => t.type === type.id).length,
  }))
}
