const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');

// Burada amacımız, farklı config.js dosyasını entegre ederek testimizde o config dosyasındaki ayarlara göre çalıştırmak,
// deafult playwright.config.js ayarlarına göre çalışır, ancak aşağıdaki gibi configure edilerek de çalışabilir. 

// npx playwright test tests/PageObjectPattern5.spec.js --config playwright.config1.js --project=safari   --> safari execution çalışır
// npx playwright test tests/PageObjectPattern5.spec.js --config playwright.config1.js --project=chrome   --> chrome execution çalışır


customtest.only('Page Object Pattern 6', async ({ page, testDataForOrder }) => {

  console.log("testDataForOrder.cardinformation.cardnumber : " + testDataForOrder.cardinformation.cardnumber);

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.gototheURL(testDataForOrder.pageUrl);
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  const dashboardPage = poManager.getDashBoardPage();
  await dashboardPage.searchProductAddProduct(testDataForOrder.productname);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.checkOut(testDataForOrder.productname);

  const checkOutPage = poManager.getCheckoutPage();
  await checkOutPage.enterBillingInformation(testDataForOrder.cardinformation);
  await checkOutPage.enterCountry(testDataForOrder.country);
  await checkOutPage.applyCoupon();
  expect(await checkOutPage.textCouponApplied).toBeVisible();
  expect(await checkOutPage.userEmailAddress.first()).toHaveText(testDataForOrder.username);

  await checkOutPage.clickPlaceOrder();

  const orderCompletedPage = poManager.getOrderCompletedPage();
  await orderCompletedPage.confirmOrder.waitFor();
  expect(orderCompletedPage.confirmOrder).toHaveText(testDataForOrder.thankyou);
});