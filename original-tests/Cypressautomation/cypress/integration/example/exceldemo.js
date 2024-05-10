const ExcelJs = require('exceljs');
const path = require('path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    console.log(`Attempting to modify Excel file at: ${filePath}`);
    console.log(`Looking for "${searchText}" and updating to "${replaceText}"`);

    try {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Sheet1');
        const output = await readExcel(worksheet, searchText);

        if (output.row === -1 || output.column === -1) {
            console.error(`Could not find text "${searchText}" in the Excel file.`);
            return false;
        }

        console.log(`Found "${searchText}" at row ${output.row}, column ${output.column}`);

        const cell = worksheet.getCell(output.row, output.column + change.colChange);
        const oldValue = cell.value;
        cell.value = replaceText;
        console.log(`Updated value from ${oldValue} to ${replaceText}`);

        await workbook.xlsx.writeFile(filePath);
        console.log(`Excel file updated successfully at: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`Error updating Excel file: ${error.message}`);
        return false;
    }
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

// Get the absolute path to the Excel file
const excelFilePath = path.join(process.cwd(), 'excelTest.xlsx');

// Run the function
console.log('Starting Excel demo test...');
writeExcelTest("Mango", 350, { rowChange: 0, colChange: 1 }, excelFilePath)
    .then(success => {
        if (success) {
            console.log('Excel demo test completed successfully.');
        } else {
            console.log('Excel demo test failed.');
        }
    })
    .catch(error => {
        console.error(`Excel demo test error: ${error.message}`);
    });
