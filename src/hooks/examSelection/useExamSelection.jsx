import { useState, useEffect } from 'react'
import { getManifest as getExamsManifest } from '@/data/examRepository'
import { getAllAttempts } from '@/data/attemptRepository'

const TEST_TYPES = [
  { id: 'all', label: 'All Tests' },
  { id: 'full_tests', label: 'Mock Tests' },
  { id: 'subject_tests', label: 'Subject Wise' },
  { id: 'topic_tests', label: 'Topic Wise' },
]

const STRENGTHS = [
  { value: 'All levels', label: 'All Levels' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
]

const ATTEMPT_STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'attempted', label: 'Attempted' },
  { value: 'unattempted', label: 'Unattempted' },
]

export function useExamSelection() {
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
  const allTests = [
    ...(manifest.full_tests || []).map((t, index) => ({
      ...t,
      type: 'full_tests',
      exam_id: t.id || t.exam_id,
      exam_name: t.name || t.exam_name,
      exam_strength: t.difficulty || t.exam_strength,
      uid: `full_tests-${t.id || t.exam_id || index}`,
    })),
    ...(manifest.subject_tests || []).map((t, index) => ({
      ...t,
      type: 'subject_tests',
      exam_id: t.id || t.exam_id,
      exam_name: t.name || t.exam_name,
      exam_strength: t.difficulty || t.exam_strength,
      uid: `subject_tests-${t.id || t.exam_id || index}`,
    })),
    ...(manifest.topic_tests || []).map((t, index) => ({
      ...t,
      type: 'topic_tests',
      exam_id: t.id || t.exam_id,
      exam_name: t.name || t.exam_name,
      exam_strength: t.difficulty || t.exam_strength,
      uid: `topic_tests-${t.id || t.exam_id || index}`,
    })),
  ].filter((t) => t.exam_id && t.exam_name)
  const examNames = [
    'All Exams',
    ...new Set(
      allTests
        .map((t) => t.category)
        .filter(Boolean)
        .map((cat) => cat.toUpperCase())
        .sort()
    ),
  ]
  const topicSet = new Set()
  allTests.forEach((t) => {
    if (Array.isArray(t.topics))
      t.topics.forEach((topic) => topicSet.add(topic))
    if (t.topic) topicSet.add(t.topic)
  })
  const topics = ['All Topics', ...Array.from(topicSet).filter(Boolean).sort()]
  const subjectSet = new Set()
  allTests.forEach((t) => {
    if (Array.isArray(t.subjects))
      t.subjects.forEach((subject) => subjectSet.add(subject))
    if (t.subject) subjectSet.add(t.subject)
  })
  const subjects = ['All Subjects', ...Array.from(subjectSet).filter(Boolean).sort()]
  const tabCounts = TEST_TYPES.map((type) => {
    const count =
      type.id === 'all'
        ? allTests.length
        : allTests.filter((t) => t.type === type.id).length
    return { ...type, count }
  })
  const filteredTests = allTests
    .filter((test) => {
      if (activeTab === 'all') return true
      return test.type === activeTab
    })
    .filter((test) => {
      const testName = test.exam_name || ''
      return testName.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .filter((test) => {
      if (selectedExam === 'All Exams') return true
      return test.category?.toLowerCase() === selectedExam.toLowerCase()
    })
    .filter((test) => {
      if (selectedTopic === 'All Topics') return true
      return (
        test.topic === selectedTopic ||
        (Array.isArray(test.topics) && test.topics.includes(selectedTopic))
      )
    })
    .filter((test) => {
      if (selectedSubject === 'All Subjects') return true
      return (
        test.subject === selectedSubject ||
        (Array.isArray(test.subjects) &&
          test.subjects.includes(selectedSubject))
      )
    })
    .filter((test) => {
      if (selectedStrength === 'All levels') return true
      return (
        test.exam_strength?.toLowerCase() === selectedStrength.toLowerCase()
      )
    })
    .filter((test) => {
      if (selectedAttemptStatus === 'all') return true
      const hasAttempted = attemptedExams.has(test.exam_id)
      if (selectedAttemptStatus === 'attempted') return hasAttempted
      if (selectedAttemptStatus === 'unattempted') return !hasAttempted
      return true
    })
  const hasActiveFilters =
    searchTerm ||
    selectedExam !== 'All Exams' ||
    selectedTopic !== 'All Topics' ||
    selectedSubject !== 'All Subjects' ||
    selectedStrength !== 'All levels' ||
    selectedAttemptStatus !== 'all'
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
    hasActiveFilters,
    loadManifest,
    setActiveTab,
    setSearchTerm,
    handleFilterChange,
    clearAllFilters,
  }
}
