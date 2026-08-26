# Quân Dev — Portfolio (Intern Edition)

A code-editor-themed portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

## What's inside

- Boot-sequence intro (fake terminal build log) before the page reveals itself
- Scroll-triggered reveal animations on every section
- Typewriter effect on the hero name
- Mouse-tracked spotlight glow + drifting ambient blobs in the hero
- Animated count-up stats
- Sliding active-tab indicator in the nav (styled like VS Code tabs)
- Git-log-style animated experience timeline
- Hover glow / lift on project cards, skill tags, and buttons
- A VS Code–style status bar pinned to the bottom of the page

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/` — upload that folder to any static host
(Vercel, Netlify, GitHub Pages, etc.).

## Customize

- All content (name, projects, skills, experience, education, contact info) lives at
  the top of `src/App.jsx` in a few small arrays — edit those, no need to touch the JSX.
- Colors are driven by the `COLOR` map in `src/App.jsx`; swap the Tailwind color names
  there to re-theme the whole site.
- Fonts (`JetBrains Mono` + `Inter`) and custom keyframes are in `src/index.css`.
