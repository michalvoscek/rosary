import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../types";

export function SettingsPage() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="space-y-6">
      <section className="bg-rosary-beige-light rounded-2xl border border-stone-200 p-4 sm:p-6">
        <div className="flex flex-row items-center gap-4">
          <h2 className="mb-1 text-lg font-semibold w-32">
            {t({ sk: "Jazyk", en: "Language" })}
          </h2>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/20"
            aria-label={t({ sk: "Jazyk", en: "Language" })}
          >
            <option value="sk">{t({ sk: "Slovenčina", en: "Slovak" })}</option>
            <option value="en">{t({ sk: "Angličtina", en: "English" })}</option>
          </select>
        </div>
      </section>
    </div>
  );
}
