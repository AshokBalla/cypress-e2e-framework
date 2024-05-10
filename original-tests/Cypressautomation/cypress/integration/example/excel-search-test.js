/// <reference types="cypress" />

describe('Excel Search and Update Tests', () => {
    const filePath = 'excelTest.xlsx'; // Path relative to project root

    before(() => {
        // You could add code here to ensure the Excel file exists
        // For example, make an API call or use a custom command
        cy.log('Setting up Excel tests');
    });

    it('should update Mango price to 500', () => {
        // Use the task to update the Excel file
        cy.task('writeExcelTest', {
            searchText: 'Mango',
            replaceText: 500,
            change: { colChange: 1 },
            filePath: filePath
        }).then((result) => {
            expect(result).to.be.true;
        });

        // After the update, you could potentially read the file back
        // or perform other validations
        cy.log('Successfully updated Mango price to 500');
    });

    it('should update Apple price to 250', () => {
        cy.task('writeExcelTest', {
            searchText: 'Apple',
            replaceText: 250,
            change: { colChange: 1 },
            filePath: filePath
        }).then((result) => {
            expect(result).to.be.true;
        });

        cy.log('Successfully updated Apple price to 250');
    });

    it('should update Orange price to 175', () => {
        cy.task('writeExcelTest', {
            searchText: 'Orange',
            replaceText: 175,
            change: { colChange: 1 },
            filePath: filePath
        }).then((result) => {
            expect(result).to.be.true;
        });

        cy.log('Successfully updated Orange price to 175');
    });

    after(() => {
        cy.log('Excel tests completed');
    });
}); 