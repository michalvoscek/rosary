# Rosary Prayer PWA — Application Specification

## Overview
A bilingual (Slovak / English) Progressive Web App for praying the Rosary. Progress is tracked through URL changes, making it bookmarkable and shareable. Mysteries are mapped to days of the week.

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7 (BrowserRouter)
- **PWA**: vite-plugin-pwa (Workbox, auto-generated service worker)
- **Icons**: Lucide React

## Data Architecture
- **Language**: React Context + localStorage persistence (`sk` | `en`)
- **Mysteries / Prayers**: Static bilingual data modules
- **Progress**: URL-driven (`/pray/:mysterySetId/:step`); no localStorage for prayer progress

---

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `/` | Landing, shows all weekdays with assigned mysteries |
| **Pray** | `/pray/:mysterySetId/:step?` | Interactive prayer flow (78 steps per mystery set) |

---

## Global Layout
All pages are wrapped in `Layout.tsx`:
- **Sticky header** (top): Logo + language toggle (`SK` / `EN`)
- **Main content area**: `max-w-2xl`, centered, `px-4` padding
- **Background**: `bg-app` page background with `bg-surface` cards on top

## Theme Tokens
All colors are defined in a single place: `src/index.css`.
- Semantic tokens (`--app`, `--surface`, `--body`, ...) are mapped to Tailwind
  utilities via `@theme inline` and get their values from the light (`:root`)
  and `[data-theme="dark"]` blocks.
- `ThemeContext` switches themes by setting `data-theme` on `<html>`;
  the selection persists in localStorage (`rosary-theme`).
- Mystery accent colors (`--mystery-*`) are theme-independent and used via
  inline styles.

## Status Bar / Edge-to-Edge
- The app is edge-to-edge (`viewport-fit=cover`): the sticky header's
  `bg-surface` extends behind the OS status bar via
  `pt-[env(safe-area-inset-top)]`, so the top edge always matches the app
  theme — even mid-transition during a theme switch.
- `ThemeContext` additionally replaces the `theme-color` meta on every theme
  change (a probe element resolves the final `--surface`; Chrome Android
  ignores `setAttribute()` on an existing meta tag). This still matters for
  Android versions without enforced edge-to-edge and for in-browser toolbars.
- Known platform limitation: with the device in system dark mode, some
  Chromium builds force the status bar to black, ignoring `theme-color`
  (https://issues.chromium.org/issues/40634649). The edge-to-edge header
  keeps the seam invisible on Android 15+ regardless.
