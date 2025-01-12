# Virtual Tamagotchi - 2 Hour Project

## Overview
Build a simple virtual Tamagotchi using JavaScript, HTML, and TailwindCSS. The project should focus on essential features to create a basic, interactive pet game within two hours.

---

## Features

### Core Functionality
1. **Pet Status Display**
   - Show essential stats: Hunger, Happiness, and Energy.
   - Use a TailwindCSS-styled UI to represent stats visually (e.g., progress bars or emojis).

2. **Interactive Actions**
   - **Feed**: Reduces Hunger but slightly lowers Energy.
   - **Play**: Increases Happiness but decreases Energy.
   - **Sleep**: Restores Energy but increases Hunger.

3. **Time-based Decay**
   - Gradually reduce stats over time using `setInterval` (e.g., -1 point every 5 seconds).

4. **Game Over Condition**
   - If any stat reaches zero, display a "Game Over" message and reset the game.

5. **Persistent State**
   - Save the pet's stats in `localStorage` so progress persists if the page is refreshed.

---

## Tech Stack
1. **HTML**
   - Basic structure for the game interface.
2. **JavaScript**
   - Game logic, timers, and user interaction handling.
3. **TailwindCSS**
   - Styling for a responsive and visually appealing UI.

---

## Libraries and Tools
1. **CDN Links**
   - TailwindCSS: Include via `<link>` tag.
   - Optional: [SweetAlert2](https://sweetalert2.github.io/) for pop-up notifications.

---

## Folder Structure
```
project-root/
│
├── index.html    # Main HTML file for the app interface
├── script.js     # Contains the game logic and interactions
└── styles.css    # (Optional) Additional custom styles if needed
```

---

## Implementation Steps

### Setup (10 minutes)
1. Create `index.html` with TailwindCSS included.
2. Add basic UI elements:
   - Display pet stats (Hunger, Happiness, Energy).
   - Buttons for Feed, Play, Sleep actions.

### Game Logic (30 minutes)
1. Write a `script.js` file to manage:
   - State for stats using an object.
   - Button event listeners for each action.
   - `setInterval` for time-based stat decay.
2. Add a "Game Over" condition and reset functionality.

### Styling and Polishing (20 minutes)
1. Use TailwindCSS to style buttons, stats display, and the layout.
2. Optionally, add animations or hover effects.

### Testing and Debugging (30 minutes)
1. Test each action and the decay functionality.
2. Ensure `localStorage` works for stat persistence.

---

## Stretch Goals (Optional)
- Add simple animations using CSS or a library like Anime.js.
- Include a customizable pet appearance (e.g., emoji or image changes).
- Implement sound effects using Howler.js.

---

## Example UI Mockup
```
----------------------
| 😺 Virtual Pet     |
| Hunger:  ████      |
| Happiness: ████    |
| Energy:    ████    |
|--------------------|
| [ Feed ] [ Play ]  |
| [ Sleep ]          |
----------------------
