import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F0",
        foreground: "#0F172A",
        muted: "#F6F6F7",
        "muted-foreground": "#64748B",
        border: "#EDEEEF",
        primary: {
          DEFAULT: "#6B7280",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#78716C",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0891B2",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#16A34A",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#D97706",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(107, 114, 128, 0.08)",
        "soft-hover": "0 12px 40px rgba(107, 114, 128, 0.14)",
      },
      keyframes: {
        "enter-up": {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "enter-up": "enter-up 260ms cubic-bezier(0.23, 1, 0.32, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
