import { useState } from "react";
import { FaPlus, FaSearch, FaFilter, FaThumbtack } from "react-icons/fa";
import { notesStore } from "@/stores/notesStore";
import { StudyNote } from "@/types/notes";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import EmptyState from "@/components/common/EmptyState";
import NoteCard from "@/components/notes/NoteCard";
import NoteEditor from "@/components/notes/NoteEditor";
import NotesFilters from "@/components/notes/NotesFilters";

const NotesPage = () => {
  const {
    getFilteredNotes,
    filters,
    setFilters,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    getAllSubjects,
    getAllTags,
  } = notesStore();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotes = getFilteredNotes();
  const subjects = getAllSubjects();

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (noteId: string) => {
    setEditingNote(noteId);
    setIsEditorOpen(true);
  };

  const handleSaveNote = (
    noteData: Omit<StudyNote, "id" | "createdAt" | "updatedAt">,
  ) => {
    if (editingNote) {
      updateNote(editingNote, noteData);
    } else {
      addNote(noteData);
    }
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
              Study Notes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and organize your study materials
            </p>
          </div>
          <Button
            onClick={handleCreateNote}
            variant="primary"
            size="lg"
            icon={FaPlus}
            className="shadow-lg transition-shadow hover:shadow-xl"
          >
            New Note
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredNotes.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Notes
            </p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {subjects.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Subjects</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {filteredNotes.filter((n) => n.isPinned).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pinned</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getAllTags().length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tags</p>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <FaSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes by title, content, or tags..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ searchTerm: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setFilters({ showPinned: !filters.showPinned })}
              variant={filters.showPinned ? "primary" : "secondary"}
              icon={FaThumbtack}
              className="shadow-sm"
            >
              {filters.showPinned ? "Show All" : "Pinned Only"}
            </Button>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="secondary"
              icon={FaFilter}
              className="shadow-sm"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 p-4 shadow-md">
            <NotesFilters />
          </Card>
        )}

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <EmptyState
            title="No notes found"
            message={
              filters.searchTerm || filters.selectedSubject !== "All Subjects"
                ? "Try adjusting your filters to see more notes"
                : "Create your first study note to get started"
            }
            actionLabel="Create Note"
            onAction={handleCreateNote}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => handleEditNote(note.id)}
                onDelete={() => deleteNote(note.id)}
                onTogglePin={() => togglePin(note.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Note Editor Modal */}
      {isEditorOpen && (
        <NoteEditor
          noteId={editingNote}
          onSave={handleSaveNote}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingNote(null);
          }}
          availableSubjects={subjects}
        />
      )}
    </div>
  );
};

export default NotesPage;
