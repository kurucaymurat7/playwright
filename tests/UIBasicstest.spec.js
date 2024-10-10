const {test, expect} = require('@playwright/test');
const { title } = require('process');

test('First playwright test', async ({browser})=>
{
     //chrome browser (playwright.config.js file used for more configurations about the tests)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test('Page playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    //get the title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});