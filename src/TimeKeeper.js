export class TimeKeeper {
  constructor(onTick, onSessionComplete, settings = {}) {
    this.onTick = onTick;
    this.onSessionComplete = onSessionComplete;

    // Durations configured in seconds (converting from minutes input)
    this.durations = {
      focus: (settings.focusDur || 25) * 60,
      shortBreak: (settings.shortBreakDur || 5) * 60,
      longBreak: (settings.longBreakDur || 15) * 60
    };

    this.longBreakInterval = settings.longBreakInterval || 4;

    this.sessionType = 'focus'; // 'focus', 'shortBreak', 'longBreak'
    this.remainingTime = this.durations.focus;
    this.isRunning = false;
    this.completedFocusSessions = 0;
    this.timerId = null;
  }

  get duration() {
    return this.durations[this.sessionType];
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timerId = setInterval(() => this.tick(), 1000);
    this.onTick();
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.onTick();
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  reset() {
    this.pause();
    this.remainingTime = this.duration;
    this.onTick();
  }

  skip() {
    this.pause();
    this.handleSessionComplete();
  }

  tick() {
    if (this.remainingTime > 0) {
      this.remainingTime--;
      this.onTick();
    } else {
      this.handleSessionComplete();
    }
  }

  handleSessionComplete() {
    const completedType = this.sessionType;
    
    if (completedType === 'focus') {
      this.completedFocusSessions++;
    }

    // Call Alert Agent callback
    if (this.onSessionComplete) {
      this.onSessionComplete(completedType);
    }

    // Determine next session type
    if (completedType === 'focus') {
      if (this.completedFocusSessions % this.longBreakInterval === 0) {
        this.sessionType = 'longBreak';
      } else {
        this.sessionType = 'shortBreak';
      }
    } else {
      this.sessionType = 'focus';
    }

    // Reset timer state for next session
    this.remainingTime = this.duration;
    this.pause();
    this.onTick();
  }
}
