import { useLanguage } from "../contexts/LanguageContext";

interface ProgressIndicatorProps {
  currentStep: number;
}

interface Stage {
  sk: string;
  en: string;
  start: number;
  end: number;
}

const SECTIONS: Stage[] = [
  { sk: "Úvod", en: "Start", start: 0, end: 6 },
  { sk: "Desiatok 1", en: "Decade 1", start: 7, end: 19 },
  { sk: "Desiatok 2", en: "Decade 2", start: 20, end: 32 },
  { sk: "Desiatok 3", en: "Decade 3", start: 33, end: 45 },
  { sk: "Desiatok 4", en: "Decade 4", start: 46, end: 58 },
  { sk: "Desiatok 5", en: "Decade 5", start: 59, end: 71 },
];

function getStage(step: number): Stage {
  return SECTIONS.find((section) => step <= section.end) ?? SECTIONS[5];
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const { t } = useLanguage();
  const stage = getStage(currentStep);
  const stageSize = stage.end - stage.start + 1;
  const stageProgress =
    stageSize === 1
      ? 100
      : Math.round(((currentStep - stage.start) / (stageSize)) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-stone-700">
        <span className="font-medium">
          {t({ sk: stage.sk, en: stage.en })}
        </span>
        <span>{stageProgress}%</span>
      </div>
      <div className="flex gap-1">
        {SECTIONS.map((section) => {
          const sectionSize = section.end - section.start + 1;
          const fill = Math.min(
            1,
            Math.max(0, (currentStep - section.start) / sectionSize),
          );

          return (
            <div
              key={section.sk}
              className="h-2 bg-stone-400 rounded-full overflow-hidden"
              style={{ flexGrow: sectionSize }}
            >
              <div
                className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                style={{ width: `${fill * 100}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
