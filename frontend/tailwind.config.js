/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf3f4',
          100: '#fbe5e6',
          200: '#f6d1d4',
          300: '#efafb3',
          400: '#e48187',
          500: '#d55a61',
          600: '#bd3e45',
          700: '#9f3036',
          800: '#842b30',
          900: '#6f292e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
