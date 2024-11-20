const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/PageObjectPattern3TestData.json")));

// Burada , JSON file içerisinde vermiş olduğumuz data'ye erişerek testimizde kullanıyoruz, 
// Bu sayede, test içerisinde data kullanmayıp tüm datayı bir JSON dosyası içinde ayrı bir şekilde saklayabiliyoruz.

test.only('Page Object Pattern 3', async ({ page }) => {

  console.log("dataSet.cardinformation.cardnumber : " + dataSet.cardinformation.cardnumber);

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.gototheURL(dataSet.pageUrl);
  await loginPage.validLogin(dataSet.username, dataSet.password);

  const dashboardPage = poManager.getDashBoardPage();
  await dashboardPage.searchProductAddProduct(dataSet.productname);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.checkOut(dataSet.productname);

  const checkOutPage = poManager.getCheckoutPage();
  await checkOutPage.enterBillingInformation(dataSet.cardinformation);
  await checkOutPage.enterCountry(dataSet.country);
  await checkOutPage.applyCoupon();
  expect(await checkOutPage.textCouponApplied).toBeVisible();
  expect(await checkOutPage.userEmailAddress.first()).toHaveText(dataSet.username);

  await checkOutPage.clickPlaceOrder();

  const orderCompletedPage = poManager.getOrderCompletedPage();
  await orderCompletedPage.confirmOrder.waitFor();
  expect(orderCompletedPage.confirmOrder).toHaveText(dataSet.thankyou);
});

