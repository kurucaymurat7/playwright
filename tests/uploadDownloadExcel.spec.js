const { test, expect } = require('@playwright/test');
const ExcelJS = require('exceljs');
const { text } = require('stream/consumers');
// exceljs derslerinde bu dependecies nasıl indirileceğini göstermişti, şimdi ise sadece package.json dosyası altında dependencies olarak ekledik. 


// read cells and update if condition is met
// use object as a global variable and store the row and column number to the object

let output = { row: -1, column: -1 };

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
};

async function readExcel(worksheet, searchText) {

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value == searchText) {
                output.row = rowNumber;
                output.column = columnNumber;
            }
        });
    });
};

// update mango price to 350

test('@Excel Upload Download Excel validation', async ({ page }) => {

    const textSearch = "Mango";
    const updatedValue = "550"

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const downloadPromise = page.waitForEvent('download'); // waits the page until the download is fully complete
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise; // waits the page until the download is fully complete

    writeExcelTest(textSearch, updatedValue, { rowChange: 0, colChange: 2 }, "C:/Users/HP/.ssh/Dropbox/PC (2)/Downloads/download.xlsx"); // check the path

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/HP/.ssh/Dropbox/PC (2)/Downloads/download.xlsx"); // attribute is file olarak verilmemişse bu metodu kullanamayız. 

    const textLocator = await page.getByText(textSearch);
    // const desiredRow = await page.getByRole('row').filter({ has: textLocator });    has dedikten sonra locator'ı veriyorsun.
    const desiredRow = await page.getByRole('row').filter({ hasText: textSearch }); // hasText dedikten sonra visible text'i veriyorsun. 
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);
});