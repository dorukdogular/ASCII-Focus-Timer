const DIGITS = {
  '0': [
    "  ████  ",
    " ██  ██ ",
    " ██  ██ ",
    " ██  ██ ",
    "  ████  "
  ],
  '1': [
    "   ██   ",
    "  ███   ",
    "   ██   ",
    "   ██   ",
    "  ████  "
  ],
  '2': [
    " █████  ",
    "     ██ ",
    "  █████ ",
    " ██     ",
    " ██████ "
  ],
  '3': [
    " █████  ",
    "     ██ ",
    "  █████ ",
    "     ██ ",
    " █████  "
  ],
  '4': [
    " ██  ██ ",
    " ██  ██ ",
    " ██████ ",
    "     ██ ",
    "     ██ "
  ],
  '5': [
    " ██████ ",
    " ██     ",
    " █████  ",
    "     ██ ",
    " █████  "
  ],
  '6': [
    "  ████  ",
    " ██     ",
    " █████  ",
    " ██  ██ ",
    "  ████  "
  ],
  '7': [
    " ██████ ",
    "     ██ ",
    "    ██  ",
    "   ██   ",
    "  ██    "
  ],
  '8': [
    "  ████  ",
    " ██  ██ ",
    "  ████  ",
    " ██  ██ ",
    "  ████  "
  ],
  '9': [
    "  ████  ",
    " ██  ██ ",
    "  █████ ",
    "     ██ ",
    "  ████  "
  ],
  ':': [
    "   ",
    " █ ",
    "   ",
    " █ ",
    "   "
  ]
};

export class AsciiDisplay {
  constructor() {
    this.width = 72; // total width of the box including borders
    this.height = 17; // total height of the box including borders
  }

