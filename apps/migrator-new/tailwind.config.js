const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')
const sharedTailwindConfig = require('../../libs/tailwind/tailwind.config')

module.exports = {
  presets: [sharedTailwindConfig],
  mode: 'jit',
  purge: ['./apps/migrator-new/src/**/*.{html, ts}', ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-forms')],
}
