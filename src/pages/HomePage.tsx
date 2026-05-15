import { useLanguage } from '../contexts/LanguageContext';
import { getMysteryForDay, weekdayNames } from '../data/mysteries';
import { MysteryCard } from '../components/MysteryCard';
import { Calendar } from 'lucide-react';

export function HomePage() {
  const { t } = useLanguage();
  const today = new Date().getDay();

  const todayName = new Date().toLocaleDateString('sk-SK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rosary-purple/10 text-rosary-purple text-sm font-medium">
          <Calendar size={16} />
          <span>{todayName}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {t({ sk: 'Ruženec', en: 'Rosary' })}
        </h1>
        <p className="text-stone-600 max-w-md mx-auto">
          {t({
            sk: 'Modlitba ruženca je krásnou cestou k hlbšiemu spojeniu s Bohom cez Pannu Máriu.',
            en: 'The Rosary is a beautiful path to deeper communion with God through the Virgin Mary.',
          })}
        </p>
      </section>

      {/* All weekdays */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 uppercase tracking-wide">
          <span className="w-6 h-px bg-stone-300" />
          {t({ sk: 'Dni v týždni', en: 'Weekdays' })}
          <span className="w-6 h-px bg-stone-300" />
        </div>
        <div className="grid gap-3">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const mysterySet = getMysteryForDay(day);
            const isToday = day === today;
            return (
              <MysteryCard
                key={day}
                mysterySet={mysterySet}
                isRecommended={isToday}
                weekdayLabel={t({
                  sk: weekdayNames.sk[day],
                  en: weekdayNames.en[day],
                })}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
