import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useStreak } from "../hooks/useStreak";
import { Flame, Globe, BookOpen } from "lucide-react";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLanguage();
  const streak = useStreak();

  return (
    <div className="min-h-dvh flex flex-col bg-rosary-beige text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-rosary-beige-light backdrop-blur border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight h-full pr-4"
          >
            <BookOpen size={22} />
            <span>Rosary</span>
          </Link>

          <div className="flex items-center gap-2">
            {streak > 0 && (
              <span
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold text-orange-600"
                title="Daily prayer streak"
                aria-label={`Daily prayer streak: ${streak} days`}
              >
                <Flame size={16} fill="currentColor" />
                {streak}
              </span>
            )}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-black/10 transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span className="uppercase font-semibold tracking-wide">
                {lang}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
