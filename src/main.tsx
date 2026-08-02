import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}

if (navigator.storage?.persist) {
  void navigator.storage.persist();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/rosary/">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
