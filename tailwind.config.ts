import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      boxShadow: {
        glow: "0 0 45px rgba(45, 212, 191, 0.24)",
        gold: "0 0 70px rgba(252, 211, 77, 0.36)",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "beam-scan": {
          "0%": { transform: "translateX(-35%)", opacity: "0" },
          "25%": { opacity: "0.8" },
          "100%": { transform: "translateX(115%)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "vault-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
      animation: {
        "beam-scan": "beam-scan 5.5s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "vault-pulse": "vault-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
