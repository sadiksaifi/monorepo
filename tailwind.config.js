/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      'background': '#0c0c0c',
      'altbackground': '#1a1a1a',
      'foreground': '#ffffff',
      'altforeground': '#CECECE',
      'primary': '#e5202b',      
      'altprimary': '#B71A22',
    },
    },
  },
  plugins: [],
}
