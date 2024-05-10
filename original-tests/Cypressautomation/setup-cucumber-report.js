const fs = require('fs');
const path = require('path');

// Create cucumber-json directory if it doesn't exist
const cucumberJsonDir = path.join(__dirname, 'cypress/cucumber-json');
if (!fs.existsSync(cucumberJsonDir)) {
    console.log(`Creating directory: ${cucumberJsonDir}`);
    fs.mkdirSync(cucumberJsonDir, { recursive: true });
}

// Create cucumber-html report directory if it doesn't exist
const cucumberReportDir = path.join(__dirname, 'cypress/reports/cucumber-html');
if (!fs.existsSync(cucumberReportDir)) {
    console.log(`Creating directory: ${cucumberReportDir}`);
    fs.mkdirSync(cucumberReportDir, { recursive: true });
}

console.log('Report directories created successfully.'); 