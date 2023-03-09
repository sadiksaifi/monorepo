/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      'light': '#F9FAFB',
      'dark': '#111111',
      'altdark': '#202023',
    },
    },
  },
  plugins: [],
}
