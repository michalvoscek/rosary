import { Link } from 'react-router-dom';
import { useLanguage } from "../contexts/LanguageContext";
import type { MysterySetData } from "../types";

interface MysteryCardProps {
  mysterySet: MysterySetData;
  isRecommended?: boolean;
  weekdayLabel?: string;
}

export function MysteryCard({
  mysterySet,
  isRecommended = false,
  weekdayLabel,
}: MysteryCardProps) {
  const { t } = useLanguage();

  return (
    <Link
      to={`/pray/${mysterySet.id}`}
      className="group block rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:shadow-md hover:border-stone-300 active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-lg text-stone-900">
            {t(mysterySet.title)}
          </h3>
          <p className="text-sm text-stone-500">
            {weekdayLabel || t(mysterySet.subtitle)}
          </p>
        </div>
        {isRecommended && (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: mysterySet.color }}
          >
            {t({ sk: "Dnes", en: "Today" })}
          </span>
        )}
      </div>
    </Link>
  );
}
