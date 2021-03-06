module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
