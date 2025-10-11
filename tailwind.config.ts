/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", //  Enables dark mode via a `.dark` class
  theme: {
    extend: {
      colors: {
        //  Brand Colors
        primary: "#7C3AED",    // Vibrant Purple
        secondary: "#3B82F6",  // Soft Blue Accent
        accent: "#10B981",     // Emerald green for success states
        danger: "#EF4444",     // Red for delete/error states

        //  Dark Theme Palette
        background: "#12121C", // Main dark background
        surface: "#1E1E2F",    // Card / panel background
        border: "#2E2E3F",     // Soft borders
        text: {
          DEFAULT: "#E5E7EB",  // Light gray text
          muted: "#9CA3AF",    // Muted text for placeholders / hints
        },

        // Light Theme (for future toggling)
        light: {
          background: "#FFFFFF",
          surface: "#F3F4F6",
          text: "#111827",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        glow: "0 0 10px rgba(99, 102, 241, 0.3)",
        card: "0 4px 20px rgba(0, 0, 0, 0.2)",
      },

      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
