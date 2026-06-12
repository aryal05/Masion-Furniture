import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm luxury palette
        ivory: "#F8F5F0",
        "ivory-dark": "#E8E3DC",
        charcoal: "#1A1714",
        walnut: "#3B2314",
        "walnut-dark": "#2A1810",
        brass: "#C9933A",
        "brass-light": "#E0B87D",
        sage: "#4A7C59",
        rose: "#C0504A",
        muted: "#7A756F",
        "text-muted": "#8A7E72",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        display: ["var(--font-display)", "serif"],
      },
      fontSize: {
        // Fluid scaling with clamp()
        "display-xs": "clamp(1.5rem, 4vw, 2.5rem)",
        "display-sm": "clamp(2rem, 5vw, 3rem)",
        "display-md": "clamp(2.5rem, 6vw, 3.5rem)",
        "display-lg": "clamp(3rem, 7vw, 4.5rem)",
      },
      letterSpacing: {
        display: "-0.02em",
        label: "0.04em",
        tighter: "-0.02em",
      },
      lineHeight: {
        display: "1.2",
        tight: "1.3",
        body: "1.7",
      },
      spacing: {
        "section-sm": "3rem",
        "section-md": "4rem",
        "section-lg": "6rem",
        "section-xl": "8rem",
      },
      borderRadius: {
        card: "12px",
        btn: "4px",
        lg: "12px",
      },
      boxShadow: {
        warm: "0 4px 24px rgba(59, 35, 20, 0.08)",
        "warm-lg": "0 8px 32px rgba(59, 35, 20, 0.12)",
        "warm-xl": "0 12px 48px rgba(59, 35, 20, 0.16)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "shimmer-warm": "shimmer-warm 1.4s infinite linear",
        "draw-line": "draw-line 1.5s ease-out forwards",
        "bounce-soft": "bounce-soft 1s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      keyframes: {
        "shimmer-warm": {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-0.5rem)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
