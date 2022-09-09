/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
    },
    container: {
      // set padding on all media sizes to 24px
      padding: {
        DEFAULT: "16px",
        lg: "24px"
      },
      // set max-w to 1280px
      screens: {
        "2xl": "1280px",
        lg: "1024px"
      },
      // mx-auto automaticity
      center: true
    },
    extend: {}
  },
  plugins: [require("@tailwindcss/forms")]
}
