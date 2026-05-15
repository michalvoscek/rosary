import { useLanguage } from '../contexts/LanguageContext';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const { t } = useLanguage();
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>{t({ sk: 'Pokrok', en: 'Progress' })}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-rosary-purple rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
