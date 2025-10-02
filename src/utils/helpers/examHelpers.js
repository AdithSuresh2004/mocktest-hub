export function calculateSectionStats(questions = [], answers = {}, markedForReview = new Set()) {
  return questions.reduce(
    (acc, q) => {
      const isAnswered = answers.hasOwnProperty(q.q_id) && answers[q.q_id] !== null;
      const isMarked = markedForReview.has(q.q_id);
      if (isMarked) acc.marked++;
      else if (isAnswered) acc.answered++;
      else acc.notVisited++;
      return acc;
    },
    { answered: 0, marked: 0, notVisited: 0 }
  );
}
export function getQuestionStatusClasses({
  question,
  qIndex,
  answers,
  markedForReview,
  currentSectionIndex,
  currentQuestionIndex,
  visibleSectionIndex,
}) {
  const qId = question.q_id;
  const isAnswered = answers.hasOwnProperty(qId) && answers[qId] !== null;
  const isMarked = markedForReview.has(qId);
  const isCurrent = visibleSectionIndex === currentSectionIndex && qIndex === currentQuestionIndex;
  if (isCurrent) return "bg-blue-600 text-white shadow-lg ring-2 ring-blue-300";
  if (isMarked) return "bg-purple-600 hover:bg-purple-700 text-white";
  if (isAnswered) return "bg-green-600 hover:bg-green-700 text-white";
  return "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200";
}
export const calculateScore = (examData, answersObj) => {
  if (!examData || !examData.sections) return { total: 0, per_section: {} };
  let totalScore = 0;
  const perSection = {};
  examData.sections.forEach(section => {
    let sectionScore = 0;
    if (section.questions && Array.isArray(section.questions)) {
      section.questions.forEach(question => {
        const userAnswer = answersObj[question.q_id || question.id];
        if (userAnswer !== undefined) {
          if (userAnswer === question.correct_option) {
            sectionScore += question.marks || 4;
          } else {
            sectionScore -= question.negative_marks || 1;
          }
        }
      });
    }
    perSection[section.id || section.section_id] = sectionScore;
    totalScore += sectionScore;
  });
  return {
    total: totalScore,
    per_section: perSection
  };
};
export function formatTime(seconds) {
    if (!seconds && seconds !== 0) return "00:00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};