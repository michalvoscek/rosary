import type { ReactNode } from "react";
import { useSwipeStack } from "../hooks/useSwipeStack";

interface SwipeStackProps {
  prev?: ReactNode;
  current: ReactNode;
  next?: ReactNode;
  onSwitch: (direction: "up" | "down") => void;
  canGoDown: () => boolean;
  syncKey: unknown;
  overlay?: ReactNode;
  className?: string;
}

export function SwipeStack({
  prev,
  current,
  next,
  onSwitch,
  canGoDown,
  syncKey,
  overlay,
  className = "",
}: SwipeStackProps) {
  const {
    containerRef,
    prevRef,
    currentRef,
    nextRef,
    onTouchStart,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useSwipeStack({ onSwitch, canGoDown, syncKey });

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 min-h-[50dvh] overflow-hidden select-none touch-none no-scrollbar ${className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {prev !== undefined && (
        <div
          ref={prevRef}
          className="absolute inset-x-0 top-0 h-full will-change-transform"
        >
          {prev}
        </div>
      )}

      <div
        ref={currentRef}
        className="absolute inset-x-0 top-0 h-full will-change-transform"
      >
        {current}
        {overlay}
      </div>

      {next !== undefined && (
        <div
          ref={nextRef}
          className="absolute inset-x-0 top-0 h-full will-change-transform"
        >
          {next}
        </div>
      )}
    </div>
  );
}
