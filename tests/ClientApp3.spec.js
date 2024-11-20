const { test, expect } = require('@playwright/test');

test('Client App login', async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "anshika@gmail.com";
  const productName = 'zara coat 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await products.first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

});


test('UI controls', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // css most preferred

  const userName = page.locator("#username");
  const signin = page.locator("#signInBtn");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  //await page.pause(); // pauses the code and let you resume your execution then

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  console.log(await (page.locator(".radiotextsty").last()));
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  expect(await page.locator("#terms").isChecked()).toBeTruthy();

  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  // where the action is present, await should be there 

  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});