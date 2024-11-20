const { test, expect } = require("@playwright/test")

// Buradaki amacımız, aldığımız 2 visual'ın birbiri ile karşılaştırmasıdır, called as Visual Testing... 


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

test.only("Visual Comparison", async ({ page }) => {

    await page.goto("https://www.ensonhaber.com/");

    // bu metodu ilk çalıştırdığımızda, hata verecektir .png dosyası olmadığı için, ancak 2. çalıştırdığımızda sorun olmayacaktır. 
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});