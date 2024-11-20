const { test, expect } = require("@playwright/test")

// Buradaki amacımız, tek bir test file içerisindeki testlerin hepsini paralel olarak çalıştırabilmektir. 
// En başta test.describe.configure({mode: 'parallel'}) yazarak o sayfadaki testlerin hepsini tek seferde çalıştırabiliriz. 
// npx playwright test tests/ParalelRuns.spec.js --config playwright.config1.js --project=chrome 
// ile çalıştırırsak playwright.config1.js/project=chrome ile çalıştırırsak oradaki config bilgilerini göre çalıştırmış oluruz. 

test.describe.configure({ mode: 'parallel' }); // runs all tests in parallel
//test.describe.configure({ mode: 'skip' }); // runs all tests in serial, which means if first test fails, don't even run the rest of the tests
test("@ParallelRun Popup validations", async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.accept());
    //await page.on('dialog', dialog => dialog.dismiss());

    await page.locator("#mousehover").hover();
    await page.getByText("Top").click();
    const pageURL = await page.url();
    console.log("pageURL : " + pageURL);
    await expect(pageURL.includes("top")).toBeTruthy();

    const iframePAge = page.frameLocator("#courses-iframe");
    await iframePAge.locator("li a[href*='lifetime-access']:visible").click(); // clicks on the visible element out of other hidden elements
    const text = await iframePAge.locator(".text h2").textContent();
    const newText = text.split(" ");
    console.log("newText[1] : " + newText[1]);

    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();
});

test("Screenshot", async ({ page }) => {

    // Bu dersin amacı goBack and goForward
    // Handling javascript alerts
    // Hover an element
    // playing with iframes inside the page

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' });

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();

    await page.screenshot({ path: 'screenshot.png' }); // screenshot of whole page


});

test("Visual Comparison", async ({ page }) => {

    await page.goto("https://www.ensonhaber.com/");

    // bu metodu ilk çalıştırdığımızda, hata verecektir .png dosyası olmadığı için, ancak 2. çalıştırdığımızda sorun olmayacaktır. 
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});