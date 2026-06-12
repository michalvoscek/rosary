import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe, BookOpen } from "lucide-react";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-rosary-beige text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-rosary-beige-light backdrop-blur border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight"
          >
            <BookOpen size={22} />
            <span>Rosary</span>
          </Link>

          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span className="uppercase font-semibold tracking-wide">
              {lang}
            </span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
