const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils.spec');

const loginPayload = { userEmail: "kurucaymurat777@gmail.com", userPassword: "Merve1990*" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

// Buradaki amaç: Network intercepting, yani browser'a fake data göndererek UI'da gelmesini istediğimiz mesajı kontrol etmek. 
// Playwright, browser'a fake response göndererek bi anlamda istediğimiz ekranın oluşmasını sağlamaktadır. 

test.beforeAll("API", async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('Web API Part9 Network Test', async ({ page }) => {

    // test başlarken localStorage'a token değeri verilir. 
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);


    // sayfa açıldığında login page bypass edilmiş olur. 
    await page.goto("https://rahulshettyacademy.com/client/");


    // AŞAĞIDAKİ KOD: 
    // url sonundaki yıldız, dinamik olarak herhangi bir ID gelebileceğini ifade etmektedir.
    // 1. getting the actual response first
    // 2. preparing the fake response body
    // 3. sending the fake response body to the browser

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders); // converts JScript object to JSON object
            route.fulfill(
                {
                    response,
                    body,
                });
        });

    const buttonMyOrder = page.locator("li [routerlink = '/dashboard/myorders']");
    await buttonMyOrder.click();

    // Bu satır; apiContext.fetchData() hatası ile karşılaşmamızı önlemktedir. API actual response ve fullfill çok hızlı gerçekteştiği için, burada hata veriyordu.
    // Bu hatayı aşmak için, waitForResponse("URL") kullanarak response'ın gelmesini bekle diyoruz.  
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
});