  // Render the customizable settings menu
  renderMenu(menuState) {
    const cols = process.stdout.columns || 80;
    const rows = process.stdout.rows || 24;

    if (cols < this.width + 2 || rows < this.height + 2) {
      process.stdout.write('\x1b[2J\x1b[H');
      console.log('\n\n\x1b[31;1m  ⚠️  Terminal window is too small!\x1b[0m');
      console.log(`  Please enlarge your window to at least ${this.width + 4}x${this.height + 4}.`);
      console.log(`  Current size: ${cols}x${rows}\n`);
      return;
    }

    const leftPadVal = Math.floor((cols - this.width) / 2);
    const topPadVal = Math.floor((rows - this.height) / 2);
    const leftPadStr = " ".repeat(leftPadVal);

    const content = [];

    // Line 1: Header
    content.push(this.centerText('🍅   A S C I I   F O C U S   T I M E R   🍅', 70));

    // Line 2: Empty
    content.push("");

    // Line 3: Title
    content.push(this.centerText('\x1b[36;1m[ CUSTOM CONFIGURATION ]\x1b[0m', 70, true));

    // Line 4: Empty
    content.push("");

    // Helper for rendering rows
    const renderRow = (idx, icon, label, val, suffix = '') => {
      const isSelected = menuState.selectedIndex === idx;
      const cursor = isSelected ? '\x1b[32;1m> \x1b[0m' : '  ';
      const labelStr = `${icon} ${label}`;
      const valStr = `[ ${String(val).padStart(2, ' ')} ] ${suffix}`;
      
      const totalTextWidth = 46;
      // Subtracting raw length without escape sequences
      const labelRaw = labelStr.replace(/\x1b\[[0-9;]*m/g, '');
      const valRaw = valStr.replace(/\x1b\[[0-9;]*m/g, '');
      const dotsCount = totalTextWidth - (labelRaw.length + valRaw.length);
      const dots = '.'.repeat(dotsCount > 0 ? dotsCount : 1);
      
      const rowContent = `${cursor}${labelStr}${dots}${valStr}`;
      if (isSelected) {
        return this.centerText(`\x1b[1;32m${rowContent}\x1b[0m`, 70, true);
      }
      return this.centerText(rowContent, 70, true);
    };

    // Lines 5-8: Option Rows
    content.push(renderRow(0, '🕒', 'Focus Duration', menuState.focusDur, 'mins'));
    content.push(renderRow(1, '☕', 'Short Break Duration', menuState.shortBreakDur, 'mins'));
    content.push(renderRow(2, '🌴', 'Long Break Duration', menuState.longBreakDur, 'mins'));
    content.push(renderRow(3, '🔄', 'Long Break Interval', menuState.longBreakInterval, 'cycles'));

    // Line 9: Empty
    content.push("");

    // Line 10: Start Button
    const isStartSelected = menuState.selectedIndex === 4;
    const startButton = isStartSelected 
      ? '\x1b[32;1m> [ 🚀 START TIMER ] <\x1b[0m' 
      : '  [ 🚀 START TIMER ]  ';
    content.push(this.centerText(startButton, 70, isStartSelected));

    // Line 11: Empty
    content.push("");
    // Line 12: Empty
    content.push("");

    // Line 13: Shortcut controls
    content.push(this.centerText('\x1b[90m▲/▼\x1b[0m Navigate  │  \x1b[90m◀/▶\x1b[0m Adjust Value  │  \x1b[90mENTER\x1b[0m Start  │  \x1b[90mQ\x1b[0m Quit', 70, true));

    // Line 14: Divider
    content.push('\x1b[90m' + '─'.repeat(70) + '\x1b[0m');

    // Line 15: Footer
    const footerText = '© 2026 Doruk Doğular  │  github.com/dorukdogular';
    content.push(this.centerText(`\x1b[90m${footerText}\x1b[0m`, 70, true));

    // Assembly of the box
    let buffer = '\x1b[H'; // Move cursor to top-left
    
    // Top vertical padding
    for (let r = 0; r < topPadVal; r++) {
      buffer += '\n';
    }

    // Top border
    buffer += leftPadStr + '╔' + '═'.repeat(70) + '╗\n';

    // Content rows
    content.forEach(line => {
      const rawLine = line.replace(/\x1b\[[0-9;]*m/g, '');
      const paddingNeeded = 70 - rawLine.length;
      const leftPad = ' '.repeat(Math.floor(paddingNeeded / 2));
      const rightPad = ' '.repeat(paddingNeeded - leftPad.length);
      buffer += leftPadStr + '║' + leftPad + line + rightPad + '║\n';
    });

    // Bottom border
    buffer += leftPadStr + '╚' + '═'.repeat(70) + '╝\n';

    // Bottom vertical padding
    for (let r = 0; r < topPadVal; r++) {
      buffer += '\n';
    }

    // Write all to terminal at once
    process.stdout.write(buffer);
  }

  // Hide the cursor
  hideCursor() {
    process.stdout.write('\x1b[?25l');
  }

  // Restore the cursor
  showCursor() {
    process.stdout.write('\x1b[?25h');
  }

  // Generate ASCII art for a time string like "25:00"
  getAsciiTime(timeStr) {
    const lines = ["", "", "", "", ""];
    for (let i = 0; i < timeStr.length; i++) {
      const char = timeStr[i];
      const fontChar = DIGITS[char] || DIGITS['0'];
      for (let row = 0; row < 5; row++) {
        lines[row] += fontChar[row] + (i < timeStr.length - 1 ? " " : "");
      }
    }
    return lines;
  }

  // Renders the state of the TimeKeeper
  render(state) {
    const cols = process.stdout.columns || 80;
    const rows = process.stdout.rows || 24;

    // Check if terminal is large enough
    if (cols < this.width + 2 || rows < this.height + 2) {
      process.stdout.write('\x1b[2J\x1b[H');
      console.log('\n\n\x1b[31;1m  ⚠️  Terminal window is too small!\x1b[0m');
      console.log(`  Please enlarge your window to at least ${this.width + 4}x${this.height + 4}.`);
      console.log(`  Current size: ${cols}x${rows}\n`);
      return;
    }

    const leftPadVal = Math.floor((cols - this.width) / 2);
    const topPadVal = Math.floor((rows - this.height) / 2);
    const leftPadStr = " ".repeat(leftPadVal);

    // Format minutes and seconds
    const minutes = Math.floor(state.remainingTime / 60);
    const seconds = state.remainingTime % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Colors based on session type
    let themeColor = '\x1b[37m'; // White default
    let sessionName = 'FOCUS SESSION';
    if (state.sessionType === 'focus') {
      themeColor = '\x1b[31;1m'; // Red
      sessionName = 'FOCUS SESSION';
    } else if (state.sessionType === 'shortBreak') {
      themeColor = '\x1b[32;1m'; // Green
      sessionName = 'SHORT BREAK';
    } else if (state.sessionType === 'longBreak') {
      themeColor = '\x1b[34;1m'; // Blue
      sessionName = 'LONG BREAK';
    }

    // Build the inside content lines (exactly 15 lines of content inside)
    const content = [];

    // Line 1: Header title
    content.push(this.centerText('🍅   A S C I I   F O C U S   T I M E R   🍅', 70));

    // Line 2: Empty
    content.push("");

    // Line 3: Session Name Badge
    content.push(this.centerText(`\x1b[1m[ ${themeColor}${sessionName}\x1b[0m\x1b[1m ]\x1b[0m`, 70, true));

    // Line 4-8: ASCII Digital Clock (5 lines)
    const asciiClockLines = this.getAsciiTime(timeStr);
    asciiClockLines.forEach(line => {
      content.push(this.centerText(`${themeColor}${line}\x1b[0m`, 70, true));
    });

    // Line 9: Empty
    content.push("");

    // Line 10: Progress Bar
    const pct = (state.duration - state.remainingTime) / state.duration;
    const barWidth = 40;
    const filledCount = Math.round(pct * barWidth);
    const emptyCount = barWidth - filledCount;
    const barStr = `${themeColor}${'█'.repeat(filledCount)}\x1b[90m${'░'.repeat(emptyCount)}\x1b[0m`;
    content.push(this.centerText(`[ ${barStr} ]`, 70, true));

    // Line 11: Empty
    content.push("");

    // Line 12: Tomato stats / Status
    const totalSessions = 4;
    const completedInCycle = state.completedFocusSessions % totalSessions;
    let tomatoStr = "";
    for (let i = 1; i <= totalSessions; i++) {
      if (i <= completedInCycle) {
        tomatoStr += "🍅 ";
      } else {
        tomatoStr += "◯ ";
      }
    }
    const statusText = state.isRunning ? '\x1b[32;1mRUNNING\x1b[0m' : '\x1b[33;1mPAUSED\x1b[0m';
    content.push(this.centerText(`Status: ${statusText}   │   Interval: [ ${tomatoStr.trim()} ] (Total: ${state.completedFocusSessions})`, 70, true));

    // Line 13: Keyboard control shortcuts
    content.push(this.centerText('\x1b[90mSPACE\x1b[0m Play/Pause  │  \x1b[90mS\x1b[0m Skip  │  \x1b[90mR\x1b[0m Reset  │  \x1b[90mQ\x1b[0m Quit', 70, true));

    // Line 14: Horizontal separator
    content.push('\x1b[90m' + '─'.repeat(70) + '\x1b[0m');

    // Line 15: Copyright & Github Footer
    const footerText = '© 2026 Doruk Doğular  │  github.com/dorukdogular';
    content.push(this.centerText(`\x1b[90m${footerText}\x1b[0m`, 70, true));

    // Assembly of the box
    let buffer = '\x1b[H'; // Move cursor to top-left instead of full clear to avoid flicker
    
    // Top vertical padding
    for (let r = 0; r < topPadVal; r++) {
      buffer += '\n';
    }

    // Top border
    buffer += leftPadStr + '╔' + '═'.repeat(70) + '╗\n';

    // Content rows
    content.forEach(line => {
      // Find actual raw length if color codes are present
      const rawLine = line.replace(/\x1b\[[0-9;]*m/g, '');
      const paddingNeeded = 70 - rawLine.length;
      const leftPad = ' '.repeat(Math.floor(paddingNeeded / 2));
      const rightPad = ' '.repeat(paddingNeeded - leftPad.length);
      
      // Let's build the bordered row. Note: if the line already contains centering color codes,
      // it was processed by centerText.
      buffer += leftPadStr + '║' + line + '║\n';
    });

    // Bottom border
    buffer += leftPadStr + '╚' + '═'.repeat(70) + '╝\n';

    // Bottom vertical padding
    for (let r = 0; r < topPadVal; r++) {
      buffer += '\n';
    }

    // Write all to terminal at once
    process.stdout.write(buffer);
  }

  // Centers the text within a specified width
  // hasAnsi parameter is set to true if the text contains escape sequences
  centerText(text, width, hasAnsi = false) {
    const rawText = hasAnsi ? text.replace(/\x1b\[[0-9;]*m/g, '') : text;
    const padding = width - rawText.length;
    if (padding <= 0) return text;
    const leftPad = ' '.repeat(Math.floor(padding / 2));
    const rightPad = ' '.repeat(padding - leftPad.length);
    return leftPad + text + rightPad;
  }
}
