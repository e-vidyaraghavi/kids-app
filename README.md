# Kids Typing Fireworks 🎆

A toddler-friendly React app where every keystroke triggers a colorful fireworks animation on screen. Big, bold letters appear as kids type — turning the keyboard into a fun toy.

## 🌐 Live Demo

**https://e-vidyaraghavi.github.io/kids-app/**

## Tech Stack

- **React** — UI framework
- **Vite** — build tool & dev server
- **Canvas API** — firework particle animations
- **GitHub Pages + Actions** — hosting & CI/CD

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.jsx              # Root component
├── main.jsx             # Entry point
├── sounds.js            # Sound effects
└── components/
    ├── FireworksCanvas.jsx
    └── LetterDisplay.jsx
```

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

See [PLAN.md](PLAN.md) for the full feature roadmap.
