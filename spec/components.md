# Components Specification

## Layout (`Layout.tsx`)
**File**: `src/components/Layout.tsx`

### Props
| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Page content |

### Structure
```
<div min-h-screen flex flex-col bg-stone-50>
  ├─ <header> (sticky top-0, z-50)
  │   └─ <div> max-w-2xl, h-14, flex justify-between
  │       ├─ Logo (BookOpen + "Rosary")
  │       └─ Language toggle (Globe + "SK" | "EN")
  │
  ├─ <main> (flex-1, max-w-2xl, mx-auto, px-4, py-6 sm:py-8)
  │   └─ {children}
```

### Language Toggle
- Button with `<Globe size={16} />` + uppercase language code
- Calls `toggleLang()` from `useLanguage()`
- Changes immediately; all text re-renders via Context

---

## MysteryCard (`MysteryCard.tsx`)
**File**: `src/components/MysteryCard.tsx`

### Props
| Prop | Type | Description |
|------|------|-------------|
| `mysterySet` | `MysterySetData` | The mystery set to display |
| `isRecommended` | `boolean` | Show "Dnes / Today" badge |
| `weekdayLabel` | `string` | Optional weekday name to show instead of subtitle |

### Structure
```
<a> (block, rounded-2xl, border, bg-white, hover:shadow-md, active:scale-[0.98])
  ├─ Header Row (flex justify-between)
  │   ├─ Title + Subtitle (or weekdayLabel)
  │   └─ [if isRecommended] Badge (rounded-full, white text, mystery color bg)
```

### Interactions
- Click → `href={`/pray/${mysterySet.id}`}` (browser navigation, SPA handled by Router)
- Hover: shadow, border darkens
- Active press: scale down slightly

---

## PrayerDisplay (`PrayerDisplay.tsx`)
**File**: `src/components/PrayerDisplay.tsx`

### Props
| Prop | Type | Description |
|------|------|-------------|
| `step` | `number` | Current prayer step (0–72) |
| `mysterySetId` | `string` | Mystery set ID |
| `decadeIndex` | `number` | Current decade (0–4) |

### Structure
```
<div space-y-6>
  ├─ Label pill (centered, text-xs, bg-stone-100)
  │
  └─ Prayer Text Card (bg-white, border, rounded-2xl, p-6 sm:p-8)
      └─ Text (text-lg sm:text-xl, centered, leading-relaxed)
```

### Step Mapping Logic
The component contains a `getPrayer(s: number)` function that returns `{ label, text }` based on the step number. It uses the current language from `useLanguage()` to select the correct text.

See [`spec/prayer-steps.md`](prayer-steps.md) for the canonical 78-step definition.

---

## ProgressIndicator (`ProgressIndicator.tsx`)
**File**: `src/components/ProgressIndicator.tsx`

### Props
| Prop | Type | Description |
|------|------|-------------|
| `currentStep` | `number` | Current step (0–72) |

### Structure
```
<div space-y-2>
  ├─ Row (flex justify-between, text-xs)
  │   ├─ Stage label (font-medium text-stone-700)
  │   │   e.g. "Úvod / Start", "Desiatok 1 / Decade 1", "Zdravas Kráľovná / Hail Holy Queen"
  │   └─ Stage percentage (text-stone-500)
  │
  └─ Bar (h-2, bg-stone-200, rounded-full, overflow-hidden)
      └─ Fill (h-full, bg-rosary-purple, rounded-full, animated)
```

### Animation
Fill width uses `transition-all duration-500 ease-out` for smooth progress updates.

---

## LanguageContext (`LanguageContext.tsx`)
**File**: `src/contexts/LanguageContext.tsx`

### API
| Export | Type | Description |
|--------|------|-------------|
| `LanguageProvider` | `React.FC<{ children }>` | Wraps app; reads `localStorage` on init |
| `useLanguage` | `() => LanguageContextValue` | Hook for consuming context |

### Context Value
```ts
interface LanguageContextValue {
  lang: Language;           // 'sk' | 'en'
  setLang: (lang: Language) => void;  // Set and save to localStorage
  toggleLang: () => void;   // Toggle between sk/en
  t: (bilingual: BilingualText) => string;  // Helper: returns text in current lang
}
```

### Persistence
- Reads `rosary-lang` from `localStorage` on mount
- Saves to `rosary-lang` on every change
- Defaults to `sk` if no value stored
