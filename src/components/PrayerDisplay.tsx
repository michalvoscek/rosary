import { useLanguage } from '../contexts/LanguageContext';
import { prayers, prayerLabels } from '../data/prayers';
import type { Mystery } from '../types';

interface PrayerDisplayProps {
  step: number;
  mysterySetId: string;
  decadeIndex: number;
  mystery: Mystery;
  hailMaryCount?: number;
}

function getPrayerForStep(step: number, mystery: Mystery, hailMaryCount: number): { label: string; text: string } {
  // Steps:
  // 0: Sign of the Cross
  // 1: Apostles' Creed
  // 2: Our Father
  // 3-5: 3 Hail Marys
  // 6: Glory Be
  // 7-16: Decade (mystery + Our Father + 10 Hail Marys + Glory Be + Fatima)
  //   7: Mystery announcement
  //   8: Our Father
  //   9-18: 10 Hail Marys
  //   19: Glory Be
  //   20: Fatima Prayer
  // Each decade block is 14 steps. 5 decades = 70 steps.
  // 21-34: Decade 2
  // 35-48: Decade 3
  // 49-62: Decade 4
  // 63-76: Decade 5
  // 77: Hail Holy Queen

  const { t } = useLanguage();

  if (step === 0) {
    return { label: t(prayerLabels.signOfTheCross), text: prayers.signOfTheCross.en }; // Will use hook below
  }
  if (step === 1) {
    return { label: t(prayerLabels.apostlesCreed), text: prayers.apostlesCreed.en };
  }
  if (step === 2) {
    return { label: t(prayerLabels.ourFather), text: prayers.ourFather.en };
  }
  if (step >= 3 && step <= 5) {
    return { label: t(prayerLabels.hailMary), text: prayers.hailMaryFull.en };
  }
  if (step === 6) {
    return { label: t(prayerLabels.gloryBe), text: prayers.gloryBe.en };
  }

  const decadeStart = 7;
  const blockSize = 14;

  if (step >= decadeStart && step < decadeStart + blockSize * 5) {
    const offset = step - decadeStart;
    const block = Math.floor(offset / blockSize);
    const sub = offset % blockSize;

    if (sub === 0) {
      return { label: t(prayerLabels.mystery), text: mystery.name.en };
    }
    if (sub === 1) {
      return { label: t(prayerLabels.ourFather), text: prayers.ourFather.en };
    }
    if (sub >= 2 && sub <= 11) {
      return { label: t(prayerLabels.hailMary), text: prayers.hailMaryFull.en };
    }
    if (sub === 12) {
      return { label: t(prayerLabels.gloryBe), text: prayers.gloryBe.en };
    }
    if (sub === 13) {
      return { label: t(prayerLabels.fatimaPrayer), text: prayers.fatimaPrayer.en };
    }
  }

  if (step === decadeStart + blockSize * 5) {
    return { label: t(prayerLabels.hailHolyQueen), text: prayers.hailHolyQueen.en };
  }

  return { label: '', text: '' };
}

export function PrayerDisplay({ step, mystery }: PrayerDisplayProps) {
  const { lang } = useLanguage();

  // Re-implement getPrayerForStep with direct lang access
  const getPrayer = (s: number): { label: string; text: string } => {
    const l = lang;
    const t = (obj: { sk: string; en: string }) => obj[l];

    if (s === 0) {
      return { label: t(prayerLabels.signOfTheCross), text: t(prayers.signOfTheCross) };
    }
    if (s === 1) {
      return { label: t(prayerLabels.apostlesCreed), text: t(prayers.apostlesCreed) };
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
    const blockSize = 14;

    if (s >= decadeStart && s < decadeStart + blockSize * 5) {
      const offset = s - decadeStart;
      const sub = offset % blockSize;

      if (sub === 0) {
        return { label: t(prayerLabels.mystery), text: t(mystery.name) };
      }
      if (sub === 1) {
        return { label: t(prayerLabels.ourFather), text: t(prayers.ourFather) };
      }
      if (sub >= 2 && sub <= 11) {
        return { label: `${t(prayerLabels.hailMary)} (${sub - 1}/10)`, text: t(prayers.hailMaryFull) };
      }
      if (sub === 12) {
        return { label: t(prayerLabels.gloryBe), text: t(prayers.gloryBe) };
      }
      if (sub === 13) {
        return { label: t(prayerLabels.fatimaPrayer), text: t(prayers.fatimaPrayer) };
      }
    }

    if (s === decadeStart + blockSize * 5) {
      return { label: t(prayerLabels.hailHolyQueen), text: t(prayers.hailHolyQueen) };
    }

    return { label: '', text: '' };
  };

  const { label, text } = getPrayer(step);

  // Determine what to show for the mystery step
  const isMysteryStep = () => {
    const decadeStart = 7;
    const blockSize = 14;
    if (step >= decadeStart && step < decadeStart + blockSize * 5) {
      const offset = step - decadeStart;
      const sub = offset % blockSize;
      return sub === 0;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 mb-3">
          {label}
        </span>
      </div>

      {isMysteryStep() && (
        <div className="bg-rosary-purple/5 border border-rosary-purple/20 rounded-2xl p-6 text-center">
          <p className="text-sm text-rosary-purple font-medium uppercase tracking-wide mb-2">
            {lang === 'sk' ? 'Tajomstvo' : 'Mystery'}
          </p>
          <h2 className="text-2xl font-bold text-stone-900">{lang === 'sk' ? mystery.name.sk : mystery.name.en}</h2>
          <p className="text-stone-600 mt-2 max-w-md mx-auto">{lang === 'sk' ? mystery.description.sk : mystery.description.en}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
        <p className="text-lg sm:text-xl leading-relaxed text-stone-800 whitespace-pre-wrap text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
