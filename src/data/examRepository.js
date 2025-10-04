import { getJSON } from '@/api/http'
import { 
  getCombinedManifest, 
  mergeManifests, 
  fetchRemoteExam,
  getExamSources,
} from '@/data/examSourceManager'

// Cache for manifest to avoid repeated fetches
let manifestCache = null
let manifestCacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Cache for exam data
const examCache = new Map()

export async function getManifest(forceRefresh = false) {
  const now = Date.now()
  
  // Return cached manifest if still valid
  if (!forceRefresh && manifestCache && (now - manifestCacheTime) < CACHE_DURATION) {
    return manifestCache
  }
  
  try {
    // Get manifests from all enabled sources
    const manifestsData = await getCombinedManifest()
    const merged = mergeManifests(manifestsData)
    
    manifestCache = merged
    manifestCacheTime = now
    return merged
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to load manifest:', error)
    }
    
    // Fallback: try served local manifest, then localStorage generated manifest, then cached manifest
    try {
      const data = await getJSON('/data/exams_manifest.json')
      manifestCache = data
      manifestCacheTime = now
      return data
    } catch (fallbackError) {
      try {
        const localCached = localStorage.getItem('local_exams_manifest')
        if (localCached) {
          const parsed = JSON.parse(localCached)
          manifestCache = parsed
          manifestCacheTime = now
          return parsed
        }
      } catch (lsErr) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load local_exams_manifest from localStorage:', lsErr)
        }
      }

      // Return cached data if available, even if expired
      if (manifestCache) {
        return manifestCache
      }

      // Return empty structure as the final fallback
      return { full_tests: [], subject_tests: [], topic_tests: [] }
    }
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
    
    const examEntry = allExams.find((exam) => exam.id === examId || exam.exam_id === examId)
    if (!examEntry) {
      throw new Error(
        `Exam not found. Please check the exam ID and try again.`,
      )
    }
    
    // Determine how to load exam based on source
    let examData
    
    const examPath = examEntry.path || examEntry.file
    if (!examPath) {
      throw new Error('Exam path is missing')
    }

    // If entry explicitly marks remote and provides a URL, try it first
    if (examEntry._source && examEntry._source.type === 'remote' && examEntry._source.url) {
      try {
        examData = await fetchRemoteExam(examEntry._source.url, examPath)
      } catch (err) {
        // continue to try other remote sources
        examData = null
      }
    }

    // If we still don't have examData, try all enabled remote sources as a fallback
    if (!examData) {
      const sources = getExamSources().filter(s => s.enabled && s.type === 'remote')
      for (const src of sources) {
        try {
          examData = await fetchRemoteExam(src.url, examPath)
          // set the source info for the examEntry
          examEntry._source = { id: src.id, name: src.name, type: 'remote', url: src.url }
          break
        } catch (err) {
          // try next source
          examData = null
        }
      }
    }

    // Finally fallback to local served file
    if (!examData) {
      const fullPath = examPath.startsWith('/') ? examPath : `/${examPath}`
      examData = await getJSON(fullPath)
    }
    
    const mergedData = {
      ...examData,
      id: examData.exam_id || examData.id || examEntry.id,
      exam_id: examData.exam_id || examData.id || examEntry.id,
      name: examData.exam_name || examData.name || examEntry.name,
      exam_name: examData.exam_name || examData.name || examEntry.name,
      duration_minutes: examData.duration_minutes || examEntry.duration_minutes,
      total_marks: examData.total_marks || examEntry.total_marks,
      total_questions: examData.total_questions || examEntry.total_questions,
      difficulty: examData.exam_strength || examData.difficulty || examEntry.difficulty,
      exam_strength: examData.exam_strength || examData.difficulty || examEntry.difficulty,
      category: examEntry.category || examData.category,
      subjects: examEntry.subjects || (examEntry.subject ? [examEntry.subject] : []),
      topics: examEntry.topics || (examEntry.topic ? [examEntry.topic] : []),
      _source: examEntry._source,
    }
    
    // Cache the merged data
    examCache.set(examId, mergedData)
    
    return mergedData
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error loading exam ${examId}:`, err)
    }
    throw new Error(err.message || 'Failed to load exam data. Please try again.')
  }
}

// Clear caches (useful for refresh or logout)
export function clearExamCache() {
  manifestCache = null
  manifestCacheTime = 0
  examCache.clear()
}
