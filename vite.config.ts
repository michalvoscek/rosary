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
        screenshots: [
          {
            src: "/rosary/screenshots/narrow_1.jpg",
            sizes: "1220x2712",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Prayer view",
          },
          {
            src: "/rosary/screenshots/narrow_2.jpg",
            sizes: "1220x2712",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Mysteries list",
          },
          {
            src: "/rosary/screenshots/narrow_3.jpg",
            sizes: "1220x2712",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "Prayer in progress",
          },
          {
            src: "/rosary/screenshots/wide_1.png",
            sizes: "1415x967",
            type: "image/png",
            form_factor: "wide",
            label: "Prayer view",
          },
          {
            src: "/rosary/screenshots/wide_2.png",
            sizes: "1415x967",
            type: "image/png",
            form_factor: "wide",
            label: "Mysteries list",
          },
          {
            src: "/rosary/screenshots/wide_3.png",
            sizes: "1415x967",
            type: "image/png",
            form_factor: "wide",
            label: "Prayer in progress",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,jpg,png,svg}"],
      },
    }),
  ],
});
