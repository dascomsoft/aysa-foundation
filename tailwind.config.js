/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8faf8',
          100: '#e8f0e8',
          200: '#c5dcc5',
          300: '#a2c8a2',
          400: '#5c9f5c',
          500: '#167616',
          600: '#146a14',
          700: '#115811',
          800: '#0d460d',
          900: '#0b390b',
        },
        accent: {
          50: '#fdf8f0',
          100: '#faedd9',
          200: '#f5dbb3',
          300: '#f0c98d',
          400: '#e6a541',
          500: '#dc8116',
          600: '#c67414',
          700: '#a56111',
          800: '#844d0d',
          900: '#6c3f0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
