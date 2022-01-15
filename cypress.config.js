module.exports = {
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    retries: { runMode: 2, openMode: 0 },
    video: true,
    screenshotOnRunFailure: true,
  },
};
