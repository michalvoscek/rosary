# Page: Home (`/`)

## Purpose

The landing page. Shows all weekdays but highlights mystery for current weekday.

## Route

`/`

## Sections Detail

### Hero Section

- **Date pill**: `inline-flex`, rounded-full, `bg-rosary-purple/10 text-rosary-purple`
- **H1**: `text-3xl sm:text-4xl font-bold text-stone-900`
- **Subtitle**: `text-stone-600 max-w-md mx-auto`
- Content changes with language

### All weekdays

- Every weekday has mystery assigned
- Current weekday has isRecommended set to true
- Each is a `<MysteryCard>` without the recommendation badge
