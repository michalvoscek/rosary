import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export type PageDirection = "forward" | "back";

interface PageTransitionContextValue {
  direction: PageDirection;
  transitionId: number;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null,
);

function majorPageKey(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/pray")) return "pray";
  if (pathname.startsWith("/calendar")) return "calendar";
  return pathname;
}

export function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [direction, setDirection] = useState<PageDirection>("forward");
  const [transitionId, setTransitionId] = useState(0);

  const isFirstRender = useRef(true);
  const prevPageKeyRef = useRef(majorPageKey(location.pathname));
  const prevIdxRef = useRef<number | null>(null);

  useEffect(() => {
    const pageKey = majorPageKey(location.pathname);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPageKeyRef.current = pageKey;
      prevIdxRef.current =
        (window.history.state as { idx?: number } | null)?.idx ?? null;
      return;
    }

    if (pageKey === prevPageKeyRef.current) {
      prevPageKeyRef.current = pageKey;
      return;
    }

    const idx = (window.history.state as { idx?: number } | null)?.idx ?? null;
    let dir: PageDirection;

    if (
      navigationType === "POP" &&
      prevIdxRef.current !== null &&
      idx !== null
    ) {
      dir = idx > prevIdxRef.current ? "forward" : "back";
    } else {
      dir = location.pathname === "/" ? "back" : "forward";
    }

    prevPageKeyRef.current = pageKey;
    prevIdxRef.current = idx;

    setDirection(dir);
    setTransitionId((id) => id + 1);
  }, [location.pathname, location.search, navigationType]);

  return (
    <PageTransitionContext.Provider value={{ direction, transitionId }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider",
    );
  }
  return context;
}
