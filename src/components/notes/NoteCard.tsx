import { FaEdit, FaTrash, FaThumbtack, FaTag } from "react-icons/fa";
import { StudyNote } from "@/types/notes";
import { formatDistance } from "date-fns";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

interface NoteCardProps {
  note: StudyNote;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }: NoteCardProps) => {
  const lastUpdated = formatDistance(new Date(note.updatedAt), new Date(), {
    addSuffix: true,
  });

  const bgColor = note.color || "bg-white dark:bg-gray-800";

  return (
    <Card
      className={`relative flex h-full flex-col ${bgColor} transition-transform hover:scale-105`}
    >
      {note.isPinned && (
        <div className="absolute top-2 right-2">
          <FaThumbtack className="h-4 w-4 text-yellow-500" />
        </div>
      )}

      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
            {note.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {note.subject} {note.topic && `• ${note.topic}`}
          </p>
        </div>
      </div>

      <div className="mb-4 line-clamp-4 flex-1 text-sm text-gray-700 dark:text-gray-300">
        {note.content}
      </div>

      {note.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              <FaTag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {lastUpdated}
        </span>
        <div className="flex gap-2">
          <Button
            onClick={onTogglePin}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title={note.isPinned ? "Unpin" : "Pin"}
          >
            <FaThumbtack
              className={`h-4 w-4 ${note.isPinned ? "text-yellow-500" : "text-gray-400"}`}
            />
          </Button>
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Edit"
          >
            <FaEdit className="h-4 w-4 text-blue-500" />
          </Button>
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Delete"
          >
            <FaTrash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NoteCard;
