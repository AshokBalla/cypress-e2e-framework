const ExcelJs = require('exceljs');
const path = require('path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    console.log(`Searching for "${searchText}" in Excel file and replacing nearby value with "${replaceText}"`);

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

        return workbook.xlsx.writeFile(filePath)
            .then(() => {
                console.log(`Excel file updated successfully at: ${filePath}`);
                return true;
            })
            .catch((error) => {
                console.error(`Failed to write Excel file: ${error.message}`);
                return false;
            });
    } catch (error) {
        console.error(`Error processing Excel file: ${error.message}`);
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

// Search parameters
async function main() {
    const filePath = path.join(process.cwd(), 'excelTest.xlsx');
    console.log(`Using Excel file at: ${filePath}`);

    // Example searches
    const searches = [
        { searchText: 'Mango', replaceText: 400, change: { colChange: 1 } },
        { searchText: 'Apple', replaceText: 220, change: { colChange: 1 } },
        { searchText: 'Banana', replaceText: 45, change: { colChange: 1 } }
    ];

    // Execute all searches sequentially
    for (const search of searches) {
        console.log(`\n--- Processing search for ${search.searchText} ---`);
        const result = await writeExcelTest(
            search.searchText,
            search.replaceText,
            search.change,
            filePath
        );
        console.log(`Result: ${result ? 'Success' : 'Failed'}`);
    }

    console.log('\nAll search operations completed.');
}

// Run the main function
main().catch(error => {
    console.error(`Unhandled error in main: ${error.message}`);
}); 