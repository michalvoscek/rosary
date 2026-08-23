import { Link } from "react-router-dom";
import { useStreak } from "../hooks/useStreak";
import { Flame, BookOpen, Settings } from "lucide-react";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const streak = useStreak();

  return (
    <div className="min-h-dvh flex flex-col bg-app text-body overflow-x-clip">
      {/* Header: bg extends behind the OS status bar (edge-to-edge) so the
          top edge always matches the app theme, even mid-transition */}
      <header className="sticky top-0 z-50 bg-surface border-b border-line pt-[env(safe-area-inset-top)]">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight h-full pr-4"
          >
            <BookOpen size={22} />
            <span>Rosary</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/calendar"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-overlay transition-colors"
              title="Daily prayer streak"
              aria-label={`Daily prayer streak: ${streak} days`}
            >
              <Flame size={22} fill="currentColor" />
              {streak}
            </Link>
            <Link
              to="/settings"
              className="flex items-center justify-center p-2 rounded-full hover:text-heading hover:bg-overlay transition-colors"
              title="Settings"
              aria-label="Settings"
            >
              <Settings size={22} />
            </Link>
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
