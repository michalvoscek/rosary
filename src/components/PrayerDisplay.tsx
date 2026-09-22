import { useLanguage } from "../contexts/LanguageContext";
import { getPrayerStep } from "../lib/prayerStep";
import type { Mystery } from "../types";

interface PrayerDisplayProps {
  step: number;
  mysterySetId: string;
  decadeIndex: number;
  mystery: Mystery;
  hailMaryCount?: number;
}

export function PrayerDisplay({ step, mysterySetId }: PrayerDisplayProps) {
  const { lang, t } = useLanguage();

  const { text } = getPrayerStep({
    t,
    lang,
    step,
    mysterySetId,
  });

  return (
    <div className="bg-surface rounded-2xl border border-line p-6 sm:p-8 flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <p className="text-lg sm:text-xl leading-relaxed text-body-soft whitespace-pre-wrap text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
