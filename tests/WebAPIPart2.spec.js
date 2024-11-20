const { test, expect, request } = require('@playwright/test');
const { title } = require('process');

const loginPayload = { userEmail: "kurucaymurat777@gmail.com", userPassword: "Merve1990*" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };

let token;
let orderID;

// Bu sayfada Create Order function'ı da API call ile gerçekleştirilmiş ve sonunda sadece Orders sayfasında doğru olarak listelendiği kontrol edilmiştir. 

test.beforeAll("API", async () => {

    // Login API

    const apiContext = await request.newContext(); // create a new context for api testing
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        });

    console.log("loginResponse : " + loginResponse);
    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJSON = await loginResponse.json();
    console.log(await loginResponse.json())

    token = loginResponseJSON.token;
    console.log("token: " + token);


    // Create order API

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });

    console.log(await orderResponse.json())

    expect(orderResponse.status()).toBe(201);
    expect(orderResponse.ok()).toBeTruthy();

    const orderResponseJSON = await orderResponse.json();
    orderID = orderResponseJSON.orders[0];
    console.log("orderID : " + orderID);
});


test.only('First playwright test', async ({ page }) => {

    // test başlarken localStorage'a token değeri verilir. 
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // sayfa açıldığında login page bypass edilmiş olur. 
    await page.goto("https://rahulshettyacademy.com/client/");


    const buttonMyOrder = page.locator("li [routerlink = '/dashboard/myorders']");
    const ordersList = page.locator("tbody th");
    const buttonViewList = page.locator("//button[.='View']");
    const orderIDLocator = page.locator(".col-text");

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
        if (text === orderID) {
            await buttonViewList.nth(index).click();
            break
        }
    }

    const actualOrderId = await orderIDLocator.textContent();
    console.log("expectedOrderId : " + orderID);
    console.log("actualOrderId : " + actualOrderId);
    expect(actualOrderId == orderID).toBeTruthy();
});

