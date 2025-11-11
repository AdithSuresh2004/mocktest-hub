import { StudyNote, NotesFilters } from "@/types/notes";
import { createPersistedStore } from "./createPersistedStore";

interface NotesState {
  notes: StudyNote[];
  filters: NotesFilters;
  addNote: (note: Omit<StudyNote, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, updates: Partial<StudyNote>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  setFilters: (filters: Partial<NotesFilters>) => void;
  getFilteredNotes: () => StudyNote[];
  getNotesBySubject: (subject: string) => StudyNote[];
  getNotesByTopic: (topic: string) => StudyNote[];
  getAllTags: () => string[];
  getAllSubjects: () => string[];
}

const initialState = {
  notes: [] as StudyNote[],
  filters: {
    searchTerm: "",
    selectedSubject: "All Subjects",
    selectedTag: "All Tags",
    sortBy: "updated" as const,
    showPinned: false,
  },
};

export const notesStore = createPersistedStore<NotesState>(
  (set, get) => ({
    ...initialState,

    addNote: (note: Omit<StudyNote, "id" | "createdAt" | "updatedAt">) => {
      const newNote: StudyNote = {
        ...note,
        id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({ notes: [...state.notes, newNote] }));
    },

    updateNote: (id: string, updates: Partial<StudyNote>) => {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id
            ? { ...note, ...updates, updatedAt: new Date().toISOString() }
            : note,
        ),
      }));
    },

    deleteNote: (id: string) => {
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    },

    togglePin: (id: string) => {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id
            ? {
                ...note,
                isPinned: !note.isPinned,
                updatedAt: new Date().toISOString(),
              }
            : note,
        ),
      }));
    },

    setFilters: (filters: Partial<NotesFilters>) => {
      set((state) => ({
        filters: { ...state.filters, ...filters },
      }));
    },

    getFilteredNotes: () => {
      const { notes, filters } = get();
      let filtered = [...notes];

      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (note) =>
            note.title.toLowerCase().includes(term) ||
            note.content.toLowerCase().includes(term) ||
            note.tags.some((tag) => tag.toLowerCase().includes(term)),
        );
      }

      if (
        filters.selectedSubject &&
        filters.selectedSubject !== "All Subjects"
      ) {
        filtered = filtered.filter(
          (note) => note.subject === filters.selectedSubject,
        );
      }

      if (filters.selectedTag && filters.selectedTag !== "All Tags") {
        filtered = filtered.filter((note) =>
          note.tags.includes(filters.selectedTag),
        );
      }

      if (filters.showPinned) {
        filtered = filtered.filter((note) => note.isPinned);
      }

      filtered.sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;

        switch (filters.sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "date":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "updated":
          default:
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
        }
      });

      return filtered;
    },

    getNotesBySubject: (subject: string) => {
      return get().notes.filter((note) => note.subject === subject);
    },

    getNotesByTopic: (topic: string) => {
      return get().notes.filter((note) => note.topic === topic);
    },

    getAllTags: () => {
      const tags = new Set<string>();
      get().notes.forEach((note) => {
        note.tags.forEach((tag) => tags.add(tag));
      });
      return Array.from(tags).sort();
    },

    getAllSubjects: () => {
      const subjects = new Set(get().notes.map((note) => note.subject));
      return Array.from(subjects).sort();
    },
  }),
  {
    name: "notes-storage",
  },
);
