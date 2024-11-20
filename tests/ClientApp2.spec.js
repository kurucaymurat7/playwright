const { test, expect } = require('@playwright/test');

test('Client App login', async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "anshika@gmail.com";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your password").fill("Iamking@000");
  await page.getByRole('button', { name: "Login" }).click();
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


test('test2', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Ara', { exact: true }).click();
  await page.getByLabel('Ara', { exact: true }).fill('murat kuruçay');
  await page.getByLabel('Ara', { exact: true }).click();
  await page.getByText('murat kuruçay', { exact: true }).click();
  await page.getByRole('button', { name: '10+ "Murat Kurucay" profiles' }).first().click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Git', exact: true }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Murat Kuruçay, Ph. D. Murat' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.locator('#gsi_872784_145444').contentFrame().getByLabel('Continue with Google').click();
  const page2 = await page2Promise;
  await page1.getByRole('button', { name: 'Kapat' }).click();
});