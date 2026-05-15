import { useLanguage } from "../contexts/LanguageContext";
import { prayers, prayerLabels } from "../data/prayers";
import type { Mystery } from "../types";

interface PrayerDisplayProps {
  step: number;
  mysterySetId: string;
  decadeIndex: number;
  mystery: Mystery;
  hailMaryCount?: number;
}

export function PrayerDisplay({ step }: PrayerDisplayProps) {
  const { lang } = useLanguage();
  const l = lang;
  const t = (obj: { sk: string; en: string }) => obj[l];

  const getPrayer = (s: number): { label: string; text: string } => {
    if (s === 0) {
      return {
        label: t(prayerLabels.signOfTheCross),
        text: t(prayers.signOfTheCross),
      };
    }
    if (s === 1) {
      return {
        label: t(prayerLabels.apostlesCreed),
        text: t(prayers.apostlesCreed),
      };
    }
    if (s === 2) {
      return { label: t(prayerLabels.ourFather), text: t(prayers.ourFather) };
    }
    if (s >= 3 && s <= 5) {
      return { label: t(prayerLabels.hailMary), text: t(prayers.hailMaryFull) };
    }
    if (s === 6) {
      return { label: t(prayerLabels.gloryBe), text: t(prayers.gloryBe) };
    }

    const decadeStart = 7;
    const blockSize = 13;

    if (s >= decadeStart && s < decadeStart + blockSize * 5) {
      const offset = s - decadeStart;
      const sub = offset % blockSize;

      if (sub === 0) {
        return { label: t(prayerLabels.ourFather), text: t(prayers.ourFather) };
      }
      if (sub >= 1 && sub <= 10) {
        return {
          label: `${t(prayerLabels.hailMary)} (${sub}/10)`,
          text: t(prayers.hailMaryFull),
        };
      }
      if (sub === 11) {
        return { label: t(prayerLabels.gloryBe), text: t(prayers.gloryBe) };
      }
      if (sub === 12) {
        return {
          label: t(prayerLabels.fatimaPrayer),
          text: t(prayers.fatimaPrayer),
        };
      }
    }

    if (s === decadeStart + blockSize * 5) {
      return {
        label: t(prayerLabels.hailHolyQueen),
        text: t(prayers.hailHolyQueen),
      };
    }

    return { label: "", text: "" };
  };

  const { label, text } = getPrayer(step);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 mb-3">
          {label}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
        <p className="text-lg sm:text-xl leading-relaxed text-stone-800 whitespace-pre-wrap text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
