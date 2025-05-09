/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8e8e8',
        secondary: '#ffffff',
        gradientStart: '#f2a8ce',
        gradientEnd: '#fff1f8',
        elements: '#ff7c00',
        textMain: '#000000',
        textSecondary: '#e8e8e8',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [
        require('tailwind-scrollbar-hide')
  ]
};