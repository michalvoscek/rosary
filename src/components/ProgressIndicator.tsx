import { useLanguage } from '../contexts/LanguageContext';

interface ProgressIndicatorProps {
  currentStep: number;
}

interface Stage {
  sk: string;
  en: string;
  start: number;
  end: number;
}

function getStage(step: number): Stage {
  if (step <= 6) {
    return { sk: 'Úvod', en: 'Start', start: 0, end: 6 };
  }
  if (step <= 19) {
    return { sk: 'Desiatok 1', en: 'Decade 1', start: 7, end: 19 };
  }
  if (step <= 32) {
    return { sk: 'Desiatok 2', en: 'Decade 2', start: 20, end: 32 };
  }
  if (step <= 45) {
    return { sk: 'Desiatok 3', en: 'Decade 3', start: 33, end: 45 };
  }
  if (step <= 58) {
    return { sk: 'Desiatok 4', en: 'Decade 4', start: 46, end: 58 };
  }
  if (step <= 71) {
    return { sk: 'Desiatok 5', en: 'Decade 5', start: 59, end: 71 };
  }
  return { sk: 'Zdravas Kráľovná', en: 'Hail Holy Queen', start: 72, end: 72 };
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const { t } = useLanguage();
  const stage = getStage(currentStep);
  const stageSize = stage.end - stage.start + 1;
  const stageProgress =
    stageSize === 1
      ? 100
      : Math.round(((currentStep - stage.start) / (stageSize - 1)) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span className="font-medium text-stone-700">{t({ sk: stage.sk, en: stage.en })}</span>
        <span>{stageProgress}%</span>
      </div>
      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-rosary-purple rounded-full transition-all duration-500 ease-out"
          style={{ width: `${stageProgress}%` }}
        />
      </div>
    </div>
  );
}
