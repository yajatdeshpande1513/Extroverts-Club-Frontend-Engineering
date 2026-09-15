/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        app: {
          bg: "#0A0A0A",
          surface: "#121212",
          border: "#2E2E2E",
          borderLight: "#3D3D3D",
          text: "#FFFFFF",
          muted: "#9A9A9A",
          faint: "#6B6B6B",
          accent: "#8B5CF6",
          error: "#FF5C5C",
          success: "#4ADE80",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(24px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-24px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        toastIn: {
          "0%": { opacity: 0, transform: "translateY(-16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        slideUp: "slideUp 0.45s ease-out",
        slideInRight: "slideInRight 0.35s ease-out",
        slideInLeft: "slideInLeft 0.35s ease-out",
        toastIn: "toastIn 0.3s ease-out",
        shake: "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
}

