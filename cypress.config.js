const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');

function searchConfigFile(file) {
  const filePath = path.resolve('.', 'cypress', 'config', `${file}.json`)
  return fs.readJson(filePath)
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.configFile || 'dev'
      return searchConfigFile(file)

    },
  },
});
