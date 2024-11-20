const { test, expect } = require("@playwright/test")


test("Popup validations", async ({ page }) => {

    // Bu dersin amacı goBack and goForward
    // Handling javascript alerts
    // Hover an element
    // playing with iframes inside the page

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //await page.goto("http://wwww.google.com");
    //await page.goBack();
    //await page.goForward();

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