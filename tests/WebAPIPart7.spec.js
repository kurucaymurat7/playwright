const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils.spec');

const loginPayload = { userEmail: "kurucaymurat777@gmail.com", userPassword: "Merve1990*" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };

let response;

// Burada Debug modda çalıştırmayı öğreniyoruz, öncelikle package.json dosyasına aşağıdaki eklemeyi yap, 
// sonra da debug süresini artırmak için playwright.json dosyasında  timeout: 100 * 1000, olarak değiştir. 

/*
"scripts": {
    "test": "npx playwright test tests/WebAPIPart7.spec.js --headed"
  },
*/

test.beforeAll("API", async () => {

    // öncelikle api request atabilmek için apicontext oluşturuyoruz. 
    const apiContext = await request.newContext(); // create a new context for api testing

    // ApiUtils sayfasından bir object oluşturuyoruz, oluşturduğumuz apicontext ve loginPayLoad parametrelerini constructor'a parametre olarak gönderiyoruz.
    // Bu sayfada bu sayfa üzerinden bir object oluşturduğumuzda direkt olarak apiContext ve loginPayLoad'u pass etmiş oluyoruz. 
    const apiUtils = new APiUtils(apiContext, loginPayload);

    // son olarak da createOrder fonksiyonu ile işlem geçip işlem ile ilgili detayları response objesine atıyoruz. 
    response = await apiUtils.createOrder(orderPayLoad);
});


test('Web API Part7', async ({ page }) => {

    // test başlarken localStorage'a token değeri verilir. 
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    // sayfa açıldığında login page bypass edilmiş olur. 
    await page.goto("https://rahulshettyacademy.com/client/");


    const buttonMyOrder = page.locator("li [routerlink = '/dashboard/myorders']");
    const ordersList = page.locator("tbody th");
    const buttonViewList = page.locator("//button[.='View']");
    const orderIDLocator = page.locator(".col-text");

    await buttonMyOrder.waitFor();
    await buttonMyOrder.click();

    await ordersList.first().waitFor();
    const countOrders = await ordersList.count();
    console.log("countOrders : " + countOrders);

    await buttonViewList.first().waitFor();
    const countView = await buttonViewList.count();
    console.log("countView :" + countView);

    for (let index = 0; index < countOrders; index++) {
        const text = await (ordersList.nth(index).textContent());
        console.log("text : " + text);
        if (text === response.orderID) {
            await buttonViewList.nth(index).click();
            break
        }
    }

    const actualOrderId = await orderIDLocator.textContent();
    console.log("expectedOrderId : " + response.orderID);
    console.log("actualOrderId : " + actualOrderId);
    expect(actualOrderId == response.orderID).toBeTruthy();
});

