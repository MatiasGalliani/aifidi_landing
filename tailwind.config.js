/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out',
      },
    },
    screens: {
      'md': '1200px', // o el valor que necesites
      // ...otros breakpoints
    },
    // ...otras configuraciones
  },
  plugins: [],
  // ...otras configuraciones
}
