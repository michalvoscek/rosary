import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// The browser dispatches beforeinstallprompt once per page load, shortly
// after load finishes. Components mounting later (e.g. SPA navigation onto
// /settings) would never see it, so capture it at module scope instead of
// inside the hook's effect and let late mounts pick up the stashed event.
let capturedPromptEvent: BeforeInstallPromptEvent | null = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  capturedPromptEvent = e as BeforeInstallPromptEvent;
});

window.addEventListener("appinstalled", () => {
  capturedPromptEvent = null;
});

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(() => capturedPromptEvent);
  const [isStandalone, setIsStandalone] = useState(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    return mq.matches || "standalone" in navigator;
  });

  useEffect(() => {
    // preventDefault is already handled by the module-scope listener above;
    // here we only mirror the stashed event into component state.
    const onBeforeInstallPrompt = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
      capturedPromptEvent = null;
      setDeferredPrompt(null);
      setIsStandalone(true);
    };
    const onDisplayModeChange = (e: MediaQueryListEvent) =>
      setIsStandalone(e.matches);

    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener("change", onDisplayModeChange);

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      mq.removeEventListener("change", onDisplayModeChange);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    // Prompting consumes the event; clear the stash so a later remount of
    // the settings page can't resurrect a spent prompt.
    capturedPromptEvent = null;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const ua = navigator.userAgent;
  const isIPhone = /iPhone|iPad|iPod/i.test(ua);
  // iPadOS reports a Mac user agent; require touch to catch real iPads
  const isMacWithTouch = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
  const isIOS = !isStandalone && (isIPhone || isMacWithTouch);

  return { canInstall: deferredPrompt !== null, install, isStandalone, isIOS };
}