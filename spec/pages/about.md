# Page: About (`/about`)

## Purpose
Educational / informational page. Explains how to pray the rosary, shows the daily mystery schedule, and lists the prayer structure step-by-step.

## Route
`/about`

## State
- None (reads from static data)

## Layout
```
<main>
  ├─ Hero Section (text-center)
  │   ├─ H1: "Ako sa modliť ruženec" / "How to Pray the Rosary"
  │   └─ Subtitle paragraph
  │
  ├─ Card: Daily Schedule
  │   ├─ Header: <Calendar> + "Rozdelenie podľa dní" / "Daily Schedule"
  │   └─ List of 4 mystery sets
  │       ├─ Each row: color dot + name + subtitle
  │       └─ Today's row highlighted with purple border/bg + "Dnes / Today" badge
  │
  └─ Card: Prayer Structure
      ├─ Header: <BookOpen> + "Štruktúra modlitby" / "Prayer Structure"
      └─ Numbered list (1–10 steps)
          ├─ Each step: numbered circle + prayer name
          └─ Footer note: steps 6–9 repeat for each decade
```

## Sections Detail

### Hero Section
- Same style as Home page hero (large bold H1 + centered subtitle)

### Daily Schedule Card
- `bg-white`, `rounded-2xl`, `border border-stone-200`, `p-6`
- Header: `text-rosary-purple`, `<Calendar size={20} />` + section title
- 4 rows, one per mystery set:
  - Color dot (`w-3 h-3 rounded-full`)
  - Name (`font-medium text-stone-900`)
  - Subtitle (`text-xs text-stone-500`)
  - Today's row: `bg-rosary-purple/5`, `border-rosary-purple/20`, rounded-xl
  - Badge on today's row: `text-rosary-purple bg-rosary-purple/10`, rounded-full, `text-xs`

### Prayer Structure Card
- Same card styling
- Header: `text-rosary-purple`, `<BookOpen size={20} />` + section title
- Numbered list (10 items):
  - Number: `w-6 h-6 rounded-full bg-stone-100 text-stone-600`, centered, `text-xs`
  - Text: `text-stone-700`
- Footer note: `text-sm text-stone-500`, `border-t border-stone-100`, `pt-2`

## Content (bilingual)

| # | SK | EN |
|---|-----|-----|
| 1 | Ľudské znamenie | Sign of the Cross |
| 2 | Apoštolské vyznanie viery | Apostles' Creed |
| 3 | Otče náš | Our Father |
| 4 | 3x Zdravas Mária | 3 Hail Marys |
| 5 | Sláva Otcu | Glory Be |
| 6 | Oznámenie tajomstva + Otče náš | Announce mystery + Our Father |
| 7 | 10x Zdravas Mária | 10 Hail Marys |
| 8 | Sláva Otcu | Glory Be |
| 9 | Fatimská prosba | Fatima Prayer |
| 10 | Zdravas Kráľovná | Hail Holy Queen |

## Mobile
- Cards stack vertically (already single column)
- Bottom nav visible (Home + About)
