import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getMysterySet } from "../data/mysteries";
import { PrayerDisplay } from "../components/PrayerDisplay";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { SwipeStack } from "../components/SwipeStack";
import { usePrayerStreak } from "../hooks/usePrayerStreak";
import { Check, Home, ChevronUp, ChevronDown } from "lucide-react";

const TOTAL_STEPS = 7 + 13 * 5; // 72

type StepOrFinished = number | "finished";

interface CardContentProps {
  step: StepOrFinished;
  mysterySetId: string;
  mysterySet: NonNullable<ReturnType<typeof getMysterySet>>;
}

function CardContent({ step, mysterySetId, mysterySet }: CardContentProps) {
  const { t } = useLanguage();

  if (step === "finished") {
    return (
      <div className="bg-surface rounded-2xl border border-line p-6 sm:p-8 flex flex-col items-center justify-center gap-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-overlay text-accent">
          <Check size={28} />
        </div>
        <h2 className="text-2xl font-bold text-heading">
          {t({ sk: "Ruženec dokončený", en: "Rosary completed" })}
        </h2>
        <p className="text-lg leading-relaxed text-body whitespace-pre-wrap">
          {t({
            sk: "Ďakujeme za spoločnú modlitbu. Nech vás Panna Mária ochraňuje.",
            en: "Thank you for praying with us. May the Virgin Mary protect you.",
          })}
        </p>
      </div>
    );
  }

  const decade = Math.max(0, Math.min(4, Math.floor((step - 7) / 13)));
  const mystery = mysterySet.decades[decade] || mysterySet.decades[0];

  return (
    <PrayerDisplay
      step={step}
      mysterySetId={mysterySetId}
      decadeIndex={decade}
      mystery={mystery!}
    />
  );
}

export function PrayPage() {
  const { mysterySetId, step } = useParams<{
    mysterySetId: string;
    step: string;
  }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const validMysterySetId = mysterySetId || "";
  const mysterySet = getMysterySet(validMysterySetId);
  const isFinishedUrl = step === String(TOTAL_STEPS);
  const currentStep = isFinishedUrl
    ? TOTAL_STEPS - 1
    : Math.max(
        0,
        Math.min(TOTAL_STEPS - 1, parseInt(step as string, 10) || 0),
      );

  const [showHint, setShowHint] = useState(true);
  const hintDismissedRef = useRef(false);

  const effectiveStep: StepOrFinished = isFinishedUrl ? "finished" : currentStep;

  const { recordPrayerDayIfStarted } = usePrayerStreak(
    currentStep,
    validMysterySetId,
    !!mysterySet,
  );

  const handleSwitch = useCallback(
    (direction: "up" | "down") => {
      if (!hintDismissedRef.current) {
        hintDismissedRef.current = true;
        setShowHint(false);
      }

      if (direction === "up") {
        if (effectiveStep === "finished") {
          navigate("/");
        } else if (currentStep === TOTAL_STEPS - 1) {
          recordPrayerDayIfStarted();
          navigate(`/pray/${validMysterySetId}/${TOTAL_STEPS}`);
        } else {
          navigate(`/pray/${validMysterySetId}/${currentStep + 1}`);
        }
      } else {
        if (effectiveStep === "finished") {
          navigate(`/pray/${validMysterySetId}/${TOTAL_STEPS - 1}`);
        } else {
          navigate(`/pray/${validMysterySetId}/${currentStep - 1}`);
        }
      }
    },
    [effectiveStep, currentStep, validMysterySetId, navigate, recordPrayerDayIfStarted],
  );

  // --- Hint auto-hide ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hintDismissedRef.current) {
        setShowHint(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // --- Render helpers ---
  const prevStep: StepOrFinished | null =
    effectiveStep === "finished"
      ? TOTAL_STEPS - 1
      : currentStep > 0
        ? currentStep - 1
        : null;

  const nextStep: StepOrFinished | null =
    effectiveStep === "finished"
      ? null
      : currentStep === TOTAL_STEPS - 1
        ? "finished"
        : currentStep + 1;

  const isFinishedCard = effectiveStep === "finished";

  if (!mysterySet) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">
          {t({ sk: "Tajomstvo nenájdené", en: "Mystery not found" })}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Home size={16} />
          {t({ sk: "Späť domov", en: "Back home" })}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 gap-6">
      <ProgressIndicator currentStep={currentStep} />

      {/* Card stack */}
      <SwipeStack
        prev={
          prevStep !== null ? (
            <CardContent
              step={prevStep}
              mysterySetId={validMysterySetId}
              mysterySet={mysterySet}
            />
          ) : undefined
        }
        current={
          <CardContent
            step={effectiveStep}
            mysterySetId={validMysterySetId}
            mysterySet={mysterySet}
          />
        }
        next={
          nextStep !== null ? (
            <CardContent
              step={nextStep}
              mysterySetId={validMysterySetId}
              mysterySet={mysterySet}
            />
          ) : undefined
        }
        overlay={
          showHint && !isFinishedCard ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-fade-in">
              <div className="flex flex-col items-center gap-2 text-faint">
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
          ) : undefined
        }
        onSwitch={handleSwitch}
        canGoDown={() => effectiveStep === "finished" || currentStep > 0}
        syncKey={effectiveStep}
      />
    </div>
  );
}
