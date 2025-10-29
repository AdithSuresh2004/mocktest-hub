import { useState, useEffect } from 'react'
import { getManifest as getExamsManifest } from '@/data/examRepository'
import { getAllAttempts } from '@/data/attemptRepository'
import { FILTER_OPTIONS } from '@/constants'
import {
  normalizeTests,
  getExamNames,
  getTopics,
  getSubjects,
  calculateTabCounts,
} from '@/utils/helpers/examSelectionHelpers'
import { filterTests, hasActiveFilters } from '@/services/filterService'
import { sortTests } from '@/utils/helpers/sortHelpers'

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
  const [sortOrder, setSortOrder] = useState('default')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

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

  const sortedTests = sortTests(filteredTests, sortOrder)

  const hasActiveFiltersState = hasActiveFilters({
    searchTerm,
    selectedExam,
    selectedTopic,
    selectedSubject,
    selectedStrength,
    selectedAttemptStatus,
  })
  const filterActions = {
    Exam: setSelectedExam,
    Topic: setSelectedTopic,
    Subject: setSelectedSubject,
    Strength: setSelectedStrength,
    'Attempt Status': setSelectedAttemptStatus,
  }

  const handleFilterChange = (filter, value) => {
    const action = filterActions[filter]
    if (action) action(value)
  }
  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedExam('All Exams')
    setSelectedTopic('All Topics')
    setSelectedSubject('All Subjects')
    setSelectedStrength('All levels')
    setSelectedAttemptStatus('all')
    setShowMobileFilters(false)
  }

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters)
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
    showMobileFilters,
    ATTEMPT_STATUSES: FILTER_OPTIONS.ATTEMPT_STATUSES,
    tabCounts,
    examNames,
    topics,
    subjects,
    STRENGTHS: FILTER_OPTIONS.STRENGTHS,
    filteredTests: sortedTests,
    hasActiveFilters: hasActiveFiltersState,
    loadManifest,
    setActiveTab,
    setSearchTerm,
    handleFilterChange,
    clearAllFilters,
    toggleMobileFilters,
    sortOrder,
    setSortOrder,
  }
}

export { useExamSelection }
