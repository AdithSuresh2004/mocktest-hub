import { getJSON } from '@/api/http'
import { CACHE_DURATION, STORAGE_KEYS } from '@/constants/testConfig'
import StorageManager from '@/utils/storage'

let manifestCache = null
let manifestCacheTime = 0
let manifestPromise = null
const examCache = new Map()
const examLoadingPromises = new Map()

export async function getManifest(forceRefresh = false) {
  const now = Date.now()
  
  if (manifestPromise && !forceRefresh) {
    return manifestPromise
  }
  
  if (
    !forceRefresh &&
    manifestCache &&
    now - manifestCacheTime < CACHE_DURATION.MANIFEST
  ) {
    return manifestCache
  }
  
  manifestPromise = (async () => {
    try {
      const data = await getJSON('/data/exams_manifest.json')
      manifestCache = data
      manifestCacheTime = now
      StorageManager.setItem(STORAGE_KEYS.MANIFEST, data)
      return data
    } catch {
      const cached = StorageManager.getItem(STORAGE_KEYS.MANIFEST)
      if (cached) {
        manifestCache = cached
        manifestCacheTime = now
        return cached
      }
      if (manifestCache) return manifestCache
      return { full_tests: [], subject_tests: [], topic_tests: [] }
    } finally {
      manifestPromise = null
    }
  })()
  
  return manifestPromise
}

export async function findExamById(examId) {
  if (!examId || examId === 'undefined' || examId === 'null') {
    throw new Error('Invalid exam ID. Please select a valid exam.')
  }
  
  if (examCache.has(examId)) {
    return examCache.get(examId)
  }
  
  if (examLoadingPromises.has(examId)) {
    return examLoadingPromises.get(examId)
  }
  
  const loadPromise = (async () => {
    try {
      const manifest = await getManifest()
      const allExams = [
        ...(manifest.full_tests || []),
        ...(manifest.topic_tests || []),
        ...(manifest.subject_tests || []),
      ]
      const examEntry = allExams.find(
        (exam) => exam.id === examId || exam.exam_id === examId
      )
      if (!examEntry) {
        throw new Error(`Exam not found. Please check the exam ID and try again.`)
      }
      const examPath = examEntry.path || examEntry.file
      if (!examPath) {
        throw new Error('Exam path is missing')
      }
      const fullPath = examPath.startsWith('/') ? examPath : `/${examPath}`
      const examData = await getJSON(fullPath)
      const mergedData = {
        ...examData,
        id: examData.exam_id || examData.id || examEntry.id,
        exam_id: examData.exam_id || examData.id || examEntry.id,
        name: examData.exam_name || examData.name || examEntry.name,
        exam_name: examData.exam_name || examData.name || examEntry.name,
        duration_minutes: examData.duration_minutes || examEntry.duration_minutes,
        total_marks: examData.total_marks || examEntry.total_marks,
        total_questions: examData.total_questions || examEntry.total_questions,
        difficulty:
          examData.exam_strength || examData.difficulty || examEntry.difficulty,
        exam_strength:
          examData.exam_strength || examData.difficulty || examEntry.difficulty,
        category: examEntry.category || examData.category,
        subjects:
          examEntry.subjects || (examEntry.subject ? [examEntry.subject] : []),
        topics: examEntry.topics || (examEntry.topic ? [examEntry.topic] : []),
      }
      examCache.set(examId, mergedData)
      return mergedData
    } catch (err) {
      throw new Error(
        err.message || 'Failed to load exam data. Please try again.'
      )
    } finally {
      examLoadingPromises.delete(examId)
    }
  })()
  
  examLoadingPromises.set(examId, loadPromise)
  return loadPromise
}

export function clearExamCache() {
  manifestCache = null
  manifestCacheTime = 0
  manifestPromise = null
  examCache.clear()
  examLoadingPromises.clear()
}

export function preloadExam(examId) {
  if (!examCache.has(examId) && !examLoadingPromises.has(examId)) {
    findExamById(examId).catch(() => {})
  }
}
