# Kids Typing Fireworks App — Project Plan

## Goal
A toddler-friendly React app where every keystroke triggers a colorful fireworks animation on screen. Big, bold letters appear as they type — turning the keyboard into a fun toy.

---

## Tech Stack

| Tool | Why |
|------|-----|
| **React** | Component-based UI, easy state management |
| **Vite** | Fast dev server, instant hot reload |
| **Canvas API** | Smooth firework particle animations |
| **CSS** | Bright toddler-friendly styling |

---

## Feature Plan

### Phase 1 — MVP (current)
- [x] React app scaffolded with Vite
- [x] Full-screen input captures all keypresses
- [x] Each keypress spawns a firework burst at a random position
- [x] Typed letters displayed large and colorful on screen
- [x] Firework particles animate with gravity + fade-out
- [x] Clear button to reset the screen

### Phase 2 — Enhancements (future ideas)
- [ ] Sound effects per keypress (fun pops/boings)
- [ ] Each letter gets its own unique color
- [ ] Confetti mode (hold a key)
- [ ] On-screen keyboard highlight as keys are pressed
- [ ] Simple word display mode (spell and it reads the word aloud)

---

## Project Structure

```
kids-app/
├── PLAN.md                  ← this file
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             ← React entry point
    ├── App.jsx              ← Root component
    ├── App.css              ← Global styles
    └── components/
        ├── FireworksCanvas.jsx  ← Canvas-based firework engine
        └── LetterDisplay.jsx    ← Shows typed letters
```

---

## How It Works (Architecture)

```
User presses a key
       │
       ▼
App.jsx captures keydown event
       │
       ├──► LetterDisplay  — appends the letter to visible text
       │
       └──► FireworksCanvas — spawns a burst of particles at
                              a random (x, y) on screen.
                              Each particle has:
                              - random velocity (vx, vy)
                              - gravity drag
                              - shrinking opacity
                              - bright random color
            Canvas runs requestAnimationFrame loop continuously.
```

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# → http://localhost:5173
```

---

## Key Concepts to Learn from This Project

1. **`useRef` + Canvas API** — drawing 2D graphics in React
2. **`requestAnimationFrame`** — smooth 60fps animation loop
3. **Particle systems** — each firework is N particles with physics
4. **Event listeners in React** — capturing `keydown` globally
5. **Vite** — modern, fast alternative to Create React App

