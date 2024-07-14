/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      resize: {
        both: 'both',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.resize-both': {
          resize: 'both',
        },
      });
    },
  ],
}

