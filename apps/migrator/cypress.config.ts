import { defineConfig } from 'cypress'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { devServer } = require('@cypress/react/plugins/next')
export default defineConfig({
  baseUrl: 'http://localhost:4200',
  component: {
    devServer,
    supportFile: 'cypress/support/component.ts',
    specPattern: 'components/**/*.cy.{js,jsx,ts,tsx}',
    componentFolder: 'components',
  },
})
