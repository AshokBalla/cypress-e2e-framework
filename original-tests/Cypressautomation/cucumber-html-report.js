const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: 'cypress/cucumber-json',
    reportPath: 'cypress/reports/cucumber-html',
    metadata: {
        browser: {
            name: 'chrome',
            version: '114'
        },
        device: 'Local test machine',
        platform: {
            name: 'mac',
            version: 'Ventura'
        }
    },
    customData: {
        title: 'Cypress BDD Test Execution Report',
        data: [
            { label: 'Project', value: 'Cypress Automation' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date().toISOString() }
        ]
    }
}); 