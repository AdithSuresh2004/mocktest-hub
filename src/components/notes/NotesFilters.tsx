import { notesStore } from "@/stores/notesStore";

const NotesFilters = () => {
  const { filters, setFilters, getAllSubjects, getAllTags } = notesStore();
  const subjects = getAllSubjects();
  const tags = getAllTags();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Subject
        </label>
        <select
          value={filters.selectedSubject}
          onChange={(e) => setFilters({ selectedSubject: e.target.value })}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option>All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tag
        </label>
        <select
          value={filters.selectedTag}
          onChange={(e) => setFilters({ selectedTag: e.target.value })}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option>All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({
              sortBy: e.target.value as "date" | "title" | "updated",
            })
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="updated">Last Updated</option>
          <option value="date">Creation Date</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default NotesFilters;
