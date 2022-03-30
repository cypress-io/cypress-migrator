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
      },
    },
    colors: {
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
      gray: {
        50: "#F3F4FA",
        400: "#AFB3C7",
        600: "#747994",
        700: "#5A5F7A",
        800: "#434861",
        900: "#2E3247",
        1000: "#1B1E2E",
      },
      indigo: {
        50: "#F0F1FF",
        100: "#DADDFE",
        500: "#4956E3",
        900: "#1C236D",
      },
      jade: {
        50: "#E4FBF2",
        100: "#C2F1DE",
        200: "#A3E7CB",
        300: "#69D3A7",
        700: "#00442A",
        800: "#003220",
      },
      teal: {
        500: "#007780",
        600: "#00595D",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
