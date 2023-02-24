const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const { exec } = require('child_process')

function searchConfigFile(file) {
  const filePath = path.resolve('.', 'cypress', 'config', `${file}.json`)
  return fs.readJson(filePath)
}

module.exports = defineConfig({
  video: false,
  viewportWidth: 1000,
  viewportHeight: 660,
  screenshotsFolder: 'reports/screenshots',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports',
    reportPageTitle: 'Serverest.dev - api testing automation',
    embeddedScreenshots: true,
    inlineAssets: false,
    charts: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:run', async (details) => {
        console.log('Cleaning all the old reports...')
        exec(`node ${path.join(__dirname, './cypress/support/clear.js')}`);
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      const file = config.env.configFile || 'dev'
      return searchConfigFile(file)
    },
  },
});
