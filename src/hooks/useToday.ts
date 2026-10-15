import { useEffect, useState } from "react";

/**
 * Current weekday (0 = Sunday), kept fresh when the app stays open
 * across midnight or resumes from background (PWA), so day-sensitive
 * UI never renders with a stale date.
 */
export function useToday(): number {
  const [today, setToday] = useState(() => new Date().getDay());

  useEffect(() => {
    // React bails out of re-rendering when the value is unchanged.
    const check = () => {
      const day = new Date().getDay();
      setToday((prev) => (prev === day ? prev : day));
    };
    // Fires exactly when the app is resumed from background.
    document.addEventListener("visibilitychange", check);
    // Matches the refresh pattern used by usePrayerDays / useStreak.
    window.addEventListener("focus", check);
    // Fallback for an idle foreground tab crossing midnight.
    const interval = setInterval(check, 60_000);
    return () => {
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
      clearInterval(interval);
    };
  }, []);

  return today;
}
