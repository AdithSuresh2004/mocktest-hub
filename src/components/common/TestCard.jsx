import { useState, useEffect } from 'react'
import {
  FaClock,
  FaListAlt,
  FaAward,
  FaStar,
  FaCheckCircle,
  FaPlay,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { capitalizeText } from '@/utils/formatters/formatters'
import {
  getDifficultyColor,
  capitalizeStrength,
  getTestTypeConfig,
} from '@/utils/testHelpers'
import { FavoritesStorage } from '@/utils/storage'
import { findAllAttemptsByExamId } from '@/data/attemptRepository'

const TestCard = ({ test }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [attemptStatus, setAttemptStatus] = useState(null)

  const testTypeConfig = getTestTypeConfig(test.type)

  const TestIcon = testTypeConfig.icon
  const maxVisibleTags = 3

  const subjects = test.subjects || (test.subject ? [test.subject] : [])
  const topics = test.topics || (test.topic ? [test.topic] : [])
  const allTags = [
    ...subjects.map((s) => ({ text: s, type: 'subject' })),
    ...topics.map((t) => ({ text: t, type: 'topic' })),
  ]
  const visibleTags = allTags.slice(0, maxVisibleTags)
  const remainingCount = allTags.length - maxVisibleTags

  useEffect(() => {
    setIsFavorite(FavoritesStorage.isFavorite(test.exam_id))

    const attempts = findAllAttemptsByExamId(test.exam_id)
    if (attempts.length > 0) {
      const completedAttempts = attempts.filter(
        (att) => att.status === 'completed'
      )
      if (completedAttempts.length > 0) {
        setAttemptStatus('completed')
      } else {
        setAttemptStatus('in_progress')
      }
    } else {
      setAttemptStatus('not_attempted')
    }
  }, [test.exam_id])

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const favoriteData = {
      exam_id: test.exam_id,
      exam_name: test.exam_name,
      type: testTypeConfig.label,
      subject: subjects[0] || test.category || '',
      duration_minutes: test.duration_minutes,
      total_questions: test.total_questions,
      total_marks: test.total_marks,
      exam_strength: test.exam_strength,
    }
    const newStatus = FavoritesStorage.toggle(test.exam_id, favoriteData)
    setIsFavorite(newStatus)
  }

  return (
    <div className="relative flex h-72 flex-col rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <FaStar
          className={`h-5 w-5 transition-colors ${
            isFavorite
              ? 'fill-yellow-500 text-yellow-500'
              : 'text-gray-400 hover:text-yellow-500 dark:text-gray-500'
          }`}
        />
      </button>
      <div className="mb-3 flex flex-wrap gap-2 pr-10">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getDifficultyColor(test.exam_strength)}`}
        >
          {capitalizeStrength(test.exam_strength) || 'Normal'}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${testTypeConfig.color}`}
        >
          <TestIcon className="mr-1.5 h-3 w-3" />
          {testTypeConfig.label}
        </span>
        {attemptStatus && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
              attemptStatus === 'completed'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                : attemptStatus === 'in_progress'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {attemptStatus === 'completed' ? (
              <>
                <FaCheckCircle className="mr-1 h-3 w-3" />
                Completed
              </>
            ) : attemptStatus === 'in_progress' ? (
              <>
                <FaPlay className="mr-1 h-3 w-3" />
                In Progress
              </>
            ) : (
              'Not Attempted'
            )}
          </span>
        )}
      </div>
      <h3 className="mb-2 line-clamp-1 truncate text-lg leading-snug font-semibold text-gray-900 dark:text-gray-100">
        {test.exam_name}
      </h3>
      {test.category && (
        <p className="mb-3 truncate text-sm text-gray-600 dark:text-gray-400">
          {capitalizeText(test.category)}
        </p>
      )}
      <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <FaClock className="h-4 w-4" />
          <span>{test.duration_minutes} mins</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaListAlt className="h-4 w-4" />
          <span>{test.total_questions} ques</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaAward className="h-4 w-4" />
          <span>{test.total_marks} marks</span>
        </div>
      </div>
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {visibleTags.map((tag, idx) => (
            <span
              key={`${tag.type}-${idx}`}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag.text}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              title={allTags
                .slice(maxVisibleTags)
                .map((t) => t.text)
                .join(', ')}
            >
              +{remainingCount} more
            </span>
          )}
        </div>
      )}
      <div className="mt-auto">
        <Link
          to={`/exam/${test.exam_id}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800"
        >
          {attemptStatus === 'completed'
            ? 'Retake Test'
            : attemptStatus === 'in_progress'
              ? 'Continue Test'
              : 'Start Test'}
        </Link>
      </div>
    </div>
  )
}

export default TestCard
