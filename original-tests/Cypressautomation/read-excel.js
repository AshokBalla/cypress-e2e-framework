const ExcelJS = require('exceljs');
const path = require('path');

async function readExcelFile() {
    try {
        const filePath = path.join(process.cwd(), 'excelTest.xlsx');
        console.log(`Reading Excel file from: ${filePath}`);

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Sheet1');

        console.log('\nExcel File Contents:');
        console.log('-------------------');

        // Read column headers
        const headers = [];
        worksheet.getRow(1).eachCell((cell, colNumber) => {
            headers[colNumber] = cell.value;
        });

        // Print header row
        let headerRow = '';
        headers.forEach((header, index) => {
            if (header) {
                headerRow += `${header}`.padEnd(15);
            }
        });
        console.log(headerRow);
        console.log('-'.repeat(headerRow.length));

        // Print data rows
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Skip header row
                let rowData = '';
                row.eachCell((cell, colNumber) => {
                    rowData += `${cell.value}`.padEnd(15);
                });
                console.log(rowData);
            }
        });

        console.log('\nExcel file read successfully.');
    } catch (error) {
        console.error(`Error reading Excel file: ${error.message}`);
    }
}

// Run the function
readExcelFile(); 