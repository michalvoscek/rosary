import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { Check, Download } from "lucide-react";
import type { Language, ThemeId } from "../types";

const themeLabels: Record<ThemeId, { sk: string; en: string }> = {
  light: { sk: "Svetlá", en: "Light" },
  dark: { sk: "Tmavá", en: "Dark" },
};

// Swatches take their colors from the theme itself: data-theme scopes the
// light/dark CSS variables to the preview wrapper (see index.css). The
// button itself stays unscoped so the selection ring/offset resolve against
// the current app theme and stay visible outside the preview.
const swatchClasses = ["bg-app", "bg-surface", "bg-body", "bg-accent", "bg-primary"];

export function SettingsPage() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { canInstall, install, isStandalone, isIOS } = useInstallPrompt();

  return (
    <div className="space-y-6">
      <section className="bg-surface rounded-2xl border border-line p-4 sm:p-6">
        <div className="flex flex-row items-center gap-4">
          <h2 className="mb-1 text-lg font-semibold w-32">
            {t({ sk: "Jazyk", en: "Language" })}
          </h2>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="w-full rounded-xl border border-line-strong bg-input px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/20"
            aria-label={t({ sk: "Jazyk", en: "Language" })}
          >
            <option value="sk">{t({ sk: "Slovenčina", en: "Slovak" })}</option>
            <option value="en">{t({ sk: "Angličtina", en: "English" })}</option>
          </select>
        </div>
      </section>

      <section className="bg-surface rounded-2xl border border-line p-4 sm:p-6">
        <h2 className="mb-3 text-lg font-semibold">
          {t({ sk: "Téma", en: "Theme" })}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(themeLabels) as ThemeId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              aria-pressed={theme === id}
              className={`rounded-xl transition-all ${
                theme === id
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-surface"
                  : "hover:ring-2 hover:ring-line-strong hover:ring-offset-2 hover:ring-offset-surface"
              }`}
            >
              <span
                data-theme={id}
                className="flex flex-col items-start gap-2 rounded-lg border border-line bg-surface p-3 text-body"
              >
                <span className="flex gap-1.5">
                  {swatchClasses.map((swatch) => (
                    <span
                      key={swatch}
                      className={`h-5 w-5 rounded-full border border-line ${swatch}`}
                    />
                  ))}
                </span>
                <span className="text-sm font-medium">{t(themeLabels[id])}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {(canInstall || isIOS || isStandalone) && (
        <section className="bg-surface rounded-2xl border border-line p-4 sm:p-6">
          <h2 className="mb-3 text-lg font-semibold">
            {t({ sk: "Inštalácia", en: "Install" })}
          </h2>
          {canInstall && (
            <button
              type="button"
              onClick={install}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Download size={18} />
              {t({ sk: "Inštalovať aplikáciu", en: "Install app" })}
            </button>
          )}
          {isIOS && (
            <ol className="space-y-2 text-sm text-body list-decimal list-inside">
              <li>
                {t({
                  sk: "Klepni na tlačidlo Zdieľať v Safari",
                  en: "Tap the Share button in Safari",
                })}
              </li>
              <li>
                {t({
                  sk: 'Vyber "Pridať na plochu"',
                  en: 'Choose "Add to Home Screen"',
                })}
              </li>
              <li>
                {t({
                  sk: "Otvoriť aplikáciu z domovskej obrazovky",
                  en: "Open the app from your home screen",
                })}
              </li>
            </ol>
          )}
          {isStandalone && (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/40 text-on-primary/70 text-sm font-medium cursor-default"
            >
              <Check size={18} />
              {t({ sk: "Nainštalované", en: "Installed" })}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
