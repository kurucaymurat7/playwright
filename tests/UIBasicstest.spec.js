const { test, expect } = require('@playwright/test');
const exp = require('constants');
const { title } = require('process');

test('First playwright test', async ({ browser }) => {
    //chrome browser (playwright.config.js file used for more configurations about the tests)
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signin = page.locator("#signInBtn");
    const titles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // css most preferred

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("wrong");
    await page.locator("#signInBtn").click();

    // intelligent wait is available in playwright -- timeout : 30 * 1000 (identified in the config.js file)
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //type not supported anymore, fill used instead
    await username.fill("")  // clear
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await signin.click();

    //console.log (await titles.first().textContent());
    //console.log (await titles.nth(1).textContent());
    //console.log (await titles.nth(2).textContent());
    //console.log (await titles.nth(3).textContent());

    const allTitles = await titles.allTextContents(); // Playwright does not have auto-wait for allTextContents method - will result 0 size
    console.log(allTitles);

});



test('Page playwright test', async ({ page }) => {
    await page.goto("https://google.com");
    //get the title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});