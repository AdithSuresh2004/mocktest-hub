export const filterAttempts = (attempts, filters) => {
  let filtered = [...attempts]

  if (filters.category !== 'all') {
    filtered = filtered.filter((a) => a.category === filters.category)
  }

  if (filters.subject !== 'all') {
    filtered = filtered.filter(
      (a) => a.subjects && a.subjects.includes(filters.subject)
    )
  }

  if (filters.topic !== 'all') {
    filtered = filtered.filter(
      (a) => a.topics && a.topics.includes(filters.topic)
    )
  }

  return filtered
}

export const sortAttempts = (attempts, sortOrder) => {
  return [...attempts].sort((a, b) => {
    const compareValue = (b.score || 0) - (a.score || 0)
    return sortOrder === 'asc' ? -compareValue : compareValue
  })
}

const testFilterRules = [
  (test, filters) => {
    if (!filters.activeTab || filters.activeTab === 'all') return true
    return test.type === filters.activeTab
  },
  (test, filters) => {
    if (!filters.searchTerm) return true
    const searchLower = filters.searchTerm.toLowerCase()
    const testName = test.exam_name || ''
    return testName.toLowerCase().includes(searchLower)
  },
  (test, filters) => {
    if (!filters.selectedExam || filters.selectedExam === 'All Exams')
      return true
    return test.category?.toLowerCase() === filters.selectedExam.toLowerCase()
  },
  (test, filters) => {
    if (!filters.selectedTopic || filters.selectedTopic === 'All Topics')
      return true
    if (Array.isArray(test.topics)) {
      return test.topics.includes(filters.selectedTopic)
    }
    return test.topic === filters.selectedTopic
  },
  (test, filters) => {
    if (!filters.selectedSubject || filters.selectedSubject === 'All Subjects')
      return true
    if (Array.isArray(test.subjects)) {
      return test.subjects.includes(filters.selectedSubject)
    }
    return test.subject === filters.selectedSubject
  },
  (test, filters) => {
    if (!filters.selectedStrength || filters.selectedStrength === 'All levels')
      return true
    return (
      test.exam_strength?.toLowerCase() ===
      filters.selectedStrength.toLowerCase()
    )
  },
  (test, filters) => {
    if (
      !filters.selectedAttemptStatus ||
      filters.selectedAttemptStatus === 'all'
    )
      return true
    const hasAttempted = filters.attemptedExams?.has(test.exam_id)
    if (filters.selectedAttemptStatus === 'attempted') return hasAttempted
    if (filters.selectedAttemptStatus === 'unattempted') return !hasAttempted
    return true
  },
]

export const filterTests = (tests, filters) => {
  return tests.filter((test) => {
    return testFilterRules.every((rule) => rule(test, filters))
  })
}

export const hasActiveFilters = (filters) => {
  return !!(
    filters.searchTerm ||
    filters.selectedExam !== 'All Exams' ||
    filters.selectedTopic !== 'All Topics' ||
    filters.selectedSubject !== 'All Subjects' ||
    filters.selectedStrength !== 'All levels' ||
    filters.selectedAttemptStatus !== 'all'
  )
}
