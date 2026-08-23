import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
  type ReactNode,
} from 'react';
import type { ThemeId } from '../types';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('rosary-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('rosary-theme', newTheme);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    // Resolve the target --surface from a probe element matching the new
    // theme. Reading it from <html> would return the transitioned value,
    // and Chrome Android can ignore setAttribute() on an existing meta
    // tag, so replace the tag instead.
    const probe = document.createElement("div");
    probe.dataset.theme = theme;
    document.body.appendChild(probe);
    const surface = getComputedStyle(probe).getPropertyValue("--surface").trim();
    probe.remove();
    document.querySelector('meta[name="theme-color"]')?.remove();
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = surface;
    document.head.appendChild(meta);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
