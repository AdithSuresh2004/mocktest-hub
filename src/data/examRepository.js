import { getJSON } from '@/api/http'
import { CACHE_DURATION, STORAGE_KEYS } from '@/constants/testConfig'
import StorageManager from '@/utils/storage'

let manifestCache = null
let manifestCacheTime = 0
const examCache = new Map()

export async function getManifest(forceRefresh = false) {
  const now = Date.now()
  if (
    !forceRefresh &&
    manifestCache &&
    now - manifestCacheTime < CACHE_DURATION.MANIFEST
  ) {
    return manifestCache
  }
  try {
    const data = await getJSON('/data/exams_manifest.json')
    manifestCache = data
    manifestCacheTime = now
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
  }
}

export async function findExamById(examId) {
  if (!examId || examId === 'undefined' || examId === 'null') {
    throw new Error('Invalid exam ID. Please select a valid exam.')
  }
  if (examCache.has(examId)) {
    return examCache.get(examId)
  }
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
  }
}

export function clearExamCache() {
  manifestCache = null
  manifestCacheTime = 0
  examCache.clear()
}
