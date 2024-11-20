const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/PageObjectPattern4TestData.json")));

// Burada , JSON file içerisinde datayı bir ARRAY olarak veriyoruz, ver test çalıştığında sırası ile array'in tüm indexlerindeki data ile çalışıyor.
// ` (single quotation tilt button) ile her bir testin description'ı ayrı ayrı tanımlayabiliyoruz, 
//  Bu sayede, her bir data için ayrı ayrı test çalıştırabiliriz. 

for (const data of dataSet) {
  test(`Page Object Pattern 4 for ${data.productname}`, async ({ page }) => {

    console.log("dataSet.cardinformation.cardnumber : " + data.cardinformation.cardnumber);

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.gototheURL(data.pageUrl);
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.searchProductAddProduct(data.productname);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.checkOut(data.productname);

    const checkOutPage = poManager.getCheckoutPage();
    await checkOutPage.enterBillingInformation(data.cardinformation);
    await checkOutPage.enterCountry(data.country);
    await checkOutPage.applyCoupon();
    expect(await checkOutPage.textCouponApplied).toBeVisible();
    expect(await checkOutPage.userEmailAddress.first()).toHaveText(data.username);

    await checkOutPage.clickPlaceOrder();

    const orderCompletedPage = poManager.getOrderCompletedPage();
    await orderCompletedPage.confirmOrder.waitFor();
    expect(orderCompletedPage.confirmOrder).toHaveText(data.thankyou);
  });
}