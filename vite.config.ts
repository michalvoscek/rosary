import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/rosary/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Rosary Prayer",
        short_name: "Rosary",
        description:
          "Interactive Rosary prayer app with bilingual support (Slovak/English)",
        // Install-time colors; keep in sync with the light theme in src/index.css
        theme_color: "#faf0e6",
        background_color: "#eed9c4",
        display: "standalone",
        orientation: "portrait",
        scope: "/rosary/",
        start_url: "/rosary/",
        icons: [
          {
            src: "/rosary/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/rosary/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/rosary/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
