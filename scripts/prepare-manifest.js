import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { execSync } from 'child_process'

const sentinel = path.resolve(process.cwd(), '.manifest_prepared')
const manifestGenerator = path.resolve(process.cwd(), 'scripts', 'generate-manifest.js')

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans) }))
}

async function runGenerate() {
  console.log('Running local manifest generator...')
  try {
    execSync(`node "${manifestGenerator}"`, { stdio: 'inherit' })
    console.log('Local manifest generation finished.')
  } catch (e) {
    console.error('Failed to generate manifest:', e.message)
  }
}

async function runFetchAndMerge(url) {
  console.log(`Fetching manifest from ${url}...`)
  try {
    const res = execSync(`node scripts/fetch-and-save-manifest.js "${url}"`, { stdio: 'inherit' })
    console.log('Fetch script finished.')
  } catch (e) {
    console.error('Failed to fetch manifest:', e.message)
  }
}

async function main() {
  if (fs.existsSync(sentinel)) {
    console.log('Manifest already prepared on this machine. To run again, use: npm run manifest:regen')
    return
  }

  console.log('No local manifest found (first-time setup). Choose an option:')
  console.log('  1) Generate from local public/data files')
  console.log('  2) Provide a remote URL to fetch and merge')
  const ans = await ask('Select (1 or 2): ')
  if (ans.trim() === '1') {
    await runGenerate()
  } else if (ans.trim() === '2') {
    const url = await ask('Enter the base URL or direct manifest URL: ')
    if (!url || !url.trim()) {
      console.log('No URL provided; aborting.')
      return
    }
    await runFetchAndMerge(url.trim())
  } else {
    console.log('Invalid selection; aborting.')
    return
  }

  try {
    fs.writeFileSync(sentinel, `prepared:${new Date().toISOString()}`)
    console.log('Marked as prepared. Re-run with npm run manifest:regen to regenerate or fetch again.')
  } catch (e) {
    console.warn('Could not write sentinel file:', e.message)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
