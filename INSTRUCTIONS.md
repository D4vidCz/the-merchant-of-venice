# The Merchant of Venice — Educational Project

Instructions for running the website and the Python console game.

---

## Project Files

| File | Description |
|------|-------------|
| `index.html` | Main website structure (all sections) |
| `styles.css` | Renaissance Venice themed styling |
| `script.js` | Interactivity and Snakes & Ladders game |
| `merchant_game.py` | Python console version of the game |
| `INSTRUCTIONS.md` | This file |

---

## Running the Website

### Option 1: Open directly in a browser (simplest)

1. Navigate to the project folder:
   ```
   c:\Users\yamil\OneDrive\Documentos\The merchant of Venice
   ```
2. Double-click `index.html`, or right-click it and choose **Open with** → your preferred browser (Chrome, Firefox, Edge, etc.).

The website will load locally. All features work except that some browsers may restrict certain external resources when opened via `file://`.

### Option 2: Use a local development server (recommended)

A local server avoids browser restrictions and behaves more like a live site.

**Using Python (if installed):**

```bash
cd "c:\Users\yamil\OneDrive\Documentos\The merchant of Venice"
python -m http.server 8000
```

Then open your browser and go to: **http://localhost:8000**

Press `Ctrl+C` in the terminal to stop the server.

**Using VS Code / Cursor:**

Install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.

### Website Features

- **Hero section** — Full-screen banner with "Explore the Story" button
- **About the Author** — Shakespeare biography and facts
- **About the Play** — Summary, themes, historical context
- **Characters** — Cards for Antonio, Shylock, Bassanio, Portia, Jessica
- **Timeline** — Five key plot events
- **Video** — Embedded YouTube placeholder (replaceable)
- **Gallery** — Responsive image grid
- **Fun Facts** — Shakespeare, Venice, and the play
- **Educational Game** — Snakes & Ladders modal game

### Replacing the YouTube Video

In `index.html`, find the `<iframe>` inside the video section and change the `src` attribute:

```html
<!-- Replace VIDEO_ID with your YouTube video ID -->
<iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    ...
></iframe>
```

Example: for `https://www.youtube.com/watch?v=abc123xyz`, use:
`https://www.youtube.com/embed/abc123xyz`

### Adding Sound Effects (optional)

The site includes placeholder `<audio>` elements. To enable sounds:

1. Add `.mp3` files to the project folder (e.g. `dice.mp3`, `correct.mp3`).
2. In `index.html`, set the `src` on each audio element:

```html
<audio id="soundDice" preload="auto">
    <source src="dice.mp3" type="audio/mpeg">
</audio>
```

---

## Running the Python Game

### Requirements

- **Python 3.6 or higher** (no external packages required)

Check your version:

```bash
python --version
```

### Start the game

```bash
cd "c:\Users\yamil\OneDrive\Documentos\The merchant of Venice"
python merchant_game.py
```

### How to play

1. Enter your name when prompted (or press Enter for "Scholar").
2. Press **Enter** each turn to roll the dice.
3. Answer multiple-choice questions on question squares.
4. Use ladders to climb and avoid snakes.
5. Reach **square 100** to win.

### Game features

| Feature | Description |
|---------|-------------|
| **Board** | 10x10 grid (100 squares) |
| **Snakes & Ladders** | 7 ladders, 8 snakes |
| **Questions** | 25 educational questions (randomly selected) |
| **Bonus squares** | Move forward extra spaces |
| **Penalty squares** | Move backward |
| **Score tracking** | Points for correct answers, ladders, bonuses, and winning |

### Python classes

- `Dice` — Virtual dice rolling
- `QuestionSystem` — Question selection and presentation
- `Player` — Position, score, and statistics
- `Board` — Board layout and special squares
- `Game` — Main game loop and flow

---

## Browser Compatibility

The website supports:

- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

Use a recent browser version for the best experience with animations and the game modal.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Use a local server (Option 2) or check your internet connection (gallery uses Unsplash URLs) |
| Game modal does not open | Ensure JavaScript is enabled in your browser |
| Python command not found | Try `python3 merchant_game.py` instead |
| Layout looks broken on mobile | Hard-refresh the page (`Ctrl+F5`) |
| Emoji display issues in Python on Windows | The game auto-configures UTF-8; use Windows Terminal for best results |

---

## Credits

Educational project about **The Merchant of Venice** by **William Shakespeare** (1564–1616).

Design theme: Renaissance Venice — gold, burgundy, dark brown, and cream.
