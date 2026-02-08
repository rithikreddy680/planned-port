import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "#ffffff",
          foreground: "#000000"
        }
      },
      borderRadius: {
        lg: "0.25rem",
        md: "0.125rem",
        sm: "0"
      },
      fontFamily: {
        aeonik: ["var(--font-aeonik)", ...fontFamily.sans],
        /* Aeonik three voices – same family, different weight/tracking */
        display: ["var(--font-aeonik)", ...fontFamily.sans],
        narrator: ["var(--font-aeonik)", ...fontFamily.sans],
        architect: ["var(--font-aeonik)", ...fontFamily.sans],
        geistSans: ["var(--font-geist-sans)", ...fontFamily.sans],
        geistMono: ["var(--font-geist-mono)", ...fontFamily.mono]
      },
      letterSpacing: {
        tightest: "-0.04em",
        "architect-narrow": "0.05em",
        "architect-wide": "0.1em"
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(20px, -24px)" },
          "50%": { transform: "translate(-16px, -12px)" },
          "75%": { transform: "translate(18px, 10px)" }
        }
      },
      animation: {
        "spin-slow": "spin-slow 8s linear infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
