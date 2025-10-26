import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '@/components/common/ConfirmModal'
import Pagination from '@/components/common/Pagination'
import { useConfirmModal } from '@/hooks/common/useConfirmModal'
import { usePagination } from '@/hooks/common/usePagination'
import { getDifficultyColor, capitalizeStrength } from '@/utils/testHelpers'
import { FavoritesStorage } from '@/utils/storage'
import {
  FaPlay,
  FaListAlt,
  FaClock,
  FaStar,
  FaTrash,
  FaAward,
} from 'react-icons/fa'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const { isOpen, config, openConfirm, closeConfirm } = useConfirmModal()
  const pagination = usePagination(favorites, 12)

  useEffect(() => {
    loadFavorites()
    const handleStorageChange = () => {
      loadFavorites()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const loadFavorites = () => {
    const savedFavorites = FavoritesStorage.getAll()
    const sorted = savedFavorites.sort(
      (a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0)
    )
    setFavorites(sorted)
    setLoading(false)
  }

  const handleRemove = (examId, examName, e) => {
    e.stopPropagation()
    openConfirm({
      title: 'Remove from Favorites?',
      message: `Are you sure you want to remove "${examName}" from your favorites?`,
      confirmText: 'Remove',
      cancelText: 'Cancel',
      type: 'warning',
      onConfirm: () => {
        FavoritesStorage.remove(examId)
        setFavorites((prev) => prev.filter((f) => f.exam_id !== examId))
      },
    })
  }

  const handleStart = (examId) => {
    navigate(`/exam/${examId}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeConfirm}
        onConfirm={config.onConfirm}
        title={config.title}
        message={config.message}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        type={config.type}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Saved Tests
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your favorite exams for quick access ({favorites.length}{' '}
            {favorites.length === 1 ? 'test' : 'tests'})
          </p>
        </div>
        {favorites.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <FaStar className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              No Saved Tests
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Save your favorite exams to access them quickly. Click the star
              icon on any test card to add it here.
            </p>
            <button
              onClick={() => navigate('/exams')}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Browse Exams
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pagination.paginatedItems.map((favorite) => (
                <div
                  key={favorite.exam_id}
                  className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => handleStart(favorite.exam_id)}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FaStar className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {favorite.type || 'Exam'}
                      </span>
                    </div>
                    <button
                      onClick={(e) =>
                        handleRemove(favorite.exam_id, favorite.exam_name, e)
                      }
                      className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700"
                      aria-label="Remove from favorites"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {favorite.exam_name || `Exam ${favorite.exam_id}`}
                  </h3>
                  {favorite.subject && (
                    <p className="mb-3 truncate text-sm text-gray-600 dark:text-gray-400">
                      {favorite.subject}
                    </p>
                  )}
                  {favorite.exam_strength && (
                    <div className="mb-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getDifficultyColor(favorite.exam_strength)}`}
                      >
                        {capitalizeStrength(favorite.exam_strength)}
                      </span>
                    </div>
                  )}
                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                    {favorite.duration_minutes && (
                      <div className="flex items-center gap-1.5">
                        <FaClock className="h-4 w-4" />
                        <span>{favorite.duration_minutes} mins</span>
                      </div>
                    )}
                    {favorite.total_questions && (
                      <div className="flex items-center gap-1.5">
                        <FaListAlt className="h-4 w-4" />
                        <span>{favorite.total_questions} ques</span>
                      </div>
                    )}
                    {favorite.total_marks && (
                      <div className="flex items-center gap-1.5">
                        <FaAward className="h-4 w-4" />
                        <span>{favorite.total_marks} marks</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleStart(favorite.exam_id)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <FaPlay className="h-4 w-4" />
                    Start Exam
                  </button>
                </div>
              ))}
            </div>
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  pageSize={pagination.pageSize}
                  startIndex={pagination.startIndex}
                  endIndex={pagination.endIndex}
                  onPageChange={pagination.goToPage}
                  onPageSizeChange={pagination.changePageSize}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
