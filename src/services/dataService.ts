import { Exam } from "@/types";
import { isExam } from "@/utils/validation/typeGuards";

export const fetchExams = async (): Promise<Exam[]> => {
  try {
    const response = await fetch("/data/exams_manifest.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch manifest: ${response.statusText}`);
    }

    const manifestJson: unknown = await response.json();
    if (
      !Array.isArray(manifestJson) ||
      !manifestJson.every((p) => typeof p === "string")
    ) {
      throw new Error("Invalid exams manifest format");
    }

    const exams = await Promise.all(
      manifestJson.map(async (path) => {
        try {
          const res = await fetch(`/${path}`);
          if (!res.ok) {
            console.error(`Failed to fetch exam at ${path}: ${res.statusText}`);
            return null;
          }

          const data: unknown = await res.json();
          if (!isExam(data)) {
            console.error(`Invalid exam data at ${path}`);
            return null;
          }
          return data;
        } catch (error) {
          console.error(`Error loading exam from ${path}:`, error);
          return null;
        }
      }),
    );

    return exams.filter((exam): exam is Exam => exam !== null);
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
};

export const getExamById = (exams: Exam[], examId: string): Exam | undefined =>
  exams.find((exam) => exam.exam_id === examId);
