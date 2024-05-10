module.exports = {
    json: {
        enabled: true,
        output: "cypress/cucumber-json",
    },
    messages: {
        enabled: true,
        output: "cypress/cucumber-messages",
    },
    html: {
        enabled: true,
        output: "cypress/cucumber-reports",
    },
    stepDefinitions: [
        "cypress/integration/example/BDD/**/[^.]*.js",
        "cypress/integration/example/BDD/*.js",
        "cypress/support/step_definitions/**/*.js",
    ],
}; 