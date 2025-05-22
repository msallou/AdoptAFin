import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // your existing keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-to-right": {
          from: { left: "0.5rem" },
          to: { right: "0.5rem" },
        },
        "fade-to-left": {
          from: { right: "0.5rem" },
          to: { left: "0.5rem" },
        },

        // 🔥 Ocean Animations
        rise: {
          "0%": { transform: "translateY(0)", opacity: "0.6", scale: "0.8" },
          "100%": { transform: "translateY(-100vh)", opacity: "0", scale: "1.1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        swimLeft: {
          "0%": { transform: "translateX(0) opacity(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "45%": { transform: "translateX(-40vw) translateY(-30px)" },
          "55%": { transform: "translateX(-60vw) translateY(30px)" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(-120vw) translateY(0px)", opacity: "0" },
        },
        swimRight: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "45%": { transform: "translateX(40vw) translateY(-30px)" },
          "55%": { transform: "translateX(60vw) translateY(30px)" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateX(120vw) translateY(0)", opacity: "0" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" }, 
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-to-right": "fade-to-right 0.2s ease-out",
        "fade-to-left": "fade-to-left 0.2s ease-out",

        rise: "rise 3s ease-in-out forwards",
        shimmer: "shimmer 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
        "swim-left": "swimLeft 20s ease-in-out forwards",
        "swim-right": "swimRight 20s ease-in-out forwards",
        beat: "beat 0.6s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;