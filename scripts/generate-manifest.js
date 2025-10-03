#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '..', 'public', 'data')
const MANIFEST_PATH = path.join(DATA_DIR, 'exams_manifest.json')
const EXAM_TYPES = ['full-tests', 'subject-tests', 'topic-tests']

function getJsonFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...getJsonFiles(fullPath))
    } else if (item.endsWith('.json') && !item.startsWith('.')) {
      files.push(fullPath)
    }
  }
  return files
}

function extractExamMetadata(filePath, examType) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const exam = JSON.parse(content)
    const relativePath = path.relative(DATA_DIR, filePath).replace(/\\/g, '/')
    const fileName = path.basename(filePath, '.json')
    const pathParts = relativePath.split('/')
    const category = (pathParts[1] || 'general').toLowerCase()
    const publicPath = 'data/' + relativePath
    
    const strength = exam.difficulty || exam.strength || exam.exam_strength || 'medium'
    const normalizedStrength = strength.toLowerCase()
    
    return {
      id: exam.id || exam.exam_id || fileName,
      name: exam.name || exam.exam_name || fileName.replace(/_/g, ' '),
      path: publicPath,
      exam_type: examType.replace('-', '_'),
      category,
      subject: exam.subject || 'General',
      topic: exam.topic || null,
      difficulty: normalizedStrength,
      duration_minutes: exam.duration_minutes || 60,
      total_marks: exam.total_marks || calculateTotalMarks(exam),
      total_questions: exam.total_questions || calculateTotalQuestions(exam),
      description: exam.description || `${exam.name || exam.exam_name || fileName} exam`,
      tags: exam.tags || [],
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return null
  }
}

function calculateTotalMarks(exam) {
  if (!exam.sections || !Array.isArray(exam.sections)) return 0
  return exam.sections.reduce((total, section) => {
    if (!section.questions || !Array.isArray(section.questions)) return total
    const sectionMarks = section.questions.reduce((sum, q) => sum + (q.marks || 1), 0)
    return total + sectionMarks
  }, 0)
}

function calculateTotalQuestions(exam) {
  if (!exam.sections || !Array.isArray(exam.sections)) return 0
  return exam.sections.reduce((total, section) => total + (section.questions?.length || 0), 0)
}

function extractSubjectFromName(name) {
  return 'General'
}

function generateManifest() {
  console.log('🔍 Scanning exam directories...\n')
  const manifest = { full_tests: [], subject_tests: [], topic_tests: [], generated_at: new Date().toISOString(), version: '1.0.0' }
  let totalExams = 0
  
  for (const examType of EXAM_TYPES) {
    const examDir = path.join(DATA_DIR, examType)
    const jsonFiles = getJsonFiles(examDir)
    console.log(`📁 ${examType}: Found ${jsonFiles.length} files`)
    const exams = jsonFiles.map(file => extractExamMetadata(file, examType)).filter(exam => exam !== null)
    const manifestKey = examType.replace('-', '_')
    manifest[manifestKey] = exams
    totalExams += exams.length
    exams.forEach(exam => console.log(`  ✓ ${exam.name} (${exam.category})`))
    console.log('')
  }
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
  console.log('✅ Manifest generated successfully!')
  console.log(`📊 Total exams: ${totalExams}`)
  console.log(`📄 Output: ${MANIFEST_PATH}\n`)
  console.log(`Summary:\n  Full Tests: ${manifest.full_tests.length}\n  Subject Tests: ${manifest.subject_tests.length}\n  Topic Tests: ${manifest.topic_tests.length}`)
}

try {
  generateManifest()
} catch (error) {
  console.error('❌ Error generating manifest:', error.message)
  process.exit(1)
}
