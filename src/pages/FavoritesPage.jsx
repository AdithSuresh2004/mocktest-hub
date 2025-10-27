import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '@/components/common/ConfirmModal'
import Pagination from '@/components/common/Pagination'
import FavoriteCard from '@/components/favorites/FavoriteCard'
import { useConfirmModal } from '@/hooks/common/useConfirmModal'
import { usePagination } from '@/hooks/common/usePagination'
import FavoritesStorage from '@/utils/favorites-storage'
import { FaStar } from 'react-icons/fa'
import EmptyState from '@/components/common/EmptyState'

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
          <EmptyState
            icon={FaStar}
            title="No Saved Tests"
            message="Save your favorite exams to access them quickly. Click the star icon on any test card to add it here."
            actionLabel="Browse Exams"
            onAction={() => navigate('/exams')}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pagination.paginatedItems.map((favorite) => (
                <FavoriteCard
                  key={favorite.exam_id}
                  favorite={favorite}
                  onStart={handleStart}
                  onRemove={handleRemove}
                />
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
