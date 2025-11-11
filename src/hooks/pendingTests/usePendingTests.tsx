import { attemptStore } from "@/stores/attemptStore";

export function usePendingTests() {
  const attempts = attemptStore();
  const pendingTests = Object.values(attempts.attempts).filter(
    (a) => a.status === "in_progress",
  );

  return {
    pendingTests,
    loading: false,
    deletePendingTest: (id: string) => attempts.removeAttempt(id),
  };
}
