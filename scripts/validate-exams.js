#!/usr/bin/env node

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MANIFEST_PATH = join(__dirname, "../public/data/exams_manifest.json");
const DATA_DIR = join(__dirname, "../public/data");

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

class ExamValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  error(message) {
    this.errors.push(message);
    this.log(`  ❌ ERROR: ${message}`, "red");
  }

  warn(message) {
    this.warnings.push(message);
    this.log(`  ⚠️  WARNING: ${message}`, "yellow");
  }

  success(message) {
    this.log(`  ✅ ${message}`, "green");
  }

  validateRequired(obj, fields, path = "") {
    fields.forEach((field) => {
      if (!(field in obj)) {
        this.error(`Missing required field: ${path}.${field}`);
      }
    });
  }

  validateType(value, expectedType, path) {
    const actualType = Array.isArray(value) ? "array" : typeof value;

    if (expectedType === "integer") {
      if (!Number.isInteger(value)) {
        this.error(`${path} should be an integer, got: ${value}`);
      }
    } else if (expectedType === "number") {
      if (typeof value !== "number") {
        this.error(`${path} should be a number, got: ${typeof value}`);
      }
    } else if (actualType !== expectedType) {
      this.error(`${path} should be ${expectedType}, got: ${actualType}`);
    }
  }

  validateEnum(value, enumValues, path) {
    if (!enumValues.includes(value)) {
      this.error(
        `${path} should be one of [${enumValues.join(", ")}], got: ${value}`,
      );
    }
  }

  validateMarkingScheme(scheme, path = "marking_scheme") {
    if (!scheme) {
      this.error(`${path} is required`);
      return;
    }

    this.validateRequired(scheme, ["correct_answer"], path);

    if (scheme.correct_answer) {
      this.validateType(
        scheme.correct_answer,
        "number",
        `${path}.correct_answer`,
      );
    }

    if (scheme.incorrect_answer !== undefined) {
      this.validateType(
        scheme.incorrect_answer,
        "number",
        `${path}.incorrect_answer`,
      );
      if (scheme.incorrect_answer > 0) {
        this.warn(
          `${path}.incorrect_answer is positive (should typically be negative or zero)`,
        );
      }
    }

    if (scheme.unattempted !== undefined) {
      this.validateType(scheme.unattempted, "number", `${path}.unattempted`);
    }
  }

  validateOption(option, index, questionPath) {
    const path = `${questionPath}.options[${index}]`;

    this.validateRequired(option, ["opt_id", "text"], path);

    if (option.opt_id) {
      this.validateType(option.opt_id, "string", `${path}.opt_id`);
    }

    if (option.text) {
      this.validateType(option.text, "string", `${path}.text`);
      if (!option.text.trim()) {
        this.warn(`${path}.text is empty or whitespace only`);
      }
    }

    if (option.image !== undefined) {
      this.validateType(option.image, "string", `${path}.image`);
    }
  }

  validateQuestion(question, index, sectionPath) {
    const path = `${sectionPath}.questions[${index}]`;

    this.validateRequired(
      question,
      ["q_id", "text", "options", "correct_opt_id"],
      path,
    );

    if (question.q_id) {
      this.validateType(question.q_id, "string", `${path}.q_id`);
    }

    if (question.text) {
      this.validateType(question.text, "string", `${path}.text`);
      if (!question.text.trim()) {
        this.error(`${path}.text is empty or whitespace only`);
      }
    }

    if (question.image !== undefined) {
      this.validateType(question.image, "string", `${path}.image`);
    }

    if (question.options) {
      this.validateType(question.options, "array", `${path}.options`);

      if (question.options.length === 0) {
        this.error(`${path}.options array is empty`);
      }

      question.options.forEach((option, idx) => {
        this.validateOption(option, idx, path);
      });

      if (question.correct_opt_id) {
        const optionIds = question.options.map((o) => o.opt_id);
        if (!optionIds.includes(question.correct_opt_id)) {
          this.error(
            `${path}.correct_opt_id "${question.correct_opt_id}" not found in options`,
          );
        }
      }
    }

    if (question.difficulty !== undefined) {
      this.validateEnum(
        question.difficulty,
        ["easy", "medium", "hard"],
        `${path}.difficulty`,
      );
    }

    if (question.marks !== undefined) {
      if (typeof question.marks === "object") {
        this.validateType(
          question.marks.total,
          "integer",
          `${path}.marks.total`,
        );
      } else {
        this.validateType(question.marks, "integer", `${path}.marks`);
      }
    }
  }

  validateSection(section, index, examPath) {
    const path = `${examPath}.sections[${index}]`;

    this.validateRequired(
      section,
      ["section_id", "section_name", "questions"],
      path,
    );

    if (section.section_id) {
      this.validateType(section.section_id, "string", `${path}.section_id`);
    }

    if (section.section_name) {
      this.validateType(section.section_name, "string", `${path}.section_name`);
    }

    if (section.max_marks !== undefined) {
      this.validateType(section.max_marks, "integer", `${path}.max_marks`);
    }

    if (section.question_count !== undefined) {
      this.validateType(
        section.question_count,
        "integer",
        `${path}.question_count`,
      );
    }

    if (section.questions) {
      this.validateType(section.questions, "array", `${path}.questions`);

      if (section.questions.length === 0) {
        this.error(`${path}.questions array is empty`);
      }

      section.questions.forEach((question, idx) => {
        this.validateQuestion(question, idx, path);
      });

      if (
        section.question_count !== undefined &&
        section.question_count !== section.questions.length
      ) {
        this.warn(
          `${path}.question_count (${section.question_count}) doesn't match actual questions (${section.questions.length})`,
        );
      }
    }
  }

  validateExam(exam, filename) {
    this.log(`\n📝 Validating: ${filename}`, "cyan");

    this.validateRequired(
      exam,
      [
        "exam_id",
        "exam_name",
        "type",
        "category",
        "difficulty",
        "duration_minutes",
        "total_marks",
        "total_questions",
        "marking_scheme",
        "sections",
      ],
      filename,
    );

    if (exam.exam_id) this.validateType(exam.exam_id, "string", "exam_id");
    if (exam.exam_name)
      this.validateType(exam.exam_name, "string", "exam_name");

    if (exam.type) {
      this.validateEnum(
        exam.type,
        ["full_tests", "subject_tests", "topic_tests"],
        "type",
      );
    }

    if (exam.category) this.validateType(exam.category, "string", "category");
    if (exam.subject !== undefined)
      this.validateType(exam.subject, "string", "subject");

    if (exam.subjects) {
      this.validateType(exam.subjects, "array", "subjects");
      if (exam.subjects.length === 0) {
        this.warn("subjects array is empty");
      }
    }

    if (exam.topic !== undefined)
      this.validateType(exam.topic, "string", "topic");

    if (exam.topics) {
      this.validateType(exam.topics, "array", "topics");
    }

    if (exam.difficulty) {
      this.validateEnum(
        exam.difficulty,
        ["easy", "medium", "hard"],
        "difficulty",
      );
    }

    if (exam.duration_minutes) {
      this.validateType(exam.duration_minutes, "integer", "duration_minutes");
      if (exam.duration_minutes <= 0) {
        this.error("duration_minutes must be greater than 0");
      }
    }

    if (exam.total_marks) {
      this.validateType(exam.total_marks, "integer", "total_marks");
      if (exam.total_marks <= 0) {
        this.error("total_marks must be greater than 0");
      }
    }

    if (exam.total_questions) {
      this.validateType(exam.total_questions, "integer", "total_questions");
      if (exam.total_questions <= 0) {
        this.error("total_questions must be greater than 0");
      }
    }

    this.validateMarkingScheme(exam.marking_scheme);

    if (exam.sections) {
      this.validateType(exam.sections, "array", "sections");

      if (exam.sections.length === 0) {
        this.error("sections array is empty");
      }

      exam.sections.forEach((section, index) => {
        this.validateSection(section, index, filename);
      });

      const actualTotalQuestions = exam.sections.reduce(
        (sum, section) => sum + (section.questions?.length || 0),
        0,
      );

      if (exam.total_questions !== actualTotalQuestions) {
        this.error(
          `total_questions (${exam.total_questions}) doesn't match actual questions count (${actualTotalQuestions})`,
        );
      }
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      this.success("All validations passed!");
    } else {
      if (this.errors.length > 0) {
        this.log(`  Found ${this.errors.length} error(s)`, "red");
      }
      if (this.warnings.length > 0) {
        this.log(`  Found ${this.warnings.length} warning(s)`, "yellow");
      }
    }
  }
}

