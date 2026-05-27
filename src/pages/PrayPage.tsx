import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getMysterySet } from "../data/mysteries";
import { PrayerDisplay } from "../components/PrayerDisplay";
import { ProgressIndicator } from "../components/ProgressIndicator";
import {
  RotateCcw,
  Home,
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

  // Ref to hold latest currentStep for event listeners
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

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

  // Global touch listeners on window — capture swipes anywhere on screen
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      const SWIPE_THRESHOLD = 50;

      if (deltaY > SWIPE_THRESHOLD && currentStepRef.current < TOTAL_STEPS - 1) {
        goToStep(currentStepRef.current + 1, "up");
      } else if (deltaY < -SWIPE_THRESHOLD && currentStepRef.current > 0) {
        goToStep(currentStepRef.current - 1, "down");
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToStep]);

  // Global wheel listener on window — capture trackpad/mouse scroll anywhere
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (wheelCooldownRef.current) return;

      const delta = e.deltaY;
      const SCROLL_THRESHOLD = 40;

      let navigated = false;
      if (delta > SCROLL_THRESHOLD && currentStepRef.current < TOTAL_STEPS - 1) {
        goToStep(currentStepRef.current + 1, "up");
        navigated = true;
      } else if (delta < -SCROLL_THRESHOLD && currentStepRef.current > 0) {
        goToStep(currentStepRef.current - 1, "down");
        navigated = true;
      }

      if (navigated) {
        wheelCooldownRef.current = true;
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 400);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [goToStep]);

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
      <ProgressIndicator currentStep={currentStep} />

      {/* Swipeable prayer area */}
      <div
        className={`relative min-h-[50vh] select-none no-scrollbar ${exitClass} ${entryClass}`}
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

    </div>
  );
}
