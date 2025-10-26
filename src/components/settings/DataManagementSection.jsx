import { FaDownload, FaTrash, FaUpload } from 'react-icons/fa'

const DataManagementSection = ({ onExport, onImport, onClearData }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Data Management
      </h2>
      <div className="space-y-3">
        <button
          onClick={onExport}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <FaDownload className="h-4 w-4" />
          Export Data
        </button>
        <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700">
          <FaUpload className="h-4 w-4" />
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
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700"
        >
          <FaTrash className="h-4 w-4" />
          Clear All Data
        </button>
      </div>
    </div>
  )
}

export default DataManagementSection
