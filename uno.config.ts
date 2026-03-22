import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {
    "panel-card":
      "rounded-3xl border border-white/60 bg-white/75 shadow-xl shadow-slate-900/8 backdrop-blur",
  },
  theme: {
    colors: {
      brand: {
        50: "#f3f7ff",
        100: "#e6efff",
        500: "#356dff",
        600: "#2658d8",
        700: "#2149af",
      },
    },
  },
});
