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

## Installation

### 1. Run directly with npx
You can execute it instantly without any manual installation:
```bash
npx ascii-focus-timer
```

### 2. Global Installation
To install the tool globally on your system:
```bash
npm install -g ascii-focus-timer
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

## Publishing to npm

If you wish to publish this package under your npm account so others can install it:

1. **Check package name**: Open `package.json` and verify the `"name"` field. (If the name `ascii-focus-timer` is already taken on the registry, change it to a unique name, e.g., `"asciifocustimer"`).
2. **Log into npm**: Run `npm login` in your terminal and enter your credentials.
3. **Publish**: Run the command:
   ```bash
   npm publish --access public
   ```

---

## License & Copyright

Copyright © 2026 Doruk Doğular. Licensed under the MIT License.  
GitHub Profile: [github.com/dorukdogular](https://github.com/dorukdogular)
