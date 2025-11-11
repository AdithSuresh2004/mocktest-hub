import { useFavoritesPage } from "@/hooks/favorites/useFavoritesPage";
import ConfirmModal from "@/components/common/ConfirmModal";
import Pagination from "@/components/common/Pagination";
import FavoriteCard from "@/components/favorites/FavoriteCard";
import { FaStar } from "react-icons/fa";
import EmptyState from "@/components/common/EmptyState";
import PageContainer from "@/components/common/PageContainer";

export default function FavoritesPage() {
  const {
    favorites,
    pagination,
    modal: { isOpen, config, closeConfirm },
    handleRemove,
    handleStart,
    handleBrowseExams,
  } = useFavoritesPage();

  return (
    <div className="animate-fadeIn">
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeConfirm}
        onConfirm={config.onConfirm}
        title={config.title}
        message={config.message}
        type={config.type as "warning" | "danger" | "success"}
      />
      <PageContainer>
        <div>
          {favorites.length === 0 ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <EmptyState
                icon={FaStar}
                title="No Saved Tests"
                message="Save your favorite exams to access them quickly. Click the star icon on any test card to add it here."
                actionLabel="Browse Exams"
                onAction={handleBrowseExams}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pagination.paginatedItems.map((favorite: any) => (
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
          <div className="mt-8">
            <Pagination {...pagination} />
          </div>
        )}
      </PageContainer>
    </div>
  );
}
