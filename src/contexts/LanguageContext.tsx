import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (bilingual: { sk: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('rosary-lang') as Language | null;
    return saved === 'en' ? 'en' : 'sk';
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('rosary-lang', newLang);
  }, []);

  const toggleLang = useCallback(() => {
    const next = lang === 'sk' ? 'en' : 'sk';
    setLang(next);
  }, [lang, setLang]);

  const t = useCallback(
    (bilingual: { sk: string; en: string }) => bilingual[lang],
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
