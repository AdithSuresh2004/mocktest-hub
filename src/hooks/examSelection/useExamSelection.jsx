import { useState, useEffect } from 'react'
import { getManifest as getExamsManifest } from '@/data/examRepository'
import { getAllAttempts } from '@/data/attemptRepository'
import { TEST_TYPES, STRENGTHS, ATTEMPT_STATUSES } from '@/utils/constants/filterOptions'
import { 
  normalizeTests, 
  getExamNames, 
  getTopics, 
  getSubjects, 
  calculateTabCounts 
} from '@/utils/helpers/examSelectionHelpers'
import { filterTests, hasActiveFilters } from '@/services/filterService'

const useExamSelection = () => {
  const [manifest, setManifest] = useState({
    full_tests: [],
    subject_tests: [],
    topic_tests: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState('All Exams')
  const [selectedTopic, setSelectedTopic] = useState('All Topics')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [selectedStrength, setSelectedStrength] = useState('All levels')
  const [attemptedExams, setAttemptedExams] = useState(new Set())
  const [selectedAttemptStatus, setSelectedAttemptStatus] = useState('all')

  const loadManifest = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getExamsManifest()
      setManifest(data)
      const attempts = getAllAttempts()
      setAttemptedExams(new Set(attempts.map((a) => a.exam_id)))
    } catch (err) {
      setError(err.message || 'Failed to load exams')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadManifest()
  }, [])

  const allTests = normalizeTests(manifest)
  const examNames = getExamNames(allTests)
  const topics = getTopics(allTests)
  const subjects = getSubjects(allTests)
  const tabCounts = calculateTabCounts(allTests)
  
  const filteredTests = filterTests(allTests, {
    activeTab,
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
    attemptedExams,
  })
  
  const hasActiveFiltersState = hasActiveFilters({
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
  })
  const handleFilterChange = (filter, value) => {
    const action = {
      Exam: setSelectedExam,
      Topic: setSelectedTopic,
      Subject: setSelectedSubject,
      Strength: setSelectedStrength,
      'Attempt Status': setSelectedAttemptStatus,
    }[filter]
    if (action) action(value)
  }
  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedExam('All Exams')
    setSelectedTopic('All Topics')
    setSelectedSubject('All Subjects')
    setSelectedStrength('All levels')
    setSelectedAttemptStatus('all')
  }
  return {
    loading,
    error,
    allTests,
    activeTab,
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
    ATTEMPT_STATUSES,
    tabCounts,
    examNames,
    topics,
    subjects,
    STRENGTHS,
    filteredTests,
    hasActiveFilters: hasActiveFiltersState,
    loadManifest,
    setActiveTab,
    setSearchTerm,
    handleFilterChange,
    clearAllFilters,
  }
}

export { useExamSelection }
