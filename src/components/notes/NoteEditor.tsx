import { useState } from "react";
import { FaTimes, FaSave, FaTag, FaPalette } from "react-icons/fa";
import { notesStore } from "@/stores/notesStore";
import { StudyNote } from "@/types/notes";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

interface NoteEditorProps {
  noteId: string | null;
  onSave: (noteData: Omit<StudyNote, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
  availableSubjects: string[];
}

const NOTE_COLORS = [
  { name: "White", class: "bg-white dark:bg-gray-800" },
  { name: "Blue", class: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Green", class: "bg-green-50 dark:bg-green-900/20" },
  { name: "Yellow", class: "bg-yellow-50 dark:bg-yellow-900/20" },
  { name: "Purple", class: "bg-purple-50 dark:bg-purple-900/20" },
  { name: "Pink", class: "bg-pink-50 dark:bg-pink-900/20" },
];

const NoteEditor = ({
  noteId,
  onSave,
  onClose,
  availableSubjects,
}: NoteEditorProps) => {
  const { notes } = notesStore();
  const existingNote = noteId ? notes.find((n) => n.id === noteId) : null;

  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");
  const [subject, setSubject] = useState(existingNote?.subject || "");
  const [topic, setTopic] = useState(existingNote?.topic || "");
  const [tags, setTags] = useState<string[]>(existingNote?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [color, setColor] = useState(
    existingNote?.color || "bg-white dark:bg-gray-800",
  );
  const [isPinned, setIsPinned] = useState(existingNote?.isPinned || false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !subject.trim() || !content.trim()) return;

    onSave({
      title: title.trim(),
      subject: subject.trim(),
      topic: topic.trim() || undefined,
      content: content.trim(),
      tags,
      color,
      isPinned,
    });
  };

  const isValid = title.trim() && subject.trim() && content.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {noteId ? "Edit Note" : "New Note"}
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            icon={FaTimes}
            className="h-8 w-8 p-0"
          ></Button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                list="subjects"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <datalist id="subjects">
                {availableSubjects.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Topic (Optional)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notes here..."
              rows={10}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaTag className="mr-2 inline h-4 w-4" />
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="Add tag..."
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              <Button onClick={handleAddTag} variant="secondary">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                    <Button
                      onClick={() => handleRemoveTag(tag)}
                      variant="ghost"
                      size="sm"
                      className="h-5 min-h-0 w-5 min-w-0 p-0 hover:text-blue-600 dark:hover:text-blue-400"
                      icon={FaTimes}
                      aria-label={`Remove tag ${tag}`}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaPalette className="mr-2 inline h-4 w-4" />
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {NOTE_COLORS.map((c) => (
                <Button
                  key={c.name}
                  onClick={() => setColor(c.class)}
                  variant="ghost"
                  size="sm"
                  className={`h-10 min-h-0 w-10 min-w-0 rounded-lg border-2 p-0 ${c.class} ${
                    color === c.class
                      ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label={`Select color ${c.name}`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="pinned"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pin this note
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="primary"
            disabled={!isValid}
            icon={FaSave}
          >
            Save Note
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NoteEditor;
