import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F3",
        surface: "#FFFFFF",
        foreground: "#202927",
        muted: "#F1EEE7",
        "muted-foreground": "#5E6B68",
        border: "#DCE3E1",
        mint: "#DCEFEB",
        primary: {
          DEFAULT: "#126B67",
          dark: "#123F3D",
          foreground: "#FFFFFF",
        },
        coral: {
          DEFAULT: "#E36F56",
          soft: "#FBE6DE",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#237A57",
          soft: "#E7F4EC",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#286FAF",
          soft: "#EAF2FA",
          foreground: "#FFFFFF",
        },
        attention: {
          DEFAULT: "#A86408",
          soft: "#FFF1D6",
          foreground: "#FFFFFF",
        },
        urgent: {
          DEFAULT: "#B42332",
          soft: "#FCE8EA",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        marketing: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(18, 63, 61, 0.07)",
        "soft-hover": "0 8px 28px rgba(18, 63, 61, 0.1)",
      },
      keyframes: {
        "enter-up": {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "enter-up": "enter-up 200ms cubic-bezier(0.23, 1, 0.32, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
