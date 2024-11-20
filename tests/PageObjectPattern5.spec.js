const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
// Burada, utils altında test-base.js dosyası oluşturup o dosya içerisine testData'yı gömüyoruz,
// Sornasında, page gibi testDataForOrder feature olarak verip test içerisinde data olarak kullanabiliyoruz.


customtest.only('Page Object Pattern 5', async ({ page, testDataForOrder }) => {

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