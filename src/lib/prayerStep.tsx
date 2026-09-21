import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { BilingualText, Language } from "../types";
import { prayers, prayerLabels } from "../data/prayers";
import { mysteryMeditations } from "../data/mysteryMeditations";

export interface PrayerStep {
  label: string;
  text: ReactNode;
  icon?: ReactNode;
}

export const TOTAL_STEPS = 7 + 13 * 5; // 72

interface PrayerStepParams {
  t: (bilingual: BilingualText) => string;
  lang: Language;
  step: number | "finished";
  mysterySetId: string;
}

function buildHailMaryWithMeditation(
  baseText: string,
  lang: Language,
  meditationText: string,
): ReactNode {
  const targetWord = lang === "sk" ? "Ježiš" : "Jesus";
  const parts = baseText.split(`${targetWord}.`);

  if (parts.length !== 2) {
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

export function getPrayerStep({
  t,
  lang,
  step,
  mysterySetId,
}: PrayerStepParams): PrayerStep {
  if (step === "finished") {
    return {
      label: t({ sk: "Ruženec dokončený", en: "Rosary completed" }),
      text: t({
        sk: "Ďakujeme za spoločnú modlitbu. Nech vás Panna Mária ochraňuje.",
        en: "Thank you for praying with us. May the Virgin Mary protect you.",
      }),
      icon: <Check size={28} />,
    };
  }
  if (step === 0) {
    return {
      label: t(prayerLabels.signOfTheCross),
      text: t(prayers.signOfTheCross),
    };
  }
  if (step === 1) {
    return {
      label: t(prayerLabels.apostlesCreed),
      text: t(prayers.apostlesCreed),
    };
  }
  if (step === 2) {
    return { label: t(prayerLabels.ourFather), text: t(prayers.ourFather) };
  }
  if (step >= 3 && step <= 5) {
    const baseText = t(prayers.hailMaryFull);
    const meditations = mysteryMeditations[mysterySetId];
    let text: ReactNode = baseText;
    if (meditations) {
      const startKey = step === 3 ? "start1" : step === 4 ? "start2" : "start3";
      const meditationText = t(
        meditations[startKey as keyof typeof meditations],
      );
      text = buildHailMaryWithMeditation(baseText, lang, meditationText);
    }
    return {
      label: `${t(prayerLabels.hailMary)} (${step - 2}/3)`,
      text,
    };
  }
  if (step === 6) {
    return { label: t(prayerLabels.gloryBe), text: t(prayers.gloryBe) };
  }

  const decadeStart = 7;
  const blockSize = 13;

  if (step >= decadeStart && step < decadeStart + blockSize * 5) {
    const offset = step - decadeStart;
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
        text = buildHailMaryWithMeditation(baseText, lang, meditationText);
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
}
