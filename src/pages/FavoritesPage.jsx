import { useNavigate } from 'react-router-dom'
import ConfirmModal from '@/components/common/ConfirmModal'
import Pagination from '@/components/common/Pagination'
import FavoriteCard from '@/components/favorites/FavoriteCard'
import { useConfirmModal } from '@/hooks/common/useConfirmModal'
import { usePagination } from '@/hooks/common/usePagination'
import { useFavorites } from '@/hooks/favorites/useFavorites'
import FavoritesSkeleton from '@/components/common/skeletons/FavoritesSkeleton'
import { FaStar } from 'react-icons/fa'
import EmptyState from '@/components/common/EmptyState'
import PageHeader from '@/components/common/PageHeader'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, loading, removeFavorite } = useFavorites()
  const { isOpen, config, openConfirm, closeConfirm } = useConfirmModal()
  const pagination = usePagination(favorites, 12)

  const handleRemove = (examId, examName, e) => {
    e.stopPropagation()
    openConfirm({
      title: 'Remove from Favorites?',
      message: `Are you sure you want to remove "${examName}" from your favorites?`,
      confirmText: 'Remove',
      cancelText: 'Cancel',
      type: 'warning',
      onConfirm: () => removeFavorite(examId),
    })
  }

  const handleStart = (examId) => {
    navigate(`/exam/${examId}`)
  }

  if (loading) {
    return <FavoritesSkeleton />
  }

  return (
    <div className="min-h-full animate-fadeIn bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900 flex flex-col">
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
      <div className="mx-auto max-w-7xl w-full">
        <PageHeader
          title="Saved Tests"
          description={`Your favorite exams for quick access (${favorites.length} ${
            favorites.length === 1 ? 'test' : 'tests'
          })`}
        />
      </div>
      <div className="mt-8 flex-1 w-full max-w-7xl mx-auto">
        {favorites.length === 0 ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <EmptyState
              icon={FaStar}
              title="No Saved Tests"
              message="Save your favorite exams to access them quickly. Click the star icon on any test card to add it here."
              actionLabel="Browse Exams"
              onAction={() => navigate('/exams')}
            />
          </div>
        ) : (
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
        )}
      </div>
      {pagination.totalPages > 1 && (
        <div className="mt-8 w-full max-w-7xl mx-auto">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  )
}
