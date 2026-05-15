import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Home, BookOpen, Info } from 'lucide-react';
import type { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { to: '/', label: { sk: 'Domov', en: 'Home' }, icon: Home },
    { to: '/about', label: { sk: 'Ako sa modliť', en: 'How to Pray' }, icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-rosary-purple font-semibold text-lg tracking-tight">
            <BookOpen size={22} />
            <span>Rosary</span>
          </Link>

          <div className="flex items-center gap-1">
            <nav className="hidden sm:flex items-center gap-1 mr-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? 'bg-rosary-purple/10 text-rosary-purple'
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{t(item.label)}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span className="uppercase font-semibold tracking-wide">{lang}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 safe-area-pb">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 py-1 text-xs font-medium transition-colors ${
                  isActive(item.to) ? 'text-rosary-purple' : 'text-stone-400'
                }`}
              >
                <Icon size={20} />
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer spacer for mobile nav */}
      <div className="sm:hidden h-14" />
    </div>
  );
}
