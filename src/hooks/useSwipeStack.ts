import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 60; // px
const SPEED_AFTER_RELEASE = 2500; // px/s
const WHEEL_THRESHOLD = 40; // px
const WHEEL_GROUP_MS = 120; // ms
const SNAP_BACK_DURATION_MS = 250;

interface UseSwipeStackOptions {
  onSwitch: (direction: "up" | "down") => void;
  canGoDown: () => boolean;
  syncKey: unknown;
}

export function useSwipeStack({
  onSwitch,
  canGoDown,
  syncKey,
}: UseSwipeStackOptions) {
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
  const [containerHeight, setContainerHeight] = useState(0);

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

  // Reset card positions whenever the active item or container height changes,
  // but not during an active animation or drag (ResizeObserver-driven height
  // changes would otherwise jump the card mid-motion).
  useLayoutEffect(() => {
    if (isAnimatingRef.current || isDraggingRef.current) return;
    applyOffset(0);
  }, [syncKey, containerHeight, applyOffset]);

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

  // Refs exposed to native listeners (stable across renders)
  const onSwitchRef = useRef(onSwitch);
  const canGoDownRef = useRef(canGoDown);
  const animateToRef = useRef(animateTo);

  useEffect(() => {
    onSwitchRef.current = onSwitch;
  }, [onSwitch]);

  useEffect(() => {
    canGoDownRef.current = canGoDown;
  }, [canGoDown]);

  useEffect(() => {
    animateToRef.current = animateTo;
  }, [animateTo]);

  const switchTo = (direction: "up" | "down") => {
    isAnimatingRef.current = false;
    onSwitchRef.current(direction);
  };

  const handleRelease = (deltaY: number) => {
    isDraggingRef.current = false;
    dragStartYRef.current = null;

    const canGoUp = true;
    const canGoDown = canGoDownRef.current();

    if (deltaY < -SWIPE_THRESHOLD && canGoUp) {
      isAnimatingRef.current = true;
      animateToRef.current(-containerHeightRef.current, () => {
        switchTo("up");
      });
    } else if (deltaY > SWIPE_THRESHOLD && canGoDown) {
      isAnimatingRef.current = true;
      animateToRef.current(containerHeightRef.current, () => {
        switchTo("down");
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

  // Native non-passive touchmove listener: React attaches delegated touch
  // listeners as passive, so preventDefault() must go through a native
  // listener (same approach as the wheel handler below).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchMoveNative = (e: TouchEvent) => {
      if (!isDraggingRef.current || dragStartYRef.current === null) return;
      e.preventDefault();
      const deltaY = e.touches[0].clientY - dragStartYRef.current;
      const resisted =
        deltaY > 0 && !canGoDownRef.current() ? deltaY * 0.25 : deltaY;
      applyOffset(resisted);
    };

    container.addEventListener("touchmove", onTouchMoveNative, {
      passive: false,
    });
    return () => {
      container.removeEventListener("touchmove", onTouchMoveNative);
    };
  }, [applyOffset]);

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
    const resisted =
      deltaY > 0 && !canGoDownRef.current() ? deltaY * 0.25 : deltaY;
    applyOffset(resisted);
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
        const canGoDown = canGoDownRef.current();

        if (accumulatedDelta > WHEEL_THRESHOLD && canGoUp) {
          isAnimatingRef.current = true;
          animateToRef.current(-containerHeightRef.current, () => {
            switchTo("up");
          });
        } else if (accumulatedDelta < -WHEEL_THRESHOLD && canGoDown) {
          isAnimatingRef.current = true;
          animateToRef.current(containerHeightRef.current, () => {
            switchTo("down");
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

  return {
    containerRef,
    prevRef: prevCardRef,
    currentRef: currentCardRef,
    nextRef: nextCardRef,
    onTouchStart,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}
