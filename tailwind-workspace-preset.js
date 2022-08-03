// tailwind-workspace-preset.js
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: false,
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        mono: ['Consolas', 'Monaco', 'Andale Mono', 'monospace'],
        ...defaultTheme.fontFamily.mono,
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      yellow: colors.amber,
      white: colors.white,
      black: colors.black,
      red: {
        50: '#fbeff1',
        100: '#fad9df',
        200: '#f8c4cd',
        300: '#f59aa9',
        400: '#e45770',
        500: '#c62b49',
        600: '#9f1331',
        700: '#7a0723',
        800: '#5e021b',
        900: '#4f0018',
        1000: '#490018',
      },
      orange: {
        100: '#F3ECB3'
      },
      indigo: {
        50: "#F0F1FF",
        100: "#DADDFE",
        200: "#C5C9FD",
        400: "#6470F3",
        500: "#4956E3",
        900: "#1C236D",
      },
      jade: {
        50: "#E4FBF2",
        100: "#C2F1DE",
        200: "#A3E7CB",
        300: "#69D3A7",
        400: "#1FA971",
        500: "#197d55",
        700: "#00442A",
        800: "#003220",
      },
      gray: {
        50: '#f3f4fa',
        100: '#e1e3ed',
        200: '#d0d2e0',
        300: '#bfc2d4',
        400: '#afb3c7',
        500: '#9095ad',
        600: '#747994',
        700: '#5a5f7a',
        800: '#434861',
        900: '#2e3247',
        1000: '#1b1e2e',
      },
    },
  },
  variants: {
    padding: ['first', 'last', 'responsive'],
  },
  plugins: [require('@tailwindcss/typography')],
}
