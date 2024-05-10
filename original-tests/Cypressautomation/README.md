# Cypress Test Automation Framework

A comprehensive test automation framework built with Cypress, supporting both traditional tests and BDD-style (Cucumber) testing.

## Features

- **BDD Testing**: Write tests in plain language using Gherkin syntax
- **Page Object Model**: Organized test structure with page objects
- **Multiple Reporting Options**: Generate detailed HTML reports
- **Screenshot Capture**: Automatic screenshot capture during test execution
- **Tag-Based Filtering**: Run specific test suites using tags (@Smoke, @Regression)
- **Cross-browser Testing**: Run tests on multiple browsers

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd Cypressautomation

# Install dependencies
npm install
```

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run all BDD feature tests
npm run cucumber
```

### Tag-Based Test Execution

```bash
# Run only tests with @Smoke tag
npm run cucumber:smoke

# Run only tests with @Regression tag
npm run cucumber:regression

# Run tests with either @Smoke or @Regression tags
npm run cucumber:all-tags
```

### Generating Reports

```bash
# Run tests and generate reports
npm run test:e2e:report

# Run tests with @Smoke tag and generate reports
npm run test:smoke:report

# Run tests with @Regression tag and generate reports
npm run test:regression:report

# Run all tests, generate reports, and open dashboard
npm run test:all
```

### Opening Reports

```bash
# Open the dashboard report in your default browser
npm run open:dashboard
```

## Reports

The framework generates several types of reports:

1. **Mochawesome Report**: A detailed technical report showing all test executions, steps, and assertions
   - Location: `cypress/reports/mochawesome/index.html`

2. **BDD Cucumber Report**: A BDD-focused report showing Gherkin scenarios and steps
   - Location: `cypress/reports/html/bdd-report.html`

3. **Combined Dashboard**: A high-level dashboard with test statistics and links to detailed reports
   - Location: `cypress/reports/dashboard.html`

## Project Structure

```
Cypressautomation/
├── cypress/
│   ├── e2e/
│   │   └── features/            # BDD feature files
│   │       └── step_definitions/# Step definition files
│   ├── fixtures/                # Test data files
│   ├── support/
│   │   ├── pageObjects/         # Page Object Model classes
│   │   ├── commands.js          # Custom Cypress commands
│   │   └── e2e.js               # Support file for e2e tests
│   ├── screenshots/             # Test screenshots
│   ├── videos/                  # Test videos
│   └── reports/                 # Generated test reports
├── cypress.config.js            # Cypress configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Configuration

The main Cypress configuration is in `cypress.config.js`. Key settings include:

- **Reporter**: Mochawesome reporter for detailed HTML reports
- **Screenshots**: Automatically capture screenshots on test failures
- **Videos**: Record videos of test executions
- **Environment Variables**: Configure test environment and tags

## Best Practices

1. **Page Object Model**: Create page objects for each page/component
2. **BDD Approach**: Write tests in Gherkin syntax for better readability
3. **Tag Tests**: Use tags to categorize tests (@Smoke, @Regression, etc.)
4. **Screenshots**: Take screenshots at key points in tests
5. **Custom Commands**: Create reusable custom commands for common actions 