import { useLanguage } from "../contexts/LanguageContext";
import { prayers, prayerLabels } from "../data/prayers";
import { mysteryMeditations } from "../data/mysteryMeditations";
import type { Mystery } from "../types";
import type { ReactNode } from "react";

interface PrayerDisplayProps {
  step: number;
  mysterySetId: string;
  decadeIndex: number;
  mystery: Mystery;
  hailMaryCount?: number;
}

function buildHailMaryWithMeditation(
  baseText: string,
  lang: string,
  meditationText: string,
): ReactNode {
  const targetWord = lang === "sk" ? "Ježiš" : "Jesus";
  const parts = baseText.split(`${targetWord}.`);

  if (parts.length !== 2) {
    // Fallback if split doesn't work as expected
    return baseText;
  }

  return (
    <>
      {parts[0]}
      {targetWord},{"\n"}
      <strong>{meditationText}</strong>.{"\n"}
      {parts[1]}
    </>
  );
}

export function PrayerDisplay({ step, mysterySetId }: PrayerDisplayProps) {
  const { lang } = useLanguage();
  const l = lang;
  const t = (obj: { sk: string; en: string }) => obj[l];

  const getPrayer = (s: number): { label: string; text: ReactNode } => {
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
      const baseText = t(prayers.hailMaryFull);
      const meditations = mysteryMeditations[mysterySetId];
      let text: ReactNode = baseText;
      if (meditations) {
        const startKey = s === 3 ? "start1" : s === 4 ? "start2" : "start3";
        const meditationText = t(
          meditations[startKey as keyof typeof meditations],
        );
        text = buildHailMaryWithMeditation(baseText, l, meditationText);
      }
      return { label: t(prayerLabels.hailMary), text };
    }
    if (s === 6) {
      return { label: t(prayerLabels.gloryBe), text: t(prayers.gloryBe) };
    }

    const decadeStart = 7;
    const blockSize = 13;

    if (s >= decadeStart && s < decadeStart + blockSize * 5) {
      const offset = s - decadeStart;
      const decade = Math.floor(offset / blockSize);
      const sub = offset % blockSize;

      if (sub === 0) {
        return { label: t(prayerLabels.ourFather), text: t(prayers.ourFather) };
      }
      if (sub >= 1 && sub <= 10) {
        const baseText = t(prayers.hailMaryFull);
        const meditations = mysteryMeditations[mysterySetId];
        let text: ReactNode = baseText;
        if (meditations) {
          const decadeKey = `decade${decade + 1}` as keyof typeof meditations;
          const meditationText = t(meditations[decadeKey]);
          text = buildHailMaryWithMeditation(baseText, l, meditationText);
        }
        return {
          label: `${t(prayerLabels.hailMary)} (${sub}/10)`,
          text,
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

    return { label: "", text: "" };
  };

  const { label, text } = getPrayer(step);

  return (
    <div className="bg-rosary-beige-light rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col">
      <div className="text-center shrink-0">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 mb-3">
          {label}
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <p className="text-lg sm:text-xl leading-relaxed text-stone-800 whitespace-pre-wrap text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
