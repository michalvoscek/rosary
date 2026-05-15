# Routing & Data Flow Specification

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `HomePage` | Landing, mystery selection |
| `/about` | `AboutPage` | Instructions & schedule |
| `/pray/:mysterySetId` | `PrayPage` | Start rosary at step 0 |
| `/pray/:mysterySetId/:step` | `PrayPage` | Resume at specific step |
| `*` | `Navigate to /` | 404 redirect |

## URL-Driven Progress (Pray Page)

### Why URLs?
- **Shareable**: Send `/pray/sorrowful/42` to resume where you left off
- **Bookmarkable**: Save your place in the browser
- **Back button**: Browser back navigates to previous prayer step
- **No localStorage needed**: State is in the URL, survives refresh

### Step Parameter
```ts
const { mysterySetId, step } = useParams();
const currentStep = parseInt(step || '0', 10);
```

### Navigation
```ts
const goToStep = (s: number) => {
  navigate(`/pray/${mysterySetId}/${s}`);
};
```

### Validation
- `step` clamped to `[0, TOTAL_STEPS - 1]`
- Invalid `mysterySetId` → error state with "Back home" button

---

## Data Flow

### Static Data
```
data/prayers.ts    → All prayer texts (sk/en)
data/mysteries.ts   → 4 mystery sets, day mapping, decades
```

### Dynamic State
```
LanguageContext    → lang (sk/en), persisted in localStorage
    ↓
All components     → re-render on language change
```

### Pray Page Flow
```
URL params → PrayPage
    ↓
getMysterySet(id) → mysterySet data
    ↓
currentStep → getPrayer(step) → { label, text }
    ↓
PrayerDisplay → renders prayer text
    ↓
User clicks Next/Prev → navigate() → new URL → re-render
```

### Decade Calculation
```ts
const currentDecade = Math.max(0, Math.min(4, Math.floor((step - 7) / 14)));
const currentMystery = mysterySet.decades[currentDecade];
```

---

## Day-to-Mystery Mapping

```
Day (getDay())   Mystery
─────────────────────────────────
0 (Sunday)       Glorious
1 (Monday)       Joyful
2 (Tuesday)      Sorrowful
3 (Wednesday)    Glorious
4 (Thursday)     Luminous
5 (Friday)       Sorrowful
6 (Saturday)     Joyful
```

Function: `getTodaysMysterySet()` in `data/mysteries.ts`

---

## PWA Architecture

### vite-plugin-pwa Configuration
- **Register type**: `autoUpdate` (prompts user when new version available)
- **Manifest**: Auto-generated from `manifest` object in `vite.config.ts`
- **Workbox**: Auto-generated `sw.js` + `workbox-*.js`
- **Precache**: All JS, CSS, HTML, ICO, PNG, SVG files

### Manifest
```json
{
  "name": "Rosary Prayer",
  "short_name": "Rosary",
  "description": "Interactive Rosary prayer app with bilingual support",
  "theme_color": "#7c3aed",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    { "src": "/icon-192x192.png", "sizes": "192x192" },
    { "src": "/icon-512x512.png", "sizes": "512x512" }
  ]
}
```

### Icons
| File | Size | Purpose |
|------|------|---------|
| `favicon.svg` | SVG | Browser tab icon |
| `icon-192x192.png` | 192×192 | PWA manifest |
| `icon-512x512.png` | 512×512 | PWA manifest, splash screen |
| `apple-touch-icon.png` | 180×180 | iOS home screen |

---

## State Management Summary

| State | Location | Persistence | Scope |
|-------|----------|-------------|-------|
| Language | React Context | `localStorage` (rosary-lang) | Global |
| Prayer progress | URL params | None (URL itself) | Per session |
| Mystery data | Static imports | None | Static |
| Prayer texts | Static imports | None | Static |
