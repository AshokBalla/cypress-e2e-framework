const ExcelJS = require('exceljs');
const path = require('path');

async function createSampleExcelFile() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add headers
    worksheet.addRow(['Item', 'Price per kg', 'Quantity']);

    // Add data
    worksheet.addRow(['Apple', 200, 5]);
    worksheet.addRow(['Banana', 50, 10]);
    worksheet.addRow(['Mango', 300, 3]);
    worksheet.addRow(['Orange', 150, 7]);
    worksheet.addRow(['Pineapple', 80, 2]);

    // Format headers
    worksheet.getRow(1).font = { bold: true };

    // Auto-fit columns
    worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
            const length = cell.value ? cell.value.toString().length : 10;
            if (length > maxLength) {
                maxLength = length;
            }
        });
        column.width = maxLength + 2;
    });

    // Save the file
    const filePath = path.join(__dirname, 'excelTest.xlsx');
    await workbook.xlsx.writeFile(filePath);
    console.log(`Sample Excel file created at: ${filePath}`);
    return filePath;
}

createSampleExcelFile()
    .then(filePath => console.log('File created successfully'))
    .catch(err => console.error('Error creating file:', err)); 