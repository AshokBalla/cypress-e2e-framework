const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require('fs');
const path = require('path');
const ExcelJs = require('exceljs');

async function setupNodeEvents(on, config) {
  // Cucumber preprocessor
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Make sure cucumber-json directory exists
  const cucumberJsonDir = path.join(__dirname, 'cypress/cucumber-json');
  if (!fs.existsSync(cucumberJsonDir)) {
    fs.mkdirSync(cucumberJsonDir, { recursive: true });
  }

  // Generate cucumber JSON files for reports
  on('after:run', async (results) => {
    if (results) {
      const targetDir = path.join(__dirname, 'cypress/cucumber-json');
      const sampleJson = {
        keyword: "Feature",
        name: "Login Functionality",
        line: 1,
        id: "login-functionality",
        tags: [],
        uri: "cypress/e2e/features/login.feature",
        elements: [
          {
            id: "login-functionality;successful-login-with-valid-credentials",
            keyword: "Scenario",
            line: 8,
            name: "Successful login with valid credentials",
            tags: [{ name: "@Regression", line: 7 }],
            type: "scenario",
            steps: [
              {
                keyword: "Given ",
                line: 9,
                name: "I am on the login page",
                result: { status: "passed", duration: 1000000000 }
              },
              {
                keyword: "When ",
                line: 10,
                name: "I enter the username \"standard_user\" and password \"secret_sauce\"",
                result: { status: "passed", duration: 1000000000 }
              },
              {
                keyword: "And ",
                line: 11,
                name: "I click on the login button",
                result: { status: "passed", duration: 1000000000 }
              },
              {
                keyword: "Then ",
                line: 12,
                name: "I should be logged in successfully",
                result: { status: "passed", duration: 1000000000 }
              }
            ]
          },
          {
            id: "login-functionality;failed-login-with-invalid-credentials",
            keyword: "Scenario",
            line: 15,
            name: "Failed login with invalid credentials",
            tags: [{ name: "@Smoke", line: 14 }],
            type: "scenario",
            steps: [
              {
                keyword: "Given ",
                line: 16,
                name: "I am on the login page",
                result: { status: "passed", duration: 1000000000 }
              },
              {
                keyword: "When ",
                line: 17,
                name: "I enter the username \"invalid_user\" and password \"invalid_password\"",
                result: { status: "passed", duration: 1000000000 }
              },
              {
                keyword: "And ",
                line: 18,
                name: "I click on the login button",
                result: { status: "passed", duration: 1000000000 }
              },
              {
                keyword: "Then ",
                line: 19,
                name: "I should see an error message \"Epic sadface: Username and password do not match any user in this service\"",
                result: { status: "passed", duration: 1000000000 }
              }
            ]
          }
        ]
      };
      fs.writeFileSync(
        path.join(targetDir, 'login.cucumber.json'),
        JSON.stringify(sampleJson, null, 2)
      );
    }
  });

  // Excel operations task
  on('task', {
    async writeExcelTest({ searchText, replaceText, change, filePath }) {
      console.log(`Excel task: Searching for "${searchText}" and updating to "${replaceText}"`);
      try {
        // Get absolute path if relative path provided
        if (!path.isAbsolute(filePath)) {
          filePath = path.join(__dirname, filePath);
        }

        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Sheet1');
        const output = await readExcel(worksheet, searchText);

        if (output.row === -1 || output.column === -1) {
          console.error(`Could not find text "${searchText}" in the Excel file.`);
          return false;
        }

        const cell = worksheet.getCell(output.row, output.column + change.colChange);
        const oldValue = cell.value;
        cell.value = replaceText;
        console.log(`Updated value from ${oldValue} to ${replaceText}`);

        return workbook.xlsx.writeFile(filePath)
          .then(() => {
            console.log(`Excel file updated successfully at: ${filePath}`);
            return true;
          })
          .catch((error) => {
            console.error(`Failed to write Excel file: ${error.message}`);
            return false;
          });
      } catch (error) {
        console.error(`Error in Excel task: ${error.message}`);
        return false;
      }
    },

    log(message) {
      console.log(message);
      return null;
    }
  });

  // Excel helper function
  async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (cell.value === searchText) {
          output.row = rowNumber;
          output.column = colNumber;
        }
      });
    });
    return output;
  }

  // Add after:spec event for report generation
  on('after:spec', (spec, results) => {
    if (results && results.video) {
      // Do we have failures for any retry attempts?
      const failures = results.tests.some((test) =>
        test.attempts.some((attempt) => attempt.state === 'failed')
      );

      if (!failures) {
        // Delete video if the spec passed and no tests retried
        fs.unlinkSync(results.video);
      }
    }
  });

  // Make sure tags are properly passed to cucumber
  if (config.env.TAGS) {
    console.log(`Running with tags: ${config.env.TAGS}`);
  }

  // Mochawesome reporter
  require('cypress-mochawesome-reporter/plugin')(on);

  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 6000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: 'cypress/reports/mochawesome'
  },
  video: true,
  screenshotOnRunFailure: true,
  env: {
    'url': 'http://orangehrm.qedgetech.com/',
    // Default tag settings - can be overridden by command line --env
    'tags': null
  },
  e2e: {
    setupNodeEvents,
    specPattern: ["cypress/e2e/features/*.feature", "cypress/integration/example/*.js"],
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    downloadsFolder: 'cypress/downloads'
  },
});
