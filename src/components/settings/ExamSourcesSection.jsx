import { useState, useEffect } from 'react'
import { FaServer, FaPlus, FaCheckCircle, FaToggleOn, FaToggleOff } from 'react-icons/fa'

import {
  getExamSources,
  addExamSource,
  deleteExamSource,
  toggleExamSource,
  fetchRemoteManifest,
} from '@/data/examSourceManager'
import { clearExamCache } from '@/data/examRepository'
import { useToast } from '@/hooks/common/useToast'
export default function ExamSourcesSection() {
  const [sources, setSources] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSource, setNewSource] = useState({ name: '', url: '' })
  const [testing, setTesting] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const { addToast } = useToast()
  useEffect(() => {
    loadSources()
  }, [])
  const loadSources = () => {
    const loadedSources = getExamSources()
    setSources(loadedSources)
  }
  const handleAddSource = async () => {
    if (!newSource.name || !newSource.url) {
      addToast({
        type: 'error',
        message: 'Please provide both name and URL',
      })
      return
    }
    try {
      addExamSource(newSource)
      addToast({
        type: 'success',
        message: `Source "${newSource.name}" added successfully!`,
      })
      setNewSource({ name: '', url: '' })
      setShowAddForm(false)
      setTestResult(null)
      loadSources()
      clearExamCache()
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message,
      })
    }
  }
  const handleDeleteSource = (id) => {
    try {
      deleteExamSource(id)
      addToast({
        type: 'success',
        message: 'Source deleted successfully',
      })
      loadSources()
      clearExamCache()
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message,
      })
    }
  }
  const handleToggleSource = (id) => {
    try {
      toggleExamSource(id)
      addToast({
        type: 'success',
        message: 'Source updated',
      })
      loadSources()
      clearExamCache()
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message,
      })
    }
  }
  const handleTestConnection = async () => {
    if (!newSource.url) {
      addToast({
        type: 'error',
        message: 'Please enter a URL to test',
      })
      return
    }
    setTesting(true)
    setTestResult(null)
    try {
      const manifest = await fetchRemoteManifest(newSource.url)
      const totalExams =
        (manifest.full_tests?.length || 0) +
        (manifest.subject_tests?.length || 0) +
        (manifest.topic_tests?.length || 0)
      setTestResult({
        success: true,
        message: `Connection successful! Found ${totalExams} exams.`,
        details: {
          full_tests: manifest.full_tests?.length || 0,
          subject_tests: manifest.subject_tests?.length || 0,
          topic_tests: manifest.topic_tests?.length || 0,
        },
      })
      addToast({
        type: 'success',
        message: `Connection successful! Found ${totalExams} exams.`,
        duration: 4000,
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message,
      })
      addToast({
        type: 'error',
        message: `Connection failed: ${error.message}`,
        duration: 5000,
      })
    } finally {
      setTesting(false)
    }
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Exam Sources
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage local and remote exam sources
          </p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <FaPlus className="h-4 w-4" />
            Add Source
          </button>
        )}
      </div>
      {showAddForm && (
        <div className="mb-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
            Add New Exam Source
          </h4>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Source Name
              </label>
              <input
                type="text"
                value={newSource.name}
                onChange={(e) =>
                  setNewSource({ ...newSource, name: e.target.value })
                }
                placeholder="e.g., University Server, Cloud Storage"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL (Base URL or direct manifest URL)
              </label>
              <input
                type="url"
                value={newSource.url}
                onChange={(e) =>
                  setNewSource({ ...newSource, url: e.target.value })
                }
                placeholder="https://example.com/exams.json"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                💡 Supports CORS-enabled servers. Test the connection before
                adding.
              </p>
            </div>
            {testResult && (
              <div
                className={`rounded-lg p-3 ${
                  testResult.success
                    ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <FaCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  ) : (
                    <FaExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{testResult.message}</p>
                    {testResult.details && (
                      <div className="mt-2 text-xs">
                        <p>Full Tests: {testResult.details.full_tests}</p>
                        <p>Subject Tests: {testResult.details.subject_tests}</p>
                        <p>Topic Tests: {testResult.details.topic_tests}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleTestConnection}
                disabled={testing || !newSource.url}
                className="flex-1 rounded-lg border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
              <button
                onClick={handleAddSource}
                disabled={!testResult?.success}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Source
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setNewSource({ name: '', url: '' })
                  setTestResult(null)
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`flex items-center justify-between rounded-lg border-2 p-4 transition-all ${
              source.enabled
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10'
                : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white p-2 dark:bg-gray-700">
                {source.type === 'local' ? (
                  <FaServer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <FaGlobe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {source.name}
                </h4>
                {source.url && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {source.url}
                  </p>
                )}
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      source.enabled
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {source.enabled ? 'Active' : 'Disabled'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {source.type === 'local'
                      ? 'Local Storage'
                      : 'Remote Source'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleSource(source.id)}
                className="rounded-lg p-2 transition-colors hover:bg-white dark:hover:bg-gray-700"
                title={source.enabled ? 'Disable source' : 'Enable source'}
              >
                {source.enabled ? (
                  <FaToggleOn className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <FaToggleOff className="h-6 w-6 text-gray-400" />
                )}
              </button>
              {source.id !== 'local' && (
                <button
                  onClick={() => handleDeleteSource(source.id)}
                  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  title="Delete source"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {sources.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
            <FaServer className="mx-auto mb-2 h-12 w-12 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              No exam sources configured
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
