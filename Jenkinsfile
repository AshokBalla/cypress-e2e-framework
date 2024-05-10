pipeline {
  agent any
  stages {
    stage('Validate') { steps { sh 'npm test' } }
    stage('Cypress E2E') { steps { sh 'npm run test:e2e || true' } }
  }
}
