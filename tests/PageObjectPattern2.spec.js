const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
// POManager class üzerinden object oluşturarak, sayfalara tek bir class üzerinden erişim sağlayabiliriz. 

let pageUrl = "https://rahulshettyacademy.com/client";
let loginCredentials = { userName: "kurucaymurat777@gmail.com", password: "Merve1990*" };
let productName = "ZARA COAT 3";
let cardInformation = { cardnumber: "1234 1234 1234 1234", expiryMonth: "05", expiryYear: "05", cvv: "123", name: "Murat Kuruçay" };
let country = "Turkey";
let thankyou = " Thankyou for the order. ";

test.only('Page Object Pattern 2', async ({ page }) => {

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.gototheURL(pageUrl);
  await loginPage.validLogin(loginCredentials.userName, loginCredentials.password);

  const dashboardPage = poManager.getDashBoardPage();
  await dashboardPage.searchProductAddProduct(productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.checkOut(productName);

  const checkOutPage = poManager.getCheckoutPage();
  await checkOutPage.enterBillingInformation(cardInformation);
  await checkOutPage.enterCountry(country);
  await checkOutPage.applyCoupon();
  expect(await checkOutPage.textCouponApplied).toBeVisible();
  expect(await checkOutPage.userEmailAddress.first()).toHaveText(loginCredentials.userName);

  await checkOutPage.clickPlaceOrder();

  const orderCompletedPage = poManager.getOrderCompletedPage();
  await orderCompletedPage.confirmOrder.waitFor();
  expect(orderCompletedPage.confirmOrder).toHaveText(thankyou);
});

