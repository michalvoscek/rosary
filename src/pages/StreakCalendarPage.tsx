import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { usePrayerDays } from "../hooks/usePrayerDays";
import { getDateKey } from "../lib/streak";
import { monthNames, weekdayNamesMondayFirst } from "../data/mysteries";
import { SwipeStack } from "../components/SwipeStack";

interface Month {
  year: number;
  month: number;
}

function monthKey(month: Month): number {
  return month.year * 12 + month.month;
}

function monthFromKey(key: number): Month {
  return { year: Math.floor(key / 12), month: key % 12 };
}

function addMonths(month: Month, delta: number): Month {
  return monthFromKey(monthKey(month) + delta);
}

interface MonthCalendarProps {
  month: Month;
  days: Set<string>;
  todayKey: string;
}

function MonthCalendar({ month, days, todayKey }: MonthCalendarProps) {
  const { t } = useLanguage();
  const { year, month: monthIndex } = month;
  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;
  const cells = offset + daysInMonth;
  const trailing = (7 - (cells % 7)) % 7;

  return (
    <div className="bg-surface rounded-2xl border border-line p-4 sm:p-6">
      <h2 className="mb-3 text-lg font-semibold">
        {t({ sk: monthNames.sk[monthIndex], en: monthNames.en[monthIndex] })}{" "}
        {year}
      </h2>
      <div className="grid grid-cols-7 gap-1">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <div
            key={day}
            className="flex items-center justify-center h-8 text-xs font-semibold uppercase text-muted"
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
          const dateKey = getDateKey(new Date(year, monthIndex, day));
          const prayed = days.has(dateKey);
          const isToday = dateKey === todayKey;
          return (
            <div
              key={dateKey}
              className={`flex items-center justify-center h-9 rounded-full text-sm ${
                prayed
                  ? "bg-accent font-semibold text-on-accent"
                  : "text-body"
              } ${isToday ? "ring-2 ring-accent ring-offset-1 ring-offset-surface" : ""}`}
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
    </div>
  );
}

export function StreakCalendarPage() {
  const days = usePrayerDays();
  const today = new Date();
  const [month, setMonth] = useState<Month>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const todayKey = getDateKey();

  const handleSwitch = (direction: "up" | "down") => {
    setMonth((m) => addMonths(m, direction === "up" ? 1 : -1));
  };

  return (
    <SwipeStack
      prev={
        <MonthCalendar
          month={addMonths(month, -1)}
          days={days}
          todayKey={todayKey}
        />
      }
      current={
        <MonthCalendar month={month} days={days} todayKey={todayKey} />
      }
      next={
        <MonthCalendar
          month={addMonths(month, 1)}
          days={days}
          todayKey={todayKey}
        />
      }
      onSwitch={handleSwitch}
      canGoDown={() => true}
      syncKey={monthKey(month)}
    />
  );
}
