import { useEffect, useState } from "react";
import { getPrayerDays } from "../lib/streak";
import { STREAK_UPDATED_EVENT } from "./useStreak";

export function usePrayerDays(): Set<string> {
  const [days, setDays] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      try {
        const result = await getPrayerDays();
        if (!cancelled) setDays(result);
      } catch {
        // Ignore: keep the last known days.
      }
    };
    refresh();
    window.addEventListener(STREAK_UPDATED_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener(STREAK_UPDATED_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return days;
}
