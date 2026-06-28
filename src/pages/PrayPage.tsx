import { useParams, useNavigate } from "react-router-dom";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getMysterySet } from "../data/mysteries";
import { PrayerDisplay } from "../components/PrayerDisplay";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { Check, Home, ChevronUp, ChevronDown } from "lucide-react";

const TOTAL_STEPS = 7 + 13 * 5; // 72
const SWIPE_THRESHOLD = 60; // px
const SPEED_AFTER_RELEASE = 2500; // px/s
const WHEEL_THRESHOLD = 40; // px
const WHEEL_GROUP_MS = 120; // ms
const SNAP_BACK_DURATION_MS = 250;

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
      <div className="bg-rosary-beige-light rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col items-center justify-center gap-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/10 text-black">
          <Check size={28} />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">
          {t({ sk: "Ruženec dokončený", en: "Rosary completed" })}
        </h2>
        <p className="text-lg leading-relaxed text-stone-800 whitespace-pre-wrap">
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
  const [containerHeight, setContainerHeight] = useState(0);

  const effectiveStep: StepOrFinished = isFinishedUrl ? "finished" : currentStep;

  // Refs for direct DOM manipulation (compositor-driven, adapts to device refresh rate)
  const containerRef = useRef<HTMLDivElement>(null);
  const currentCardRef = useRef<HTMLDivElement>(null);
  const prevCardRef = useRef<HTMLDivElement>(null);
  const nextCardRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const dragStartYRef = useRef<number | null>(null);
  const offsetYRef = useRef(0);
  const containerHeightRef = useRef(0);
  const hintDismissedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const H = el.clientHeight;
      containerHeightRef.current = H;
      setContainerHeight(H);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const applyOffset = useCallback((y: number) => {
    offsetYRef.current = y;
    const H = containerHeightRef.current;
    if (currentCardRef.current) {
      currentCardRef.current.style.transform = `translateY(${y}px)`;
    }
    if (prevCardRef.current) {
      prevCardRef.current.style.transform = `translateY(${y - H}px)`;
    }
    if (nextCardRef.current) {
      nextCardRef.current.style.transform = `translateY(${y + H}px)`;
    }
  }, []);

  // Reset card positions whenever the effective step or container height changes,
  // but not during an active animation or drag (ResizeObserver-driven height
  // changes would otherwise jump the card mid-motion).
  useLayoutEffect(() => {
    if (isAnimatingRef.current || isDraggingRef.current) return;
    applyOffset(0);
  }, [effectiveStep, containerHeight, applyOffset]);

  const setTransition = useCallback(
    (ms: number, easing = "cubic-bezier(0.22, 1, 0.36, 1)") => {
      const prop = `transform ${ms}ms ${easing}`;
      if (currentCardRef.current) currentCardRef.current.style.transition = prop;
      if (prevCardRef.current) prevCardRef.current.style.transition = prop;
      if (nextCardRef.current) nextCardRef.current.style.transition = prop;
    },
    [],
  );

  const removeTransition = useCallback(() => {
    if (currentCardRef.current) currentCardRef.current.style.transition = "";
    if (prevCardRef.current) prevCardRef.current.style.transition = "";
    if (nextCardRef.current) nextCardRef.current.style.transition = "";
  }, []);

  const animateTo = useCallback(
    (targetY: number, onDone: () => void) => {
      const startY = offsetYRef.current;
      const distance = Math.abs(targetY - startY);
      if (distance < 1) {
        onDone();
        return;
      }
      const duration = (distance / SPEED_AFTER_RELEASE) * 1000;
      setTransition(duration, "linear");
      applyOffset(targetY);

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        removeTransition();
        cleanup();
        onDone();
      };
      const cleanup = () => {
        if (currentCardRef.current) {
          currentCardRef.current.removeEventListener("transitionend", onEnd);
        }
        if (fallback) clearTimeout(fallback);
      };
      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName !== "transform") return;
        finish();
      };
      const el = currentCardRef.current;
      if (el) el.addEventListener("transitionend", onEnd);
      const fallback = setTimeout(finish, duration + 50);
    },
    [applyOffset, setTransition, removeTransition],
  );

  const snapBack = useCallback(() => {
    isAnimatingRef.current = true;
    setTransition(SNAP_BACK_DURATION_MS);
    applyOffset(0);
    setTimeout(() => {
      removeTransition();
      isAnimatingRef.current = false;
    }, SNAP_BACK_DURATION_MS + 20);
  }, [applyOffset, removeTransition, setTransition]);

  const handleSwitch = useCallback(
    (direction: "up" | "down") => {
      if (!hintDismissedRef.current) {
        hintDismissedRef.current = true;
        setShowHint(false);
      }
      isAnimatingRef.current = false;

      if (direction === "up") {
        if (effectiveStep === "finished") {
          navigate("/");
        } else if (currentStep === TOTAL_STEPS - 1) {
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
    [effectiveStep, currentStep, validMysterySetId, navigate],
  );

  // Refs exposed to the wheel listener (stable across renders)
  const effectiveStepRef = useRef(effectiveStep);
  const currentStepRef = useRef(currentStep);
  const handleSwitchRef = useRef(handleSwitch);
  const animateToRef = useRef(animateTo);

  useEffect(() => {
    effectiveStepRef.current = effectiveStep;
  }, [effectiveStep]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    handleSwitchRef.current = handleSwitch;
  }, [handleSwitch]);

  useEffect(() => {
    animateToRef.current = animateTo;
  }, [animateTo]);

  const getCanGoDown = () => {
    return effectiveStep === "finished" || currentStep > 0;
  };

  const applyResistance = (deltaY: number) => {
    const canGoDown = getCanGoDown();
    if (deltaY > 0 && !canGoDown) {
      return deltaY * 0.25;
    }
    return deltaY;
  };

  const handleRelease = (deltaY: number) => {
    isDraggingRef.current = false;
    dragStartYRef.current = null;

    const canGoUp = true;
    const canGoDown = getCanGoDown();

    if (deltaY < -SWIPE_THRESHOLD && canGoUp) {
      isAnimatingRef.current = true;
      animateTo(-containerHeightRef.current, () => {
        handleSwitch("up");
      });
    } else if (deltaY > SWIPE_THRESHOLD && canGoDown) {
      isAnimatingRef.current = true;
      animateTo(containerHeightRef.current, () => {
        handleSwitch("down");
      });
    } else {
      snapBack();
    }
  };

  // --- Touch handlers ---
  const onTouchStart = (e: React.TouchEvent) => {
    if (isAnimatingRef.current || isDraggingRef.current) return;
    dragStartYRef.current = e.touches[0].clientY;
    isDraggingRef.current = true;
    removeTransition();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || dragStartYRef.current === null) return;
    e.preventDefault();
    const deltaY = e.touches[0].clientY - dragStartYRef.current;
    applyOffset(applyResistance(deltaY));
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || dragStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - dragStartYRef.current;
    handleRelease(deltaY);
  };

  // --- Mouse drag handlers ---
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (isAnimatingRef.current || isDraggingRef.current) return;
    dragStartYRef.current = e.clientY;
    isDraggingRef.current = true;
    removeTransition();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || dragStartYRef.current === null) return;
    const deltaY = e.clientY - dragStartYRef.current;
    applyOffset(applyResistance(deltaY));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || dragStartYRef.current === null) return;
    const deltaY = e.clientY - dragStartYRef.current;
    handleRelease(deltaY);
  };

  const onMouseLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    dragStartYRef.current = null;
    snapBack();
  };

  // --- Wheel handler (desktop) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) return;
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        const canGoUp = true;
        const canGoDown =
          effectiveStepRef.current === "finished" || currentStepRef.current > 0;

        if (accumulatedDelta > WHEEL_THRESHOLD && canGoUp) {
          isAnimatingRef.current = true;
          animateToRef.current(-containerHeightRef.current, () => {
            handleSwitchRef.current("up");
          });
        } else if (accumulatedDelta < -WHEEL_THRESHOLD && canGoDown) {
          isAnimatingRef.current = true;
          animateToRef.current(containerHeightRef.current, () => {
            handleSwitchRef.current("down");
          });
        }
        accumulatedDelta = 0;
        wheelTimer = null;
      }, WHEEL_GROUP_MS);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, []);

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

  return (
    <div className="flex flex-col flex-1 gap-6">
      <ProgressIndicator currentStep={currentStep} />

      {/* Card stack */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[50vh] overflow-hidden select-none touch-none no-scrollbar"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {prevStep !== null && (
          <div
            ref={prevCardRef}
            className="absolute inset-x-0 top-0 h-full will-change-transform"
          >
            <CardContent
              step={prevStep}
              mysterySetId={validMysterySetId}
              mysterySet={mysterySet}
            />
          </div>
        )}

        <div
          ref={currentCardRef}
          className="absolute inset-x-0 top-0 h-full will-change-transform"
        >
          <CardContent
            step={effectiveStep}
            mysterySetId={validMysterySetId}
            mysterySet={mysterySet}
          />

          {/* Swipe hint overlay */}
          {showHint && !isFinishedCard && (
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

        {nextStep !== null && (
          <div
            ref={nextCardRef}
            className="absolute inset-x-0 top-0 h-full will-change-transform"
          >
            <CardContent
              step={nextStep}
              mysterySetId={validMysterySetId}
              mysterySet={mysterySet}
            />
          </div>
        )}
      </div>
    </div>
  );
}
