#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const arg = process.argv[2]
if (!arg) {
  console.error('Usage: node scripts/fetch-and-save-manifest.js <manifest-or-base-url>')
  process.exit(1)
}

const url = arg.endsWith('.json') ? arg : `${arg.replace(/\/$/, '')}/exams_manifest.json`
const outPath = path.join(process.cwd(), 'public', 'data', 'exams_manifest.json')

async function getFetch() {
  if (typeof fetch !== 'undefined') return fetch
  try {
    const mod = await import('node-fetch')
    return mod.default || mod
  } catch (e) {
    throw new Error('fetch is not available and node-fetch could not be imported')
  }
}

function normalizeKey(exam) {
  if (!exam) return ''
  const id = exam.id || exam.exam_id || ''
  const p = (exam.path || exam.file || '')
  const name = (exam.name || exam.exam_name || '').toString().toLowerCase().replace(/\s+/g, '_')
  return id || p || name
}

async function run() {
  try {
    const fetchFn = await getFetch()
    console.log('Fetching remote manifest from', url)
    const res = await fetchFn(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
    const remote = await res.json()

    let local = null
    if (fs.existsSync(outPath)) {
      try {
        local = JSON.parse(fs.readFileSync(outPath, 'utf-8'))
      } catch (e) {
        console.warn('Existing local manifest found but failed to parse, ignoring local manifest')
        local = null
      }
    }

    const combined = { full_tests: [], subject_tests: [], topic_tests: [], generated_at: new Date().toISOString(), version: remote.version || (local && local.version) || '1.0.0' }

    const types = ['full_tests', 'subject_tests', 'topic_tests']

    for (const t of types) {
      const map = new Map()
      const localArr = (local && Array.isArray(local[t])) ? local[t] : []
      const remoteArr = (remote && Array.isArray(remote[t])) ? remote[t] : []

      for (const ex of localArr) {
        map.set(normalizeKey(ex), ex)
      }

      for (const ex of remoteArr) {
        const key = normalizeKey(ex)
        if (!map.has(key)) {
          map.set(key, ex)
        }
      }

      combined[t] = Array.from(map.values())
    }

    const dir = path.dirname(outPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outPath, JSON.stringify(combined, null, 2), 'utf-8')
    console.log('Saved combined manifest to', outPath)
    console.log(`Summary: Full:${combined.full_tests.length} Subject:${combined.subject_tests.length} Topic:${combined.topic_tests.length}`)
  } catch (err) {
    console.error('Failed to fetch and merge manifest:', err.message)
    process.exit(2)
  }
}

run()