function getExamFilesFromManifest() {
  try {
    const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
    return manifest.map((path) => join(__dirname, "../public", path));
  } catch (error) {
    console.error(
      colors.red +
        `❌ Failed to load manifest: ${error.message}` +
        colors.reset,
    );
    process.exit(1);
  }
}

function main() {
  console.log(colors.blue + "🔍 Exam Validation Tool" + colors.reset);
  console.log(colors.blue + "=".repeat(50) + colors.reset);

  const examFiles = getExamFilesFromManifest();
  console.log(
    colors.cyan +
      `\n📚 Found ${examFiles.length} exam file(s) in manifest to validate\n` +
      colors.reset,
  );

  let totalErrors = 0;
  let totalWarnings = 0;
  const failedFiles = [];

  for (const examFile of examFiles) {
    const validator = new ExamValidator();

    try {
      const examData = JSON.parse(readFileSync(examFile, "utf-8"));
      const relativePath = examFile.replace(DATA_DIR + "/", "");

      validator.validateExam(examData, relativePath);

      totalErrors += validator.errors.length;
      totalWarnings += validator.warnings.length;

      if (validator.errors.length > 0) {
        failedFiles.push(relativePath);
      }
    } catch (error) {
      console.log(
        colors.red +
          `\n❌ Failed to parse ${examFile}: ${error.message}` +
          colors.reset,
      );
      failedFiles.push(examFile);
      totalErrors++;
    }
  }

  console.log(colors.blue + "\n" + "=".repeat(50) + colors.reset);
  console.log(colors.blue + "📊 Validation Summary" + colors.reset);
  console.log(colors.blue + "=".repeat(50) + colors.reset);
  console.log(`Total files validated: ${examFiles.length}`);
  console.log(`${colors.red}Total errors: ${totalErrors}${colors.reset}`);
  console.log(
    `${colors.yellow}Total warnings: ${totalWarnings}${colors.reset}`,
  );

  if (failedFiles.length > 0) {
    console.log(
      colors.red +
        `\n❌ Files with errors (${failedFiles.length}):` +
        colors.reset,
    );
    failedFiles.forEach((file) => {
      console.log(colors.red + `  - ${file}` + colors.reset);
    });
    process.exit(1);
  } else {
    console.log(
      colors.green + "\n✅ All exams validated successfully!" + colors.reset,
    );
    if (totalWarnings > 0) {
      console.log(
        colors.yellow +
          `⚠️  However, there are ${totalWarnings} warning(s) to review` +
          colors.reset,
      );
    }
    process.exit(0);
  }
}

main();
