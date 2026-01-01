import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Ambient color system - Premium Blue
        ambient: {
          50: "rgb(var(--ambient-50) / <alpha-value>)",
          100: "rgb(var(--ambient-100) / <alpha-value>)",
          200: "rgb(var(--ambient-200) / <alpha-value>)",
          300: "rgb(var(--ambient-300) / <alpha-value>)",
          400: "rgb(var(--ambient-400) / <alpha-value>)",
          500: "rgb(var(--ambient-500) / <alpha-value>)",
          600: "rgb(var(--ambient-600) / <alpha-value>)",
          700: "rgb(var(--ambient-700) / <alpha-value>)",
          800: "rgb(var(--ambient-800) / <alpha-value>)",
          900: "rgb(var(--ambient-900) / <alpha-value>)",
          950: "rgb(var(--ambient-950) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(59, 130, 246, 0.15)",
        "glow": "0 0 30px rgba(59, 130, 246, 0.2)",
        "glow-lg": "0 0 50px rgba(59, 130, 246, 0.25)",
        "glow-xl": "0 0 80px rgba(59, 130, 246, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(59, 130, 246, 0.1)",
        "ambient": "0 4px 20px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.1)",
        "ambient-lg": "0 8px 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(59, 130, 246, 0.15)",
        "premium": "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.05)",
        "card-hover": "0 20px 40px rgba(59, 130, 246, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
        "5xl": "96px",
      },
      blur: {
        "4xl": "72px",
        "5xl": "96px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scale-in-bounce": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.08)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(2deg)" },
          "50%": { transform: "translateY(-20px) rotate(0deg)" },
          "75%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1)"
          },
          "50%": {
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)"
          },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "text-gradient": {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "fade-in-right": "fade-in-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "scale-in-bounce": "scale-in-bounce 0.6s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "wiggle": "wiggle 0.5s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "text-gradient": "text-gradient 4s ease infinite",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "snappy": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      scale: {
        "102": "1.02",
        "103": "1.03",
        "104": "1.04",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
