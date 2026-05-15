# Page: Home (`/`)

## Purpose
The landing page. Shows today's recommended mystery set based on the current day of the week, and a list of all four mystery sets available for prayer.

## Route
`/`

## State
- None (reads from `getTodaysMysterySet()`)

## Layout
```
<main max-w-2xl>
  ├─ Hero Section (text-center)
  │   ├─ Date pill          [Calendar icon + "15. mája 2026"]
  │   ├─ H1: "Ruženec" / "Rosary"
  │   └─ Subtitle paragraph
  │
  ├─ "Dnes sa modlíme" / "Pray today" (section)
  │   └─ <MysteryCard> for TODAY (with isRecommended badge)
  │
  └─ "Všetky tajomstvá" / "All mysteries" (section)
      └─ <MysteryCard> × 3 (remaining mystery sets)
```

## Sections Detail

### Hero Section
- **Date pill**: `inline-flex`, rounded-full, `bg-rosary-purple/10 text-rosary-purple`
- **H1**: `text-3xl sm:text-4xl font-bold text-stone-900`
- **Subtitle**: `text-stone-600 max-w-md mx-auto`
- Content changes with language

### Today's Mystery Section
- Section label: uppercase, tracking-wide, `text-stone-700`, with horizontal lines on sides
- Uses `<MysteryCard>` with `isRecommended={true}` → shows a colored "Dnes / Today" badge

### All Mysteries Section
- Same section label style
- Lists remaining 3 mystery sets (filter out today's)
- Each is a `<MysteryCard>` without the recommendation badge

## Interactions
- Clicking any `<MysteryCard>` navigates to `/pray/{mysterySetId}/0`

## Mobile
- Same layout; no bottom nav changes needed
