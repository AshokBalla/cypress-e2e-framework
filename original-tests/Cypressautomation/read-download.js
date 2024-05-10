const ExcelJS = require('exceljs');
const path = require('path');

async function readDownloadedExcel() {
    try {
        const filePath = path.join(__dirname, 'cypress/downloads/download.xlsx');
        console.log(`Reading Excel file from: ${filePath}`);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1); // Get first sheet

        console.log('\nDownloaded Excel File Contents:');
        console.log('------------------------------');

        // Print all rows and cells
        worksheet.eachRow((row, rowNumber) => {
            let rowData = `Row ${rowNumber}: `;
            row.eachCell((cell, colNumber) => {
                rowData += `[${colNumber}:${cell.value}] `;
            });
            console.log(rowData);
        });

        console.log('\nExcel file read successfully.');
    } catch (error) {
        console.error(`Error reading Excel file: ${error.message}`);
    }
}

// Run the function
readDownloadedExcel(); 