# Page: Pray (`/pray/:mysterySetId/:step?`)

## Purpose
The core interactive prayer experience. The user steps through all 78 prayers of the selected mystery set. Each step updates the URL, making progress shareable and bookmarkable.

## Route
- `/pray/:mysterySetId` → redirects to step 0
- `/pray/:mysterySetId/:step` → specific prayer step (0–77)

## URL-Driven State
```
step = parseInt(useParams().step, 10) || 0
```
Navigation uses `navigate()` to update the URL; there is no React state for progress.

## Total Steps: 78
```
0    Sign of the Cross
1    Apostles' Creed
2    Our Father
3-5  3 × Hail Mary
6    Glory Be
7    Mystery 1 Announcement
8    Our Father
9-18 10 × Hail Mary
19   Glory Be
20   Fatima Prayer
21-34  Mystery 2 (same 14-step block)
35-48  Mystery 3
49-62  Mystery 4
63-76  Mystery 5
77   Hail Holy Queen
```

## Layout
```
<main>
  ├─ Header Row
  │   ├─ Back button (→ "/")
  │   ├─ Center: Mystery set title + "Decade X / 5"
  │   └─ Spacer (for centering)
  │
  ├─ <ProgressIndicator> (progress bar + percentage)
  │
  ├─ [if finished]
  │   └─ Completion screen (icon + heading + CTA buttons)
  │
  └─ [if praying]
      ├─ <PrayerDisplay>
      │   ├─ Prayer label pill (centered)
      │   ├─ [if mystery step] Mystery highlight box (purple bg)
      │   └─ Prayer text card (white bg, centered text)
      │
      └─ Navigation Row
          ├─ Previous button (disabled at step 0)
          ├─ Step counter ("3 / 78")
          └─ Next button (primary, disabled at step 77)
```

## Sections Detail

### Header Row
- Back: `<ArrowLeft>` + "Naspäť / Back"
- Title: `mysterySet.title` in current language
- Subtitle: "Desiatok X / 5" in current language

### Progress Indicator
- Label row: "Pokrok / Progress" + percentage
- Bar: `h-2`, `bg-stone-200` track, `bg-rosary-purple` fill, animated width

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

### Navigation Row
- **Previous**: `bg-stone-100`, disabled at step 0
- **Counter**: `text-xs text-stone-400`, tabular-nums
- **Next**: `bg-rosary-purple text-white`, disabled at last step

## Error State
If `mysterySetId` is invalid, shows centered "Tajomstvo nenájdené / Mystery not found" with a "Back home" button.

## Decade Calculation
```ts
currentDecade = Math.max(0, Math.min(4, Math.floor((step - 7) / 14)))
```

## Mobile
- Same layout. Navigation buttons remain visible at bottom.
- Back button hides label text on small screens (icon only).
