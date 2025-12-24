class TimerService {
  private timerInterval: NodeJS.Timeout | null = null;
  private onTimeUp: (() => void) | null = null;
  private remainingSeconds: number = 0;

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

    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        onTick(this.remainingSeconds);
      } else {
        this.stopTimer();
        if (this.onTimeUp) this.onTimeUp();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}

export const timerService = new TimerService();
