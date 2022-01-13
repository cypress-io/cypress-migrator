// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    supportFile: 'src/support/e2e.js',
    specPattern: 'src/e2e/**/*.cy.{js,ts}',
    viewportHeight: 660,
    viewportWidth: 1000,
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    modifyObstructiveCode: false,
    video: true,
    videosFolder: '../../dist/src/apps/migrator-e2e/videos',
    screenshotsFolder: '../../dist/src/apps/migrator-e2e/screenshots',
    chromeWebSecurity: false,
    projectId: 'pc1n6e',
    baseUrl: 'http://localhost:4200',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      //
    },
  },
})
