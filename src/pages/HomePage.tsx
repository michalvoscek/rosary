import { useLanguage } from '../contexts/LanguageContext';
import { mysterySets, getTodaysMysterySet } from '../data/mysteries';
import { MysteryCard } from '../components/MysteryCard';
import { Calendar, ChevronRight } from 'lucide-react';

export function HomePage() {
  const { t } = useLanguage();
  const today = getTodaysMysterySet();
  const todayId = today.id;

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

      {/* Today's recommendation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 uppercase tracking-wide">
          <span className="w-6 h-px bg-stone-300" />
          {t({ sk: 'Dnes sa modlíme', en: 'Pray today' })}
          <span className="w-6 h-px bg-stone-300" />
        </div>
        <MysteryCard mysterySet={today} isRecommended />
      </section>

      {/* All mysteries */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 uppercase tracking-wide">
          <span className="w-6 h-px bg-stone-300" />
          {t({ sk: 'Všetky tajomstvá', en: 'All mysteries' })}
          <span className="w-6 h-px bg-stone-300" />
        </div>
        <div className="grid gap-3">
          {mysterySets
            .filter((m) => m.id !== todayId)
            .map((mysterySet) => (
              <MysteryCard key={mysterySet.id} mysterySet={mysterySet} />
            ))}
        </div>
      </section>
    </div>
  );
}
