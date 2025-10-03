/**
 * External Exam Source Manager
 * Handles loading exams from external URLs
 */

const SOURCES_KEY = 'exam_sources'
const DEFAULT_SOURCE = {
  id: 'local',
  name: 'Local Storage',
  type: 'local',
  enabled: true,
  priority: 1,
}

export function getExamSources() {
  try {
    const sourcesJson = localStorage.getItem(SOURCES_KEY)
    const sources = sourcesJson ? JSON.parse(sourcesJson) : [DEFAULT_SOURCE]
    
    // Ensure default source exists
    if (!sources.find(s => s.id === 'local')) {
      sources.unshift(DEFAULT_SOURCE)
    }
    
    return sources.sort((a, b) => (a.priority || 999) - (b.priority || 999))
  } catch (error) {
    console.error('Error loading exam sources:', error)
    return [DEFAULT_SOURCE]
  }
}

export function saveExamSources(sources) {
  try {
    localStorage.setItem(SOURCES_KEY, JSON.stringify(sources))
    return true
  } catch (error) {
    console.error('Error saving exam sources:', error)
    return false
  }
}

export function addExamSource(source) {
  const sources = getExamSources()
  
  // Validate source
  if (!source.name || !source.url) {
    throw new Error('Source must have name and URL')
  }
  
  // Generate ID if not provided
  if (!source.id) {
    source.id = `source_${Date.now()}`
  }
  
  // Check for duplicates
  if (sources.find(s => s.id === source.id)) {
    throw new Error('Source with this ID already exists')
  }
  
  const newSource = {
    id: source.id,
    name: source.name,
    type: 'remote',
    url: source.url,
    enabled: source.enabled !== false,
    priority: source.priority || sources.length + 1,
    addedAt: new Date().toISOString(),
  }
  
  sources.push(newSource)
  saveExamSources(sources)
  
  return newSource
}

export function updateExamSource(id, updates) {
  const sources = getExamSources()
  const index = sources.findIndex(s => s.id === id)
  
  if (index === -1) {
    throw new Error('Source not found')
  }
  
  // Don't allow changing ID or type of local source
  if (id === 'local' && (updates.id || updates.type)) {
    throw new Error('Cannot modify local source ID or type')
  }
  
  sources[index] = { ...sources[index], ...updates }
  saveExamSources(sources)
  
  return sources[index]
}

export function deleteExamSource(id) {
  if (id === 'local') {
    throw new Error('Cannot delete local source')
  }
  
  const sources = getExamSources()
  const filtered = sources.filter(s => s.id !== id)
  
  saveExamSources(filtered)
  return true
}

export function toggleExamSource(id) {
  const sources = getExamSources()
  const source = sources.find(s => s.id === id)
  
  if (!source) {
    throw new Error('Source not found')
  }
  
  source.enabled = !source.enabled
  saveExamSources(sources)
  
  return source
}

/**
 * Fetch manifest from a remote source
 */
export async function fetchRemoteManifest(url) {
  try {
    // Support both direct manifest URLs and base URLs
    const manifestUrl = url.endsWith('.json') ? url : `${url}/exams_manifest.json`
    
    const response = await fetch(manifestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache', // Always get fresh data
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const manifest = await response.json()
    
    // Validate manifest structure
    if (!manifest.full_tests && !manifest.subject_tests && !manifest.topic_tests) {
      throw new Error('Invalid manifest structure')
    }
    
    return manifest
  } catch (error) {
    console.error('Error fetching remote manifest:', error)
    throw new Error(`Failed to fetch manifest: ${error.message}`)
  }
}

/**
 * Fetch exam data from remote source
 */
export async function fetchRemoteExam(baseUrl, examPath) {
  try {
    const examUrl = baseUrl.endsWith('/') ? `${baseUrl}${examPath}` : `${baseUrl}/${examPath}`
    
    const response = await fetch(examUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const examData = await response.json()
    return examData
  } catch (error) {
    console.error('Error fetching remote exam:', error)
    throw new Error(`Failed to fetch exam: ${error.message}`)
  }
}

/**
 * Get combined manifest from all enabled sources
 */
export async function getCombinedManifest() {
  const sources = getExamSources().filter(s => s.enabled)
  const manifests = []
  
  for (const source of sources) {
    try {
      if (source.type === 'local') {
        // Fetch local manifest
        const response = await fetch('/data/exams_manifest.json')
        const manifest = await response.json()
        manifests.push({
          source: source,
          manifest: manifest,
          error: null,
        })
      } else if (source.type === 'remote') {
        // Fetch remote manifest
        const manifest = await fetchRemoteManifest(source.url)
        manifests.push({
          source: source,
          manifest: manifest,
          error: null,
        })
      }
    } catch (error) {
      console.error(`Error loading manifest from ${source.name}:`, error)
      manifests.push({
        source: source,
        manifest: null,
        error: error.message,
      })
    }
  }
  
  return manifests
}

/**
 * Merge manifests from multiple sources
 */
export function mergeManifests(manifestsData) {
  const combined = {
    full_tests: [],
    subject_tests: [],
    topic_tests: [],
    sources: [],
  }
  
  for (const { source, manifest, error } of manifestsData) {
    if (error || !manifest) {
      combined.sources.push({
        id: source.id,
        name: source.name,
        status: 'error',
        error: error,
      })
      continue
    }
    
    // Add source info to each exam
    const addSourceInfo = (exam) => ({
      ...exam,
      _source: {
        id: source.id,
        name: source.name,
        type: source.type,
        url: source.url,
      },
    })
    
    // Merge exams with source information
    if (manifest.full_tests) {
      combined.full_tests.push(...manifest.full_tests.map(addSourceInfo))
    }
    if (manifest.subject_tests) {
      combined.subject_tests.push(...manifest.subject_tests.map(addSourceInfo))
    }
    if (manifest.topic_tests) {
      combined.topic_tests.push(...manifest.topic_tests.map(addSourceInfo))
    }
    
    combined.sources.push({
      id: source.id,
      name: source.name,
      status: 'success',
      count: {
        full_tests: manifest.full_tests?.length || 0,
        subject_tests: manifest.subject_tests?.length || 0,
        topic_tests: manifest.topic_tests?.length || 0,
      },
    })
  }
  
  return combined
}
