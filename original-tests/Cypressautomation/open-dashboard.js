const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const dashboardPath = path.join(__dirname, 'cypress/reports/dashboard.html');

// Check if the dashboard file exists
if (!fs.existsSync(dashboardPath)) {
    console.log('Dashboard report not found. Run the tests first with: npm run test:e2e:report');
    process.exit(1);
}

// Determine the platform-specific command to open the file
const cmd = process.platform === 'win32'
    ? `start ${dashboardPath}`
    : process.platform === 'darwin'
        ? `open ${dashboardPath}`
        : `xdg-open ${dashboardPath}`;

// Open the dashboard in the default browser
exec(cmd, (error) => {
    if (error) {
        console.error(`Error opening dashboard: ${error.message}`);
        return;
    }
    console.log(`Opening dashboard: ${dashboardPath}`);
}); 