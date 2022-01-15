# cypress-automation

Reusable Cypress repository for authentication, CRUD, API validation, and report-friendly execution.

## Highlights

- Cypress
- Custom commands
- API helper utilities
- CI workflows with artifact preservation

## Getting Started

```bash
npm install
npm test
npm run test:e2e
```

## Project Structure

- `cypress/e2e/`
- `cypress/fixtures/`
- `cypress/support/`
- `cypress/pages/`
- `scripts/`
- `reports/`

## Reporting

- HTML, JSON, and screenshot/video friendly output paths are pre-created.
- CI examples publish artifacts and preserve failure diagnostics.

## Contribution Guide

1. Create a branch from `develop`.
2. Keep helpers reusable and environment-driven.
3. Add or update validation tests with every framework change.
4. Document any new test data, report artifacts, and CI behavior.

## Notes

- Screenshots and videos are retained only for failures.
- - 2023: created focused repository split for Cypress UI and API automation with reusable commands and CI wiring.

## Career Evolution & Historical Tests
The `original-tests` directory contains historical test suites and experiments from earlier stages of this project's lifecycle (2023-2025). This folder is preserved to demonstrate the evolution from initial test scripts to the modern, scalable framework architecture seen in the current `tests/` and `src/` directories.
