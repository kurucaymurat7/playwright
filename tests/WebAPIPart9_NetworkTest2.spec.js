const { test, expect } = require('@playwright/test');

// Buradaki amacımız; Request interception, page.route() metodu ile normalde gitmesi gereken bir URL'e 
// farklı bir URL yönlendirerek Unauthorized mesajı alıyoruz. Bu sayede, unauthorized message alıyoruz. 

// burada sadece gideceği URL'i değiştiriyoruz, bunun gibi diğer parametreleri de rahatlıkla değiştirebiliriz. 

test('Security Testing', async ({ page }) => {

    // login and click the first View button
    const email = "anshika@gmail.com";
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await products.first().waitFor();
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    // id = * watch for any id 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    );

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toContainText("You are not authorize");
});