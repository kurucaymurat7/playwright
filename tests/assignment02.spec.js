const { test, expect } = require('@playwright/test');

test('First playwright test', async ({ page }) => {
    const textBoxEmail = page.locator("#userEmail");
    const textBoxPassword = page.locator("#userPassword");
    const buttonLogin = page.locator("#login");
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

    await page.goto("https://rahulshettyacademy.com/client");

    await textBoxEmail.fill("kurucaymurat77@gmail.com");
    await textBoxPassword.fill("Merve1990*");
    await buttonLogin.click();

    await page.waitForLoadState('networkidle');

    const allTitles = await (titles.allTextContents());
    console.log("allTitles : " + allTitles);

    const count = await products.count();
    console.log("count: " + count)

    for (let index = 0; index < allTitles.length; index++) {
        const element = allTitles[index];
        console.log("element: " + element)
        if (element == "ZARA COAT 3") {
            const buttonIndex = (index + 1) * 2 - 1;
            console.log(buttonIndex)
            await buttons.nth(buttonIndex).click();
            break;
        }
    }

    await buttonCart.click();
    await page.locator("div li").first().waitFor(); // isVisible does not have auto-wait, that's why we are telling Playwright to wait for these divs to be loaded
    await expect(productNameInCart).toHaveText("ZARA COAT 3");

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();


    //await buttonCheckout.click();
    await buttonCheckoutText.click();

    await inputTexts.first().fill("");
    await inputTexts.first().fill("1234 1234 1234 1234");
    await dropDowns.first().selectOption({ label: "05" });
    await dropDowns.last().selectOption({ label: "05" });
    await inputTexts.nth(1).fill("123");
    await inputTexts.nth(2).fill("Murat Kuruçay");

    await country.pressSequentially("Turk"); // instead of fill, pressSequentially types words one by one
    await dropdownCountry.waitFor();
    const countCountry = await dropdownCountry.locator("button").count();
    console.log("countCountry = " + countCountry);

    for (let i = 0; i < countCountry; i++) {
        if (await dropdownCountry.locator("button").nth(i).textContent() === " Turkey") {
            dropdownCountry.locator("button").nth(i).click();
            break;
        }
    }

    await inputTexts.nth(3).fill("rahulshettyacademy");
    await buttonApplyCoupon.click();

    await textCouponApplied.waitFor();
    await expect(textCouponApplied).toBeVisible();

    expect(await page.locator(".user__name [type='text']").first()).toHaveText("kurucaymurat77@gmail.com");

    await buttonPlaceOrder.click();

    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    let newOrderID = orderId.replace(/[^\w\s]/gi, '').trim();
    console.log("new order id : " + newOrderID)

    await buttonOrder.click();

    await ordersList.first().waitFor();
    const countOrders = await ordersList.count();
    console.log("countOrders : " + countOrders);

    await buttonViewList.first().waitFor();
    const countView = await buttonViewList.count();
    console.log("countView :" + countView);

    for (let index = 0; index < countOrders; index++) {
        const text = await (ordersList.nth(index).textContent());
        console.log("text : " + text);
        if (text === newOrderID) {
            await buttonViewList.nth(index).click();
            break
        }
    }

    const actualOrderId = await orderIDLocator.textContent();
    console.log("expectedOrderId : " + newOrderID);
    console.log("actualOrderId : " + actualOrderId);
    expect(actualOrderId == newOrderID).toBeTruthy();
});

