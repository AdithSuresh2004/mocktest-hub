import { useNavigate } from "react-router-dom";
import { favoriteStore } from "@/stores/favoriteStore";
import { useConfirmModal } from "@/hooks/common/useConfirmModal";
import { usePagination } from "@/hooks/common/usePagination";
import { Exam } from "@/types";

export const useFavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = favoriteStore();
  const { isOpen, config, openConfirm, closeConfirm } = useConfirmModal();
  const pagination = usePagination(favorites, 12);

  const handleRemove = (
    examId: string,
    examName: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    const exam = favorites.find((f) => f.exam_id === examId);
    if (!exam) return;

    openConfirm({
      title: "Remove from Favorites?",
      message: `Are you sure you want to remove "${examName}" from your favorites?`,
      type: "warning",
      onConfirm: () => toggleFavorite(exam as unknown as Exam),
    });
  };

  const handleStart = (examId: string) => {
    void navigate(`/exam/${examId}`);
  };

  const handleBrowseExams = () => {
    void navigate("/exams");
  };

  return {
    favorites,
    pagination,
    modal: { isOpen, config, closeConfirm },
    handleRemove,
    handleStart,
    handleBrowseExams,
  };
};
