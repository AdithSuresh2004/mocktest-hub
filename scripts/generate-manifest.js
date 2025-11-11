#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "public", "data");
const MANIFEST_PATH = path.join(DATA_DIR, "exams_manifest.json");
function getAllJsonFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item === "exams_manifest.json" || item === "exam_schema.json") continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllJsonFiles(fullPath));
    } else if (item.endsWith(".json") && !item.startsWith(".")) {
      files.push(fullPath);
    }
  }
  return files;
}
function extractExamMetadata(filePath) {
  try {
    const relativePath = path.relative(DATA_DIR, filePath).replace(/\\/g, "/");
    const publicPath = "data/" + relativePath;

    return publicPath;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

function generateManifest() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.warn(`Created missing data directory: ${DATA_DIR}`);
    } catch (err) {
      console.error(
        `Failed to create data directory ${DATA_DIR}:`,
        err.message,
      );
      process.exit(1);
    }
  }
  console.warn("🔍 Scanning exam directories recursively...\n");
  const manifest = [];
  const allJsonFiles = getAllJsonFiles(DATA_DIR);
  console.warn(`📁 Found ${allJsonFiles.length} exam files total\n`);

  for (const filePath of allJsonFiles) {
    const examPath = extractExamMetadata(filePath);
    if (examPath) {
      manifest.push(examPath);
      console.warn(`  ✓ ${examPath}`);
    }
  }

  const totalExams = manifest.length;
  try {
    const outDir = path.dirname(MANIFEST_PATH);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write manifest to", MANIFEST_PATH, err.message);
    process.exit(1);
  }
  console.warn("\n✅ Manifest generated successfully!");
  console.warn(`📊 Total exams: ${totalExams}`);
  console.warn(`📄 Output: ${MANIFEST_PATH}\n`);
}
try {
  generateManifest();
} catch (error) {
  console.error("❌ Error generating manifest:", error.message);
  process.exit(1);
}
