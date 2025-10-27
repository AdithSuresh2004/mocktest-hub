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

export const filterTests = (tests, filters) => {
  return tests.filter((test) => {
    if (filters.activeTab && filters.activeTab !== 'all') {
      if (test.type !== filters.activeTab) return false
    }

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      const testName = test.exam_name || ''
      if (!testName.toLowerCase().includes(searchLower)) return false
    }

    if (filters.selectedExam && filters.selectedExam !== 'All Exams') {
      if (test.category?.toLowerCase() !== filters.selectedExam.toLowerCase())
        return false
    }

    if (filters.selectedTopic && filters.selectedTopic !== 'All Topics') {
      if (
        (test.topic !== filters.selectedTopic && !Array.isArray(test.topics)) ||
        !test.topics.includes(filters.selectedTopic)
      ) {
        return false
      }
    }

    if (filters.selectedSubject && filters.selectedSubject !== 'All Subjects') {
      if (
        test.subject !== filters.selectedSubject &&
        (!Array.isArray(test.subjects) ||
          !test.subjects.includes(filters.selectedSubject))
      ) {
        return false
      }
    }

    if (filters.selectedStrength && filters.selectedStrength !== 'All levels') {
      if (
        test.exam_strength?.toLowerCase() !==
        filters.selectedStrength.toLowerCase()
      )
        return false
    }

    if (
      filters.selectedAttemptStatus &&
      filters.selectedAttemptStatus !== 'all'
    ) {
      const hasAttempted = filters.attemptedExams?.has(test.exam_id)
      if (filters.selectedAttemptStatus === 'attempted' && !hasAttempted)
        return false
      if (filters.selectedAttemptStatus === 'unattempted' && hasAttempted)
        return false
    }

    return true
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
