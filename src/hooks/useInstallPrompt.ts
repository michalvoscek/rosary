import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    return mq.matches || "standalone" in navigator;
  });

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onAppInstalled = () => {
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
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const ua = navigator.userAgent;
  const isIPhone = /iPhone|iPad|iPod/i.test(ua);
  // iPadOS reports a Mac user agent; require touch to catch real iPads
  const isMacWithTouch = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
  const isIOS = !isStandalone && (isIPhone || isMacWithTouch);

  return { canInstall: deferredPrompt !== null, install, isStandalone, isIOS };
}