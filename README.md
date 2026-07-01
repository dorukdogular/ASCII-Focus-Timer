# ASCII Focus Timer 🍅

A beautiful, interactive, and customizable ASCII-art Pomodoro focus timer designed for the terminal. Built entirely with Vanilla Node.js (no npm dependencies needed).

Features a premium centered dashboard, live responsive resizing, sound alerts, macOS native system notifications, and a fully navigable settings menu.

---

## Features

- ⚙️ **Starting Menu**: Configure Focus duration, Break lengths, and Long Break intervals interactively with your arrow keys before launching.
- 🕒 **ASCII Clock**: Rendered using a large, stylized pixel digit font.
- 📐 **Dynamic Centering**: Keeps the layout centered in the terminal. Automatically recalculates padding on window resize.
- 🔔 **Alert Agent**: Dispatches macOS desktop notifications and triggers system beeps when a session is completed.
- 🛡️ **Zero Dependencies**: Lightweight and fast, utilizing core Node.js features.

---

## Installation & Running

This package is published to the public **npm registry**.

### 1. Run directly with npx
You can execute it instantly without any manual installation:
```bash
npx @dorukdogular/ascii-focus-timer
```

### 2. Global Installation
To install the tool globally on your system:
```bash
npm install -g @dorukdogular/ascii-focus-timer
```
Once installed, run it using the command:
```bash
ascii-focus-timer
```

### 3. Local Installation / Development
1. Clone or copy this repository to your computer.
2. Open a terminal inside the project directory and run:
   ```bash
   npm link
   ```
3. Run the command:
   ```bash
   ascii-focus-timer
   ```

---

## Keyboard Controls

### 🎮 Settings Menu Mode
- **`▲` / `▼` (Up / Down Arrow)**: Navigate between setting fields and `[ Start Timer ]`.
- **`◀` / `▶` (Left / Right Arrow)**: Adjust setting values (Focus duration, break durations, long break cycles).
- **`Enter`**: Trigger `[ Start Timer ]` to launch the countdown with your configurations.
- **`Q` or `Ctrl+C`**: Quit.

### ⏱️ Timer countdown Mode
- **`Space`**: Pause / Resume the timer countdown.
- **`S`**: Skip the current session block.
- **`R`**: Reset the current session timer to its starting duration.
- **`Q` or `Ctrl+C`**: Gracefully quit (restores cursor and clears terminal).

---

## Automated Publishing

This repository is set up with **GitHub Actions**. Every time you publish a new Release on GitHub, the workflow automatically builds, tests, and publishes the package to the public **npm registry**.

To publish a new version:
1. Update the `"version"` field in `package.json` (e.g. `"1.1.0"`).
2. Commit and push the changes.
3. Draft and publish a new Release on GitHub matching that tag (e.g. `v1.1.0`).

---

## License & Copyright

Copyright © 2026 Doruk Doğular. Licensed under the MIT License.  
GitHub Profile: [github.com/dorukdogular](https://github.com/dorukdogular)
