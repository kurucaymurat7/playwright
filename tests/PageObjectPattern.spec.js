const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashBoardPage } = require('../pageobjects/DashBoardPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');

let loginCredentials = { userName: "kurucaymurat777@gmail.com", password: "Merve1990*" };
let productName = "ZARA COAT 3";

test.only('Page Object Pattern', async ({ page }) => {
  const textBoxEmail = page.getByPlaceholder("email@example.com");
  const textBoxPassword = page.getByPlaceholder("enter your passsword");
  const buttonLogin = page.getByRole('button', { name: "Login" });
  const titles = page.locator(".card-body b");
  const products = page.locator(".card-body");
  const buttons = page.locator(".card-body button");
  const buttonCart = page.locator("[routerlink = '/dashboard/cart']");
  const productNameInCart = page.locator(".cartSection h3");
  const buttonCheckout = page.locator(".totalRow button");
  const buttonCheckoutText = page.locator("text=Checkout");
  const inputTexts = page.locator("[type='text']");
  const dropDowns = page.locator("[class='input ddl']");
  const country = page.locator("[placeholder*='Country']");
  const countryTurkey = page.locator("span.ng-star-inserted");
  const buttonApplyCoupon = page.locator("[class='btn btn-primary mt-1']");
  const textCouponApplied = page.locator("[class='mt-1 ng-star-inserted']");
  const buttonPlaceOrder = page.locator(".action__submit");
  const dropdownCountry = page.locator("[class='ta-results list-group ng-star-inserted']");
  const buttonOrder = page.locator("li [routerlink = '/dashboard/myorders']");
  const ordersList = page.locator("tbody th");
  const buttonViewList = page.locator("//button[.='View']");
  const orderIDLocator = page.locator(".col-text");

  const loginPage = new LoginPage(page);
  await loginPage.gototheURL("https://rahulshettyacademy.com/client");
  await loginPage.validLogin(loginCredentials.userName, loginCredentials.password);

  const dashboardPage = new DashBoardPage(page);
  await dashboardPage.searchProductAddProduct(productName);
  await dashboardPage.navigateToCart();

  const checkoutPage = new CheckoutPage(page);
  checkoutPage.waitForDivstobeVisible();

  await expect(page.getByText(productName)).toBeVisible();

  await buttonCheckout.click();

  await inputTexts.first().fill("");
  await inputTexts.first().fill("1234 1234 1234 1234");
  await dropDowns.first().selectOption({ label: "05" });
  await dropDowns.last().selectOption({ label: "05" });
  await inputTexts.nth(1).fill("123");
  await inputTexts.nth(2).fill("Murat Kuruçay");

  await country.pressSequentially("Turkey"); // instead of fill, pressSequentially types words one by one

  await countryTurkey.click();

  await inputTexts.nth(3).fill("rahulshettyacademy");
  await buttonApplyCoupon.click();

  await textCouponApplied.waitFor();
  await expect(textCouponApplied).toBeVisible();

  expect(await page.locator(".user__name [type='text']").first()).toHaveText(loginCredentials.userName);

  await buttonPlaceOrder.click();

  expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
});

