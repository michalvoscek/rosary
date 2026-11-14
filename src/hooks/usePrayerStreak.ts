import { useEffect } from "react";
import { getDateKey, recordPrayerDay } from "../lib/streak";
import { STREAK_UPDATED_EVENT } from "./useStreak";

export function usePrayerStreak(
  currentStep: number,
  mysterySetId: string,
  isValidMysterySet: boolean,
) {
  useEffect(() => {
    if (currentStep !== 0 || !isValidMysterySet) return;

    // Only opening the first step counts. Later steps cannot add another day
    // when a prayer continues past midnight or the page is refreshed.
    const date = getDateKey();
    const record = async () => {
      try {
        await recordPrayerDay(date);
        window.dispatchEvent(new Event(STREAK_UPDATED_EVENT));
      } catch {
        // Ignore: streak will not be counted for this day.
      }
    };
    void record();
  }, [currentStep, mysterySetId, isValidMysterySet]);
}
