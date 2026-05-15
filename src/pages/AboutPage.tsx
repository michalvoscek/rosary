import { useLanguage } from '../contexts/LanguageContext';
import { mysterySets, getTodaysMysterySet } from '../data/mysteries';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

export function AboutPage() {
  const { t } = useLanguage();
  const today = getTodaysMysterySet();

  return (
    <div className="space-y-8">
      <section className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {t({ sk: 'Ako sa modliť ruženec', en: 'How to Pray the Rosary' })}
        </h1>
        <p className="text-stone-600 max-w-lg mx-auto">
          {t({
            sk: 'Ruženec je tradičná katolícka modlitba, ktorá nás vedie cez tajomstvá života Ježiša Krista a Panny Márie.',
            en: 'The Rosary is a traditional Catholic prayer that leads us through the mysteries of the life of Jesus Christ and the Virgin Mary.',
          })}
        </p>
      </section>

      {/* Daily schedule */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-rosary-purple">
          <Calendar size={20} />
          <h2 className="font-semibold text-lg">{t({ sk: 'Rozdelenie podľa dní', en: 'Daily Schedule' })}</h2>
        </div>
        <div className="space-y-2">
          {mysterySets.map((ms) => {
            const isToday = ms.id === today.id;
            return (
              <div
                key={ms.id}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  isToday ? 'bg-rosary-purple/5 border border-rosary-purple/20' : 'bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ms.color }}
                  />
                  <div>
                    <p className="font-medium text-stone-900">{t(ms.title)}</p>
                    <p className="text-xs text-stone-500">{t(ms.subtitle)}</p>
                  </div>
                </div>
                {isToday && (
                  <span className="text-xs font-medium text-rosary-purple bg-rosary-purple/10 px-2 py-0.5 rounded-full">
                    {t({ sk: 'Dnes', en: 'Today' })}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Structure */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-rosary-purple">
          <BookOpen size={20} />
          <h2 className="font-semibold text-lg">{t({ sk: 'Štruktúra modlitby', en: 'Prayer Structure' })}</h2>
        </div>
        <ol className="space-y-3">
          {[
            { sk: 'Ľudské znamenie', en: 'Sign of the Cross' },
            { sk: 'Apoštolské vyznanie viery', en: "Apostles' Creed" },
            { sk: 'Otče náš', en: 'Our Father' },
            { sk: '3x Zdravas Mária', en: '3 Hail Marys' },
            { sk: 'Sláva Otcu', en: 'Glory Be' },
            { sk: 'Oznamovanie tajomstva + Otče náš', en: 'Announce mystery + Our Father' },
            { sk: '10x Zdravas Mária', en: '10 Hail Marys' },
            { sk: 'Sláva Otcu', en: 'Glory Be' },
            { sk: 'Fatimská prosba', en: 'Fatima Prayer' },
            { sk: 'Zdravas Kráľovná', en: 'Hail Holy Queen' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 text-stone-600 text-xs font-medium flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-stone-700">{t(item)}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-stone-500 pt-2 border-t border-stone-100">
          {t({
            sk: 'Body 6–9 sa opakujú pre každý z piatich desiatkov ruženca.',
            en: 'Steps 6–9 are repeated for each of the five decades of the rosary.',
          })}
        </p>
      </section>
    </div>
  );
}
