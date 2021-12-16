const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind')
const sharedTailwindConfig = require('../../tailwind-workspace-preset')

module.exports = {
  presets: [sharedTailwindConfig],
  mode: 'jit',
  purge: ['./apps/ng-migrator/src/**/*.{html, ts}', ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-forms')],
}
