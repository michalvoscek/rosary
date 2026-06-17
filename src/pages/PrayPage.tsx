import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getMysterySet } from "../data/mysteries";
import { PrayerDisplay } from "../components/PrayerDisplay";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { RotateCcw, Home, ChevronUp, ChevronDown } from "lucide-react";

const TOTAL_STEPS = 7 + 13 * 5 + 1; // 73
const SWIPE_THRESHOLD = 50;
const SNAP_BACK_MS = 250;
const VELOCITY_SAMPLE_WINDOW_MS = 100;
const MIN_THROW_SPEED = 0.3; // px/ms minimum exit speed

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
    isAnimatingRef.current = true;
    const timer = setTimeout(() => {
      setEntryClass("");
      isAnimatingRef.current = false;
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const [exitDirection, setExitDirection] = useState<"up" | "down" | null>(
    null,
  );
  const [showHint, setShowHint] = useState(true);

  // Drag tracking refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const isAnimatingRef = useRef(false);
  const wheelCooldownRef = useRef(false);
  const touchInProgress = useRef(false);
  const velocitySamples = useRef<{ y: number; t: number }[]>([]);
  const navigateRef = useRef(navigate);
  const mysterySetIdRef = useRef(mysterySetId);
  const currentStepRef = useRef(currentStep);

  navigateRef.current = navigate;
  mysterySetIdRef.current = mysterySetId;

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

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

  // --- DOM helpers (operate directly on containerRef for zero-lag feedback) ---

  const setTr = (y: number, opacity: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = `translateY(${y}px)`;
    el.style.opacity = String(opacity);
  };

  const setTransition = (ms: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transition = `transform ${ms}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ms}ms ease`;
  };

  const removeTransition = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transition = "";
  };

  const resetPosition = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.transform = "translateY(0)";
    el.style.opacity = "1";
  };

  const computeVelocity = () => {
    const s = velocitySamples.current;
    if (s.length < 2) return 0;
    const first = s[0];
    const last = s[s.length - 1];
    const dt = last.t - first.t;
    return dt > 0 ? (last.y - first.y) / dt : 0;
  };

  const throwAnimate = (
    fromY: number,
    velocity: number,
    direction: -1 | 1,
    fromOpacity: number,
    onComplete: () => void,
  ) => {
    const el = containerRef.current;
    if (!el) return onComplete();

    const speed = Math.max(Math.abs(velocity), MIN_THROW_SPEED);

    const offScreenDist = Math.max(window.innerHeight * 0.8, 400);
    const targetY = fromY + direction * offScreenDist;
    const duration = Math.min(700, Math.max(100, offScreenDist / speed));

    el.style.transform = `translateY(${fromY}px)`;
    el.style.opacity = String(fromOpacity);

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const y = fromY + (targetY - fromY) * ease;
      const opacity = fromOpacity * (1 - ease);
      setTr(y, Math.max(0, opacity));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };
    requestAnimationFrame(tick);
  };


  // --- Touch handlers ---

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (isAnimatingRef.current || isDragging.current) return;
      dragStartY.current = e.touches[0].clientY;
      isDragging.current = true;
      touchInProgress.current = true;
      velocitySamples.current = [];
      removeTransition();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || dragStartY.current === null) return;
      e.preventDefault();
      const deltaY = e.touches[0].clientY - dragStartY.current;
      const canGoUp = currentStepRef.current < TOTAL_STEPS - 1;
      const canGoDown = currentStepRef.current > 0;

      let translateY = deltaY;
      if ((deltaY < 0 && !canGoUp) || (deltaY > 0 && !canGoDown)) {
        translateY = deltaY * 0.25;
      }

      const now = performance.now();
      velocitySamples.current.push({ y: e.touches[0].clientY, t: now });
      velocitySamples.current = velocitySamples.current.filter(
        (s) => now - s.t < VELOCITY_SAMPLE_WINDOW_MS,
      );

      const opacity = Math.max(0.3, 1 - Math.abs(deltaY) / 300);
      setTr(translateY, opacity);
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDragging.current || dragStartY.current === null) return;
      const deltaY = e.changedTouches[0].clientY - dragStartY.current;
      const velocity = computeVelocity();
      dragStartY.current = null;
      isDragging.current = false;
      velocitySamples.current = [];

      const canGoUp = currentStepRef.current < TOTAL_STEPS - 1;
      const canGoDown = currentStepRef.current > 0;

      const finish = () => {
        touchInProgress.current = false;
        isAnimatingRef.current = false;
      };

      if (deltaY < -SWIPE_THRESHOLD && canGoUp) {
        isAnimatingRef.current = true;
        const startY = deltaY;
        const startOpacity = Math.max(0.3, 1 - Math.abs(deltaY) / 300);
        throwAnimate(startY, velocity, -1, startOpacity, () => {
          if (!hintDismissedRef.current) {
            hintDismissedRef.current = true;
            setShowHint(false);
          }
          removeTransition();
          resetPosition();
          navigateRef.current(
            `/pray/${mysterySetIdRef.current}/${currentStepRef.current + 1}`,
            { state: { direction: "up" } },
          );
          finish();
        });
      } else if (deltaY > SWIPE_THRESHOLD && canGoDown) {
        isAnimatingRef.current = true;
        const startY = deltaY;
        const startOpacity = Math.max(0.3, 1 - Math.abs(deltaY) / 300);
        throwAnimate(startY, velocity, 1, startOpacity, () => {
          if (!hintDismissedRef.current) {
            hintDismissedRef.current = true;
            setShowHint(false);
          }
          removeTransition();
          resetPosition();
          navigateRef.current(
            `/pray/${mysterySetIdRef.current}/${currentStepRef.current - 1}`,
            { state: { direction: "down" } },
          );
          finish();
        });
      } else {
        isAnimatingRef.current = true;
        setTransition(SNAP_BACK_MS);
        resetPosition();
        setTimeout(() => {
          removeTransition();
          finish();
        }, SNAP_BACK_MS + 20);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // --- Mouse drag handlers (desktop) ---

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (touchInProgress.current) return;
      if (e.button !== 0) return;
      if (isAnimatingRef.current || isDragging.current) return;
      dragStartY.current = e.clientY;
      isDragging.current = true;
      velocitySamples.current = [];
      removeTransition();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || dragStartY.current === null) return;
      const deltaY = e.clientY - dragStartY.current;
      const canGoUp = currentStepRef.current < TOTAL_STEPS - 1;
      const canGoDown = currentStepRef.current > 0;

      let translateY = deltaY;
      if ((deltaY < 0 && !canGoUp) || (deltaY > 0 && !canGoDown)) {
        translateY = deltaY * 0.25;
      }

      const now = performance.now();
      velocitySamples.current.push({ y: e.clientY, t: now });
      velocitySamples.current = velocitySamples.current.filter(
        (s) => now - s.t < VELOCITY_SAMPLE_WINDOW_MS,
      );

      const opacity = Math.max(0.3, 1 - Math.abs(deltaY) / 300);
      setTr(translateY, opacity);
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging.current || dragStartY.current === null) return;
      const deltaY = e.clientY - dragStartY.current;
      const velocity = computeVelocity();
      dragStartY.current = null;
      isDragging.current = false;
      velocitySamples.current = [];

      const canGoUp = currentStepRef.current < TOTAL_STEPS - 1;
      const canGoDown = currentStepRef.current > 0;

      const finish = () => {
        isAnimatingRef.current = false;
      };

      if (deltaY < -SWIPE_THRESHOLD && canGoUp) {
        isAnimatingRef.current = true;
        const startY = deltaY;
        const startOpacity = Math.max(0.3, 1 - Math.abs(deltaY) / 300);
        throwAnimate(startY, velocity, -1, startOpacity, () => {
          if (!hintDismissedRef.current) {
            hintDismissedRef.current = true;
            setShowHint(false);
          }
          removeTransition();
          resetPosition();
          navigateRef.current(
            `/pray/${mysterySetIdRef.current}/${currentStepRef.current + 1}`,
            { state: { direction: "up" } },
          );
          finish();
        });
      } else if (deltaY > SWIPE_THRESHOLD && canGoDown) {
        isAnimatingRef.current = true;
        const startY = deltaY;
        const startOpacity = Math.max(0.3, 1 - Math.abs(deltaY) / 300);
        throwAnimate(startY, velocity, 1, startOpacity, () => {
          if (!hintDismissedRef.current) {
            hintDismissedRef.current = true;
            setShowHint(false);
          }
          removeTransition();
          resetPosition();
          navigateRef.current(
            `/pray/${mysterySetIdRef.current}/${currentStepRef.current - 1}`,
            { state: { direction: "down" } },
          );
          finish();
        });
      } else {
        isAnimatingRef.current = true;
        setTransition(SNAP_BACK_MS);
        resetPosition();
        setTimeout(() => {
          removeTransition();
          finish();
        }, SNAP_BACK_MS + 20);
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // --- Wheel listener ---

  const goToStep = useCallback(
    (s: number, direction: "up" | "down") => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setExitDirection(direction);

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

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (wheelCooldownRef.current) return;

      const delta = e.deltaY;
      const SCROLL_THRESHOLD = 40;

      let navigated = false;
      if (
        delta > SCROLL_THRESHOLD &&
        currentStepRef.current < TOTAL_STEPS - 1
      ) {
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

  // --- Render ---

  const isFinished = currentStep === TOTAL_STEPS - 1;

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
        ref={containerRef}
        className={`relative min-h-[50vh] select-none touch-none no-scrollbar ${exitClass} ${entryClass}`}
      >
        {isFinished ? (
          <div className="text-center py-12 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/10 text-black">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium transition-colors hover:cursor-pointer"
              >
                <RotateCcw size={16} />
                {t({ sk: "Zopakovať", en: "Repeat" })}
              </button>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rosary-beige-light text-stone-700 text-sm font-medium transition-colors hover:cursor-pointer"
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
