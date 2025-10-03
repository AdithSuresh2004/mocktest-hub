import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import {
  FaClock,
  FaListAlt,
  FaBullseye,
  FaAward,
  FaBook,
  FaFileAlt,
  FaStar,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getDifficultyColor, capitalizeStrength, capitalizeText } from '@/utils/formatters/formatters'

const getTestTypeConfig = (type) =>
  ({
    full_tests: {
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      icon: FaFileAlt,
      label: 'Mock Test',
    },
    subject_tests: {
      color:
        'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      icon: FaBook,
      label: 'Subject Test',
    },
    topic_tests: {
      color:
        'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
      icon: FaBullseye,
      label: 'Topic Test',
    },
  })[type] || {
    color: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
    icon: FaFileAlt,
    label: 'Test',
  }

function TestCard({ test }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const testTypeConfig = useMemo(() => getTestTypeConfig(test.type), [test.type])
  const TestIcon = testTypeConfig.icon

  const maxVisibleTags = 3
  
  const { subjects, topics, allTags, visibleTags, remainingCount } = useMemo(() => {
    const subjects = test.subjects || (test.subject ? [test.subject] : [])
    const topics = test.topics || (test.topic ? [test.topic] : [])
    const allTags = [
      ...subjects.map((s) => ({ text: s, type: 'subject' })),
      ...topics.map((t) => ({ text: t, type: 'topic' })),
    ]
    const visibleTags = allTags.slice(0, maxVisibleTags)
    const remainingCount = allTags.length - maxVisibleTags

    return { subjects, topics, allTags, visibleTags, remainingCount }
  }, [test.subjects, test.subject, test.topics, test.topic])

  useEffect(() => {
    const checkFavoriteStatus = () => {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const exists = favorites.some((f) => f.exam_id === test.exam_id)
        setIsFavorite(exists)
      } catch (error) {
        setIsFavorite(false)
      }
    }
    checkFavoriteStatus()
  }, [test.exam_id])

  const toggleFavorite = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      if (isFavorite) {
        const filtered = favorites.filter((f) => f.exam_id !== test.exam_id)
        localStorage.setItem('favorites', JSON.stringify(filtered))
        setIsFavorite(false)
      } else {
        const favoriteData = {
          exam_id: test.exam_id,
          exam_name: test.exam_name,
          type: testTypeConfig.label,
          subject: subjects[0] || test.category || '',
          duration_minutes: test.duration_minutes,
          total_questions: test.total_questions,
          total_marks: test.total_marks,
          exam_strength: test.exam_strength,
          addedAt: new Date().toISOString(),
        }
        favorites.push(favoriteData)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setIsFavorite(true)
      }
    } catch (error) {
      setIsFavorite(false)
    }
  }, [isFavorite, test, testTypeConfig.label, subjects])
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
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getDifficultyColor(
            test.exam_strength,
          )}`}
        >
          {capitalizeStrength(test.exam_strength) || 'Normal'}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${testTypeConfig.color}`}
        >
          <TestIcon className="mr-1.5 h-3 w-3" />
          {testTypeConfig.label}
        </span>
      </div>
      <h3 className="mb-2 line-clamp-2 text-lg leading-snug font-semibold text-gray-900 dark:text-gray-100">
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
          Start Test
        </Link>
      </div>
    </div>
  )
}

export default memo(TestCard)
