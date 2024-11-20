// Login UI -- login to app and get all details needing login and store to a .json file

// there are lots of tests to do 

const { test, expect } = require('@playwright/test');

let webContext;

// Burada önce application'a login olup tüm login için gerekli olan tüm StorageData'yı .json file içine yazıyoruz.

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://provisioning.sipay.com.tr/merchant");
    await page.locator("#email").pressSequentially("murat.kurucay@softrobotics.com.tr");
    await page.locator("#form_group_password").pressSequentially("Yumurta10.");
    await page.locator("#login_button").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });
});


test('Web API Part6', async () => {

    const page = await webContext.newPage();
    await page.goto("https://provisioning.sipay.com.tr/merchant");

    await page.waitForLoadState('networkidle');

    await page.locator(".main-menu").nth(1).waitFor();
    await page.locator(".main-menu").nth(1).click();

    await page.locator("li strong").waitFor();
    const merchantID = await page.locator("li strong").textContent();
    console.log("merchantID : " + merchantID);
    await expect(merchantID).toContain("10294");
});

