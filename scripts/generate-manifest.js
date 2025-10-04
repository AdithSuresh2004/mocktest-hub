#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '..', 'public', 'data')
const MANIFEST_PATH = path.join(DATA_DIR, 'exams_manifest.json')

function getAllJsonFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files
  const items = fs.readdirSync(dir)
  for (const item of items) {
    if (item === 'exams_manifest.json') continue
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath))
    } else if (item.endsWith('.json') && !item.startsWith('.')) {
      files.push(fullPath)
    }
  }
  return files
}

function extractExamMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const exam = JSON.parse(content)
    
    const relativePath = path.relative(DATA_DIR, filePath).replace(/\\/g, '/')
    const fileName = path.basename(filePath, '.json')
    const publicPath = 'data/' + relativePath
    
    const pathParts = relativePath.split('/')
    const folderName = pathParts[0] || 'general'
    const category = (exam.category || folderName).toLowerCase()
    
    const examType = exam.exam_type || exam.type || detectExamType(exam, pathParts)
    
    const strength = exam.difficulty || exam.strength || exam.exam_strength || 'medium'
    const normalizedStrength = strength.toLowerCase()
    
    return {
      id: exam.id || exam.exam_id || fileName,
      name: exam.name || exam.exam_name || fileName.replace(/_/g, ' '),
      path: publicPath,
      exam_type: examType,
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

function detectExamType(exam, pathParts) {
  if (exam.sections && exam.sections.length > 3) return 'full_tests'
  
  for (const part of pathParts) {
    const lower = part.toLowerCase()
    if (lower.includes('full') || lower.includes('mock')) return 'full_tests'
    if (lower.includes('subject')) return 'subject_tests'
    if (lower.includes('topic')) return 'topic_tests'
  }
  
  if (exam.total_questions >= 50) return 'full_tests'
  if (exam.subject && !exam.topic) return 'subject_tests'
  if (exam.topic) return 'topic_tests'
  
  return 'full_tests'
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
  console.log('🔍 Scanning exam directories recursively...\n')
  const manifest = { full_tests: [], subject_tests: [], topic_tests: [], generated_at: new Date().toISOString(), version: '1.0.0' }
  
  const allJsonFiles = getAllJsonFiles(DATA_DIR)
  console.log(`📁 Found ${allJsonFiles.length} exam files total\n`)
  
  const examsByType = { full_tests: [], subject_tests: [], topic_tests: [] }
  
  for (const filePath of allJsonFiles) {
    const exam = extractExamMetadata(filePath)
    if (exam) {
      const typeKey = exam.exam_type
      if (examsByType[typeKey]) {
        examsByType[typeKey].push(exam)
        console.log(`  ✓ ${exam.name} [${typeKey}] (${exam.category})`)
      }
    }
  }
  
  manifest.full_tests = examsByType.full_tests
  manifest.subject_tests = examsByType.subject_tests
  manifest.topic_tests = examsByType.topic_tests
  
  const totalExams = manifest.full_tests.length + manifest.subject_tests.length + manifest.topic_tests.length
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
  console.log('\n✅ Manifest generated successfully!')
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
