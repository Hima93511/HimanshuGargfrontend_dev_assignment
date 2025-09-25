module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" // optional if using app router
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5a4', // teal-ish
          dark: '#0b7b78'
        }
      }
    }
  },
  plugins: [],
}
