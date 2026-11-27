import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#14212D',
        cream: '#F4EDE0',
        coral: '#FF685B',
        hotpink: '#FF685B',
        white: '#FFFFFF',
        ink: { DEFAULT: '#14212D', 2: '#14212D', 3: '#14212D' },
        lime: '#FF685B',
        gold: '#FF685B',
        paper: '#F4EDE0',
        surface: '#14212D',
        line: 'rgba(244, 237, 224, 0.15)',
        muted: 'rgba(244, 237, 224, 0.7)',
        live: '#FF685B',
        apricot: "#FF685B",
        marigold: "#FF685B",
        garden: "#FF685B",
        poppy: "#FF685B",
        midnight: "#14212D",
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
