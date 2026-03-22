import { defineConfig } from "unocss";
import { presetWind3 } from "@unocss/preset-wind3";

export default defineConfig({
  presets: [presetWind3()],
  shortcuts: {
    "panel-card":
      "rounded-2xl border border-white/8 bg-white/4 shadow-2xl shadow-black/30 backdrop-blur-xl",
    "soft-ring": "ring-1 ring-inset ring-primary-400/14",
  },
  theme: {
    colors: {
      primary: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
      },
    },
  },
});
