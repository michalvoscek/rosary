import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getMysterySet } from "../data/mysteries";
import { PrayerDisplay } from "../components/PrayerDisplay";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { ArrowLeft, ArrowRight, RotateCcw, Home } from "lucide-react";

const TOTAL_STEPS = 7 + 13 * 5 + 1; // opening 7 + 5 decades * 13 + closing 1 = 73

export function PrayPage() {
  const { mysterySetId, step } = useParams<{
    mysterySetId: string;
    step?: string;
  }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const mysterySet = getMysterySet(mysterySetId || "");
  const currentStep = Math.max(
    0,
    Math.min(TOTAL_STEPS - 1, parseInt(step || "0", 10) || 0),
  );

  if (!mysterySet) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">
          {t({ sk: "Tajomstvo nenájdené", en: "Mystery not found" })}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rosary-purple text-white text-sm font-medium hover:bg-rosary-purple/90 transition-colors"
        >
          <Home size={16} />
          {t({ sk: "Späť domov", en: "Back home" })}
        </button>
      </div>
    );
  }

  const currentDecade = Math.max(
    0,
    Math.min(4, Math.floor((currentStep - 7) / 13)),
  );
  const currentMystery =
    mysterySet.decades[currentDecade] || mysterySet.decades[0];

  const goToStep = (s: number) => {
    navigate(`/pray/${mysterySetId}/${s}`);
  };

  const canGoBack = currentStep > 0;
  const canGoForward = currentStep < TOTAL_STEPS - 1;

  const isFinished = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="space-y-6">
      {/* Header */}

      <ProgressIndicator currentStep={currentStep} />

      {isFinished ? (
        <div className="text-center py-12 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rosary-purple/10 text-rosary-purple">
            <RotateCcw size={32} />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">
            {t({ sk: "Ruženec dokončený", en: "Rosary completed" })}
          </h2>
          <p className="text-stone-600 max-w-sm mx-auto">
            {t({
              sk: "Ďakujeme za spoločnú modlitbu. Nech vás Panna Mária ochraňuje.",
              en: "Thank you for praying with us. May the Virgin Mary protect you.",
            })}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => goToStep(0)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rosary-purple text-white text-sm font-medium hover:bg-rosary-purple/90 transition-colors"
            >
              <RotateCcw size={16} />
              {t({ sk: "Zopakovať", en: "Repeat" })}
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 text-stone-700 text-sm font-medium hover:bg-stone-200 transition-colors"
            >
              <Home size={16} />
              {t({ sk: "Domov", en: "Home" })}
            </button>
          </div>
        </div>
      ) : (
        <PrayerDisplay
          step={currentStep}
          mysterySetId={mysterySetId!}
          decadeIndex={currentDecade}
          mystery={currentMystery}
        />
      )}

      {/* Navigation buttons */}
      {!isFinished && (
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => canGoBack && goToStep(currentStep - 1)}
            disabled={!canGoBack}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
              canGoBack
                ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                : "bg-stone-50 text-stone-300 cursor-not-allowed"
            }`}
          >
            <ArrowLeft size={16} />
            {t({ sk: "Predchádzajúca", en: "Previous" })}
          </button>

          <button
            onClick={() => canGoForward && goToStep(currentStep + 1)}
            disabled={!canGoForward}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              canGoForward
                ? "bg-rosary-purple text-white hover:bg-rosary-purple/90"
                : "bg-stone-100 text-stone-300 cursor-not-allowed"
            }`}
          >
            {t({ sk: "Ďalej", en: "Next" })}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
