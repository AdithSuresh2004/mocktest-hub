import { FaDownload, FaUpload, FaTrash } from "react-icons/fa";
export default function DataManagementSection({ onExport, onImport, onClearData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Data Management
      </h2>
      <div className="space-y-3">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <FaDownload className="w-4 h-4" />
          Export Data
        </button>
        <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
          <FaUpload className="w-4 h-4" />
          Import Data
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            className="hidden"
          />
        </label>
        <button
          onClick={onClearData}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          <FaTrash className="w-4 h-4" />
          Clear All Data
        </button>
      </div>
    </div>
  );
}