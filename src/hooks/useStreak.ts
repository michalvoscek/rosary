import { useEffect, useState } from "react";
import { getPrayerDays, getStreak } from "../lib/streak";

export const STREAK_UPDATED_EVENT = "rosary:streak-updated";

export function useStreak(): number {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      try {
        const days = await getPrayerDays();
        if (!cancelled) setStreak(getStreak(days));
      } catch {
        // Ignore: keep the last known streak.
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

  return streak;
}
