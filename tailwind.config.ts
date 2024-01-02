import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "slideInLeft": {
          "0%": { "opacity": "0", "transform": "translateX(100%)" },
          "100%": { "opacity": "1", "transform": "translateX(0)" }
        },
        "slideOutLeft": {
          "0%": { "opacity": "1", "transform": "translateX(0)" },
          "100%": { "opacity": "0", "transform": "translateX(100%)" },
        },
        "slideInRight": {
          "0%": { "opacity": "0", "transform": "translateX(-100%)" },
          "100%": { "opacity": "1", "transform": "translateX(0)" }
        },
        "slideOutRight": {
          "0%": { "opacity": "1", "transform": "translateX(0)" },
          "100%": { "opacity": "0", "transform": "translateX(-100%)" },
        },
        "slideInBottom": {
          "0%": { "transform": "translateY(100%)" },
          "100%": { "transform": "translateY(0)" }
        },
        "fadeIn": {
          "0%": { "opacity": "0" },
          "100%": { "opacity": "1" }
        }
      },
      animation: {
        "slideInLeft": "slideInLeft 0.5s ease-in-out forwards",
        "slideInRight": "slideInRight 0.5s ease-in-out forwards",
        "slideInFromBottom": "slideInBottom 0.25s ease-in-out forwards",
      }
    },
  },
  plugins: [],
}
export default config
