# Page: Home (`/`)

## Purpose

The landing page. Shows all weekdays but highlights mystery for current weekday.

## Route

`/`

## Sections Detail

### Hero Section

- **Date pill**: `inline-flex`, rounded-full, `bg-rosary-purple/10 text-rosary-purple`
- Content changes with language

### All weekdays

- Every weekday has a mystery assigned
- The current weekday has `isRecommended` set to `true`
- Each is a `<MysteryCard>`
