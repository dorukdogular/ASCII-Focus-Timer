import { exec } from 'child_process';

export class AlertAgent {
  constructor() {}

  triggerSessionComplete(sessionType) {
    // 1. Play terminal bell (\x07) twice
    process.stdout.write('\x07');
    setTimeout(() => {
      process.stdout.write('\x07');
    }, 250);

    // 2. Trigger macOS system beep
    exec('osascript -e "beep 1"', (err) => {
      // Ignore errors if osascript is unavailable
    });

    // 3. Configure macOS Desktop Notification details
    let title = 'ASCII Focus Timer';
    let message = 'Session completed!';
    let sound = 'Glass';

    if (sessionType === 'focus') {
      title = '🍅 Focus Session Complete!';
      message = 'Great job! Take a break and recharge.';
      sound = 'Glass';
    } else if (sessionType === 'shortBreak') {
      title = '☕ Short Break Complete!';
      message = 'Time to focus. Let\'s get back to work!';
      sound = 'Ping';
    } else if (sessionType === 'longBreak') {
      title = '🌴 Long Break Complete!';
      message = 'Ready for another round of productivity?';
      sound = 'Hero';
    }

    // Escape double quotes to be safe inside AppleScript strings
    const escapedTitle = title.replace(/"/g, '\\"');
    const escapedMessage = message.replace(/"/g, '\\"');

    // Execute osascript notification command
    const command = `osascript -e 'display notification "${escapedMessage}" with title "${escapedTitle}" sound name "${sound}"'`;
    exec(command, (err) => {
      // Silently catch errors (e.g. if not run on macOS)
    });
  }
}
