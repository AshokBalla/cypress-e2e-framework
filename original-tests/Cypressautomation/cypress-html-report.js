const fs = require('fs');
const path = require('path');

// Convert JSON data to HTML
function generateHTMLReport() {
    const jsonPath = path.join(__dirname, 'cypress/cucumber-json/login.cucumber.json');
    const outputPath = path.join(__dirname, 'cypress/reports/html/bdd-report.html');

    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        // Create HTML content
        let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cypress BDD Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .feature { background-color: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .scenario { background-color: #fff; padding: 15px; margin: 10px 0; border-left: 4px solid #4CAF50; }
        .step { margin: 5px 0; padding: 5px; }
        .passed { color: #4CAF50; }
        .failed { color: #F44336; }
        .tag { display: inline-block; background-color: #2196F3; color: white; padding: 2px 8px; margin-right: 5px; border-radius: 3px; }
        .screenshots { margin-top: 20px; }
        .screenshot { margin-bottom: 10px; }
        img { max-width: 100%; border: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <h1>Cypress BDD Test Report</h1>
      <div class="feature">
        <h2>${jsonData.name}</h2>
        
        ${jsonData.elements.map(scenario => `
          <div class="scenario">
            <h3>
              ${scenario.tags.map(tag => `<span class="tag">${tag.name}</span>`).join(' ')}
              ${scenario.name}
            </h3>
            
            ${scenario.steps.map(step => `
              <div class="step ${step.result.status}">
                <strong>${step.keyword}</strong> ${step.name} - <span class="${step.result.status}">${step.result.status}</span>
              </div>
            `).join('')}
            
            <div class="screenshots">
              <h4>Screenshots:</h4>
              ${getScreenshotsForScenario(scenario.name)}
            </div>
          </div>
        `).join('')}
      </div>
      
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const passedCount = document.querySelectorAll('.passed').length;
          const failedCount = document.querySelectorAll('.failed').length;
          
          document.querySelector('h1').insertAdjacentHTML('afterend', 
            '<div style="margin-bottom: 20px;">' +
            '<strong>Summary:</strong> ' +
            '<span class="passed">' + passedCount + ' Passed</span>, ' +
            '<span class="failed">' + failedCount + ' Failed</span>' +
            '</div>'
          );
        });
      </script>
    </body>
    </html>
    `;

        // Ensure the directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the HTML file
        fs.writeFileSync(outputPath, html);
        console.log(`HTML report generated at: ${outputPath}`);

    } catch (error) {
        console.error('Error generating report:', error);
    }
}

// Helper function to get screenshots for a scenario
function getScreenshotsForScenario(scenarioName) {
    const screenshotsDir = path.join(__dirname, 'cypress/screenshots/login.feature');

    if (!fs.existsSync(screenshotsDir)) {
        return '<p>No screenshots available</p>';
    }

    try {
        const files = fs.readdirSync(screenshotsDir);

        // Filter screenshots based on scenario name or just return all for simplicity
        const scenarioScreenshots = files.filter(file => {
            return file.endsWith('.png');
        });

        if (scenarioScreenshots.length === 0) {
            return '<p>No screenshots available for this scenario</p>';
        }

        return scenarioScreenshots.map(file => {
            const relativePath = `../../../cypress/screenshots/login.feature/${file}`;
            return `<div class="screenshot">
        <p>${file.replace('.png', '')}</p>
        <img src="${relativePath}" alt="${file}" />
      </div>`;
        }).join('');

    } catch (error) {
        console.error('Error getting screenshots:', error);
        return '<p>Error loading screenshots</p>';
    }
}

// Generate the report
generateHTMLReport(); 