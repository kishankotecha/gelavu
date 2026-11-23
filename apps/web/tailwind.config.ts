import type { Config } from "tailwindcss";

const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: c("ink"), 2: c("ink-2"), 3: c("ink-3") },
        lime: c("lime"),
        gold: c("gold"),
        paper: c("paper"),
        surface: c("surface"),
        line: c("line"),
        muted: c("muted"),
        live: c("live"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-rogenz)", "'Rogenz'", "Impact", "sans-serif"],
        rogenz: ["var(--font-rogenz)", "'Rogenz'", "Impact", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgb(11 18 32 / .04), 0 8px 24px -14px rgb(11 18 32 / .14)",
        lift: "0 2px 4px rgb(11 18 32 / .06), 0 18px 34px -14px rgb(11 18 32 / .28)",
      },
      keyframes: { "fade-up": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } } },
      animation: { "fade-up": "fade-up .4s ease-out both" },
    },
  },
  plugins: [],
};

export default config;
