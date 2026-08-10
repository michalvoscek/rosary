import { useLanguage } from "../contexts/LanguageContext";
import { usePrayerDays } from "../hooks/usePrayerDays";
import { getDateKey } from "../lib/streak";
import { monthNames, weekdayNamesMondayFirst } from "../data/mysteries";

interface Month {
  year: number;
  month: number;
}

function getMonthRange(days: Set<string>): { first: Month; last: Month } {
  const today = new Date();
  const last = { year: today.getFullYear(), month: today.getMonth() };

  const earliest = [...days].sort()[0];
  if (!earliest) return { first: last, last };

  const [year, month] = earliest.split("-").map(Number);
  return { first: { year, month: month - 1 }, last };
}

function monthKey(month: Month): number {
  return month.year * 12 + month.month;
}

export function StreakCalendarPage() {
  const { t } = useLanguage();
  const days = usePrayerDays();
  const { first, last } = getMonthRange(days);
  const todayKey = getDateKey();

  const months: Month[] = [];
  for (let key = monthKey(first); key <= monthKey(last); key++) {
    months.push({ year: Math.floor(key / 12), month: key % 12 });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {months.map(({ year, month }) => {
          const firstDay = new Date(year, month, 1);
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const offset = (firstDay.getDay() + 6) % 7;
          const cells = offset + daysInMonth;
          const trailing = (7 - (cells % 7)) % 7;

          return (
            <section key={`${year}-${month}`}>
              <h2 className="mb-3 text-lg font-semibold">
                {t({ sk: monthNames.sk[month], en: monthNames.en[month] })}{" "}
                {year}
              </h2>
              <div className="grid grid-cols-7 gap-1">
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <div
                    key={day}
                    className="flex items-center justify-center h-8 text-xs font-semibold uppercase text-stone-500"
                  >
                    {t({
                      sk: weekdayNamesMondayFirst.sk[day],
                      en: weekdayNamesMondayFirst.en[day],
                    })}
                  </div>
                ))}
                {Array.from({ length: offset }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateKey = getDateKey(new Date(year, month, day));
                  const prayed = days.has(dateKey);
                  const isToday = dateKey === todayKey;
                  return (
                    <div
                      key={dateKey}
                      className={`flex items-center justify-center h-9 rounded-full text-sm ${
                        prayed
                          ? "bg-rosary-gold font-semibold text-white"
                          : "text-stone-700"
                      } ${isToday ? "ring-2 ring-rosary-gold ring-offset-1" : ""}`}
                      aria-label={dateKey}
                    >
                      {day}
                    </div>
                  );
                })}
                {Array.from({ length: trailing }).map((_, i) => (
                  <div key={`trailing-${i}`} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
