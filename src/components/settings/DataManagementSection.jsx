import {
  FaDownload,
  FaTrash,
  FaUpload,
  FaCloudDownloadAlt,
  FaHistory,
  FaExclamationTriangle,
  FaDatabase,
  FaShieldAlt,
} from 'react-icons/fa'
import Button from '@/components/common/Button'

const DataManagementSection = ({ onExport, onImport, onClearData }) => {
  const handleExportSettings = () => {
    const settingsOnly = { ...window.localStorage }
    const dataStr = JSON.stringify(settingsOnly, null, 2)
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `mocktest-settings-${new Date().toISOString().split('T')[0]}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleExportAll = () => {
    onExport()
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <FaCloudDownloadAlt className="h-5 w-5 text-blue-500" />
          Backup & Export
        </h3>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Create backups of your data to prevent loss and easily restore your
          progress
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <FaDatabase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  Complete Backup
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Settings + all test attempts
                </p>
              </div>
            </div>
            <Button
              onClick={handleExportAll}
              variant="primary"
              className="w-full"
              icon={FaDownload}
              size="sm"
            >
              Export Complete Backup
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <FaShieldAlt className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  Settings Only
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Preferences & configuration
                </p>
              </div>
            </div>
            <Button
              onClick={handleExportSettings}
              variant="success"
              className="w-full"
              icon={FaDownload}
              size="sm"
            >
              Export Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <FaHistory className="h-5 w-5 text-green-500" />
          Restore & Import
        </h3>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Restore your data from previous backups
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <FaExclamationTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                Important Note
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Importing will overwrite your current data. Make sure to create
                a backup first!
              </p>
            </div>
          </div>

          <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-colors hover:bg-purple-700">
            <FaUpload className="h-4 w-4" />
            Import Backup File
            <input
              type="file"
              accept=".json"
              onChange={onImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <FaTrash className="h-5 w-5 text-red-500" />
          Data Management
        </h3>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Manage your data and reset your progress if needed
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                Storage Used
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {(JSON.stringify(localStorage).length / 1024).toFixed(1)} KB
              </div>
            </div>

            <button
              onClick={onClearData}
              className="flex w-full items-center justify-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
            >
              <FaTrash className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Clear All Data</div>
                <div className="text-xs opacity-75">Delete everything</div>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              What gets deleted?
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• All completed test attempts and scores</li>
              <li>• Performance history and analytics</li>
              <li>• Personal settings and preferences</li>
              <li>• Streak data and achievements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataManagementSection
