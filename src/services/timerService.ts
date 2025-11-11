class TimerService {
  private timerInterval: NodeJS.Timeout | null = null;
  private onTimeUp: (() => void) | null = null;
  private remainingSeconds: number = 0;
  private isPaused: boolean = false;

  startTimer(
    onTick: (seconds: number) => void,
    onTimeUpCallback: () => void,
    initialSeconds: number,
  ): void {
    if (initialSeconds <= 0) {
      console.warn("Timer started with invalid duration");
      return;
    }

    this.onTimeUp = onTimeUpCallback;
    this.remainingSeconds = initialSeconds;
    this.isPaused = false;

    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.isPaused) return;

      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        onTick(this.remainingSeconds);
      } else {
        this.stopTimer();
        if (this.onTimeUp) this.onTimeUp();
      }
    }, 1000);
  }

  pauseTimer(): void {
    this.isPaused = true;
  }

  resumeTimer(): void {
    this.isPaused = false;
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.onTimeUp = null;
    this.remainingSeconds = 0;
    this.isPaused = false;
  }

  isTimerRunning(): boolean {
    return this.timerInterval !== null && !this.isPaused;
  }

  getRemainingSeconds(): number {
    return this.remainingSeconds;
  }
}

export const timerService = new TimerService();
