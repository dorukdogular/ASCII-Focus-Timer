#!/usr/bin/env node
import { TimeKeeper } from './src/TimeKeeper.js';
import { AsciiDisplay } from './src/AsciiDisplay.js';
import { AlertAgent } from './src/AlertAgent.js';
import readline from 'readline';

const display = new AsciiDisplay();
const alerts = new AlertAgent();

// State managers
let mode = 'menu'; // 'menu' | 'timer'
let timeKeeper = null;

const menuState = {
  focusDur: 25,
  shortBreakDur: 5,
  longBreakDur: 15,
  longBreakInterval: 4,
  selectedIndex: 0 // 0-3 are options, 4 is start
};

// Tick callback - triggers render when timer runs
const onTick = () => {
  if (mode === 'timer' && timeKeeper) {
    display.render(timeKeeper);
  }
};

// Session complete callback - triggers system alert
const onSessionComplete = (sessionType) => {
  alerts.triggerSessionComplete(sessionType);
};

// Prepare terminal UI state
display.hideCursor();

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
readline.emitKeypressEvents(process.stdin);

// Clear the screen once completely at launch
process.stdout.write('\x1b[2J\x1b[H');

// Initial draw of the customizable menu
display.renderMenu(menuState);

// Listen to keyboard inputs
process.stdin.on('keypress', (str, key) => {
  if (!key) return;

  // Global quit command (Ctrl+C or 'q')
  if ((key.ctrl && key.name === 'c') || key.name === 'q' || key.name === 'Q') {
    cleanupAndExit();
  }

  if (mode === 'menu') {
    handleMenuKey(key);
  } else if (mode === 'timer') {
    handleTimerKey(key);
  }
});

// Handle key navigation and option adjustments in menu mode
function handleMenuKey(key) {
  switch (key.name) {
    case 'up':
      menuState.selectedIndex = (menuState.selectedIndex - 1 + 5) % 5;
      display.renderMenu(menuState);
      break;

    case 'down':
      menuState.selectedIndex = (menuState.selectedIndex + 1) % 5;
      display.renderMenu(menuState);
      break;

    case 'left':
      adjustSetting(menuState.selectedIndex, -1);
      display.renderMenu(menuState);
      break;

    case 'right':
      adjustSetting(menuState.selectedIndex, 1);
      display.renderMenu(menuState);
      break;

    case 'return':
    case 'enter':
      if (menuState.selectedIndex === 4) {
        // Initialize TimeKeeper with customized configuration values
        timeKeeper = new TimeKeeper(onTick, onSessionComplete, {
          focusDur: menuState.focusDur,
          shortBreakDur: menuState.shortBreakDur,
          longBreakDur: menuState.longBreakDur,
          longBreakInterval: menuState.longBreakInterval
        });
        
        mode = 'timer';
        // Clear screen and begin timer session immediately
        process.stdout.write('\x1b[2J\x1b[H');
        timeKeeper.start();
      }
      break;
  }
}

// Helper to increment or decrement the active menu option
function adjustSetting(idx, change) {
  switch (idx) {
    case 0:
      menuState.focusDur = Math.max(1, Math.min(99, menuState.focusDur + change));
      break;
    case 1:
      menuState.shortBreakDur = Math.max(1, Math.min(99, menuState.shortBreakDur + change));
      break;
    case 2:
      menuState.longBreakDur = Math.max(1, Math.min(99, menuState.longBreakDur + change));
      break;
    case 3:
      menuState.longBreakInterval = Math.max(1, Math.min(99, menuState.longBreakInterval + change));
      break;
  }
}

// Handle controls when the timer is active
function handleTimerKey(key) {
  if (!timeKeeper) return;

  // Toggle Start/Pause (Space bar)
  if (key.name === 'space') {
    timeKeeper.toggle();
  }

  // Skip current session ('s')
  if (key.name === 's' || key.name === 'S') {
    timeKeeper.skip();
  }

  // Reset timer ('r')
  if (key.name === 'r' || key.name === 'R') {
    timeKeeper.reset();
  }
}

// Redraw cleanly on terminal resize
process.stdout.on('resize', () => {
  process.stdout.write('\x1b[2J\x1b[H');
  if (mode === 'menu') {
    display.renderMenu(menuState);
  } else {
    if (timeKeeper) {
      display.render(timeKeeper);
    }
  }
});

// Cleanup cursor settings and clear terminal on exit
function cleanupAndExit() {
  if (timeKeeper) {
    timeKeeper.pause();
  }
  display.showCursor();
  process.stdout.write('\x1b[2J\x1b[H');
  console.log('🍅 Thanks for focusing with ASCII Focus Timer! Have a great day.');
  console.log('   Copyright © 2026 Doruk Doğular | https://github.com/dorukdogular\n');
  process.exit(0);
}

// Handle unexpected terminations gracefully
process.on('SIGINT', cleanupAndExit);
process.on('SIGTERM', cleanupAndExit);
