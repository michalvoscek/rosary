import { useCallback, useState } from "react";
import { getDateKey, recordPrayerDay } from "../lib/streak";

interface StartMarker {
  mysterySetId: string;
  date: string;
}

export function usePrayerStreak(
  currentStep: number,
  mysterySetId: string,
  isValidMysterySet: boolean,
) {
  // A prayer session only starts when the user begins at step 0. The start
  // day is kept in component state, which survives navigation between steps
  // (the component stays mounted) but not a page refresh. Set during render
  // (not in an effect) per the "adjust state when props change" pattern.
  const [startMarker, setStartMarker] = useState<StartMarker | null>(null);

  if (
    currentStep === 0 &&
    isValidMysterySet &&
    (!startMarker ||
      startMarker.mysterySetId !== mysterySetId ||
      startMarker.date !== getDateKey())
  ) {
    setStartMarker({ mysterySetId, date: getDateKey() });
  }

  const recordPrayerDayIfStarted = useCallback(() => {
    if (!startMarker || startMarker.mysterySetId !== mysterySetId) return;
    void recordPrayerDay(startMarker.date).catch(() => {});
    setStartMarker(null);
  }, [startMarker, mysterySetId]);

  return { recordPrayerDayIfStarted };
}
