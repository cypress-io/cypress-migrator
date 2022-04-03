import { defineConfig } from 'cypress'
// eslint-disable-next-line @typescript-eslint/no-var-requires
export default defineConfig({
  baseUrl: 'http://localhost:4200',
  e2e: {
    supportFile: 'src/support/e2e.ts',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportHeight: 660,
    viewportWidth: 1000,
    fixturesFolder: 'src/fixtures',
    chromeWebSecurity: false,
    projectId: 'pc1n6e',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      //
    },
  },
})
