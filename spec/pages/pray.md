# Page: Pray (`/pray/:mysterySetId/:step?`)

## Purpose

The core interactive prayer experience. The user steps through all 73 prayers of the selected mystery set by swiping up or down. Each step updates the URL, making progress shareable and bookmarkable.

## Route

- `/pray/:mysterySetId` → redirects to step 0
- `/pray/:mysterySetId/:step` → specific prayer step (0–72)

## URL-Driven State

```
step = parseInt(useParams().step, 10) || 0
```

Navigation uses `navigate()` to update the URL; there is no React state for progress.

## Prayer Step Sequence

See [`spec/prayer-steps.md`](prayer-steps.md) for the canonical 73-step definition.

## Layout

```
<main>
  ├─ <ProgressIndicator> (stage label + stage progress bar)
  │
  ├─ [if finished]
  │   └─ Completion screen (icon + heading + CTA buttons)
  │
  └─ [if praying]
      └─ Swipeable Prayer Area (touch + scroll driven)
          ├─ <PrayerDisplay>
          │   ├─ Prayer label pill (centered)
          │   ├─ [if mystery step] Mystery highlight box (purple bg)
          │   └─ Prayer text card (white bg, centered text)
          │
          └─ [first visit] Swipe hint overlay (up/down arrows + label)
```

## Sections Detail

### Progress Indicator

- Two-part indicator:
  - **Stage label**: "Úvod / Start", "Desiatok 1 / Decade 1", ..., "Zdravas Kráľovná / Hail Holy Queen"
  - **Stage progress bar**: shows progress within the current stage (Start has 7 steps, each Decade has 13 steps)

### Swipeable Prayer Area

**Gesture control:**
- **Swipe up** (touch or scroll down) → next prayer step, content slides **up** out and new content slides **up** in
- **Swipe down** (touch or scroll up) → previous prayer step, content slides **down** out and new content slides **down** in
- Threshold: 50px for touch, 40px for scroll
- Ignored while an animation is already in progress

**Animations:**
- Exit: `0.25s ease-in` (slide 40% off-screen + fade)
- Entry: `0.3s ease-out` (slide from 40% opposite direction + fade)
- Direction is passed via `navigate()` state; entry class is applied on mount and cleared after animation completes

**Swipe hint overlay:**
- Appears on first visit: two bouncing chevrons (up/down) with "Potiahnite nahor alebo dole / Swipe up or down"
- Auto-dismisses after 4 seconds or on first swipe
- `pointer-events-none`, fades in

### Prayer Display

- **Label pill**: `inline-block`, `bg-stone-100 text-stone-600`, rounded-full
- **Mystery highlight** (only on mystery announcement steps): `bg-rosary-purple/5`, rounded-2xl, centered. Shows mystery name (large bold) and description.
- **Text card**: `bg-white`, `rounded-2xl`, `border border-stone-200`, `p-6 sm:p-8`. Prayer text in `text-lg sm:text-xl`, `text-center`, `leading-relaxed`.

### Completion Screen

- Large icon in circle (`bg-rosary-purple/10`, `<RotateCcw size={32} />`)
- Heading: "Ruženec dokončený / Rosary completed"
- Subtitle paragraph
- Two buttons:
  - **Zopakovať / Repeat** (primary, goes to step 0)
  - **Domov / Home** (secondary, goes to `/`)

## Error State

If `mysterySetId` is invalid, shows centered "Tajomstvo nenájdené / Mystery not found" with a "Back home" button.

## Decade Calculation

```ts
currentDecade = Math.max(0, Math.min(4, Math.floor((step - 7) / 13)));
```

## Mobile

- Swipe gestures are the primary navigation method
- Back button hides label text on small screens (icon only)
