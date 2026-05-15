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
| **Home** | `/` | Landing, today's mystery recommendation, all mystery sets |
| **Pray** | `/pray/:mysterySetId/:step?` | Interactive prayer flow (78 steps per mystery set) |
| **About** | `/about` | How to pray the rosary, daily schedule, prayer structure |

---

## Global Layout
All pages are wrapped in `Layout.tsx`:
- **Sticky header** (top): Logo + nav links + language toggle (`SK` / `EN`)
- **Mobile bottom nav**: Home + About (hidden on `sm:` screens)
- **Main content area**: `max-w-2xl`, centered, `px-4` padding
- **Background**: `bg-stone-50` with white cards on top

## Theme Tokens
```
--color-rosary-purple:  #7c3aed
--color-rosary-purple-light: #a78bfa
--color-rosary-gold:    #f59e0b
--color-rosary-rose:    #f43f5e
--color-rosary-blue:    #3b82f6
--color-rosary-green:   #10b981
```
