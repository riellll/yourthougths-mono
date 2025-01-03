/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-red': 'inset 0 0 10px 2px rgba(255, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

