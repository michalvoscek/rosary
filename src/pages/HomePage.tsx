import { useLanguage } from "../contexts/LanguageContext";
import { getMysteryForDay, weekdayNames } from "../data/mysteries";
import { MysteryCard } from "../components/MysteryCard";

export function HomePage() {
  const { t } = useLanguage();
  const today = new Date().getDay();

  return (
    <div className="space-y-8">
      {/* All weekdays */}
      <section className="space-y-3">
        <div className="grid gap-3">
          {[1, 2, 3, 4, 5, 6, 0].map((day) => {
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
