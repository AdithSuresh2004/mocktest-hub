import { Exam } from "@/types";
import { createPersistedStore } from "@/stores/createPersistedStore";

export interface FavoriteItem {
  exam_id: string;
  exam_name: string;
  type: string;
  date_added: string;
}

interface FavoriteState {
  favorites: FavoriteItem[];
  toggleFavorite: (favoriteData: Exam) => void;
  isFavorite: (examId: string) => boolean;
  setFavorites: (favorites: FavoriteItem[]) => void;
}

export const favoriteStore = createPersistedStore<FavoriteState>(
  (set, get) => ({
    favorites: [],
    toggleFavorite: (favoriteData) => {
      const { favorites } = get();
      const isFavorite = favorites.some(
        (fav) => fav.exam_id === favoriteData.exam_id,
      );

      set({
        favorites: isFavorite
          ? favorites.filter((fav) => fav.exam_id !== favoriteData.exam_id)
          : [
              ...favorites,
              { ...favoriteData, date_added: new Date().toISOString() },
            ],
      });
    },
    isFavorite: (examId) =>
      get().favorites.some((fav) => fav.exam_id === examId),
    setFavorites: (favorites) => set({ favorites }),
  }),
  { name: "favorite-storage" },
);
