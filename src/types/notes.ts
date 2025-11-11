export interface StudyNote {
  id: string;
  subject: string;
  topic?: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  color?: string;
}

export interface NotesFilters {
  searchTerm: string;
  selectedSubject: string;
  selectedTag: string;
  sortBy: "date" | "title" | "updated";
  showPinned: boolean;
}
