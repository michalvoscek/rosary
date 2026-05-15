import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getMysterySet } from "../data/mysteries";
import { PrayerDisplay } from "../components/PrayerDisplay";
import { ProgressIndicator } from "../components/ProgressIndicator";
import {
  RotateCcw,
  Home,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const TOTAL_STEPS = 7 + 13 * 5 + 1; // 73

export function PrayPage() {
  const { mysterySetId, step } = useParams<{
    mysterySetId: string;
    step?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const mysterySet = getMysterySet(mysterySetId || "");
  const currentStep = Math.max(
    0,
    Math.min(TOTAL_STEPS - 1, parseInt(step || "0", 10) || 0),
  );

  // Entry animation: capture direction once on mount, never change it afterwards
  const [entryClass, setEntryClass] = useState(() => {
    const dir = (location.state as { direction?: "up" | "down" } | null)
      ?.direction;
    if (dir === "up") return "animate-slide-up-in";
    if (dir === "down") return "animate-slide-down-in";
    return "animate-fade-in";
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntryClass("");
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const [exitDirection, setExitDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [showHint, setShowHint] = useState(true);

  // Swipe detection refs
  const touchStartY = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const wheelCooldownRef = useRef(false);

  // Track if hint has been dismissed
  const hintDismissedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hintDismissedRef.current) {
        setShowHint(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const goToStep = useCallback(
    (s: number, direction: "up" | "down") => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setExitDirection(direction);

      // Dismiss hint on first interaction
      if (!hintDismissedRef.current) {
        hintDismissedRef.current = true;
        setShowHint(false);
      }

      setTimeout(() => {
        navigate(`/pray/${mysterySetId}/${s}`, { state: { direction } });
        isAnimatingRef.current = false;
        setExitDirection(null);
      }, 250);
    },
    [mysterySetId, navigate],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      const SWIPE_THRESHOLD = 50;

      if (deltaY > SWIPE_THRESHOLD && currentStep < TOTAL_STEPS - 1) {
        goToStep(currentStep + 1, "up");
      } else if (deltaY < -SWIPE_THRESHOLD && currentStep > 0) {
        goToStep(currentStep - 1, "down");
      }
    },
    [currentStep, goToStep],
  );

  // Also handle wheel/trackpad scroll
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelCooldownRef.current) return;

      const delta = e.deltaY;
      const SCROLL_THRESHOLD = 40;

      let navigated = false;
      if (delta > SCROLL_THRESHOLD && currentStep < TOTAL_STEPS - 1) {
        goToStep(currentStep + 1, "up");
        navigated = true;
      } else if (delta < -SCROLL_THRESHOLD && currentStep > 0) {
        goToStep(currentStep - 1, "down");
        navigated = true;
      }

      if (navigated) {
        wheelCooldownRef.current = true;
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 400);
      }
    },
    [currentStep, goToStep],
  );

  const isFinished = currentStep === TOTAL_STEPS - 1;

  // Exit animation class
  const exitClass =
    exitDirection === "up"
      ? "animate-slide-up-out"
      : exitDirection === "down"
        ? "animate-slide-down-out"
        : "";

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">{t({ sk: "Naspäť", en: "Back" })}</span>
        </button>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-stone-900">{t(mysterySet.title)}</h1>
          <p className="text-xs text-stone-500">
            {t({ sk: "Desiatok", en: "Decade" })} {Math.min(currentDecade + 1, 5)} / 5
          </p>
        </div>
        <div className="w-16" />
      </div>

      <ProgressIndicator currentStep={currentStep} />

      {/* Swipeable prayer area */}
      <div
        className={`relative min-h-[50vh] select-none no-scrollbar ${exitClass} ${entryClass}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{ transform: "translateY(0)", opacity: 1 }}
      >
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
                onClick={() => navigate(`/pray/${mysterySetId}/0`)}
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

        {/* Swipe hint overlay */}
        {showHint && !isFinished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-fade-in">
            <div className="flex flex-col items-center gap-2 text-stone-400">
              <ChevronUp size={24} className="animate-bounce" />
              <span className="text-sm font-medium">
                {t({
                  sk: "Potiahnite nahor alebo dole",
                  en: "Swipe up or down",
                })}
              </span>
              <ChevronDown
                size={24}
                className="animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Step counter at bottom */}
      {!isFinished && (
        <div className="flex items-center justify-center gap-4 text-xs text-stone-400">
          <span className="tabular-nums">{currentStep + 1} / {TOTAL_STEPS}</span>
        </div>
      )}
    </div>
  );
}
