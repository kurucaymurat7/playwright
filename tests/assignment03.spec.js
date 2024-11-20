const {test, expect} = require('@playwright/test');

test('Assignment3 use getBy functions', async ({page})=>
{

    // buradaki amaç getByRole, getByPlaceHolder, getByText ve .filter() methodlarını kullanarak daha hızlı testler yazabilmektir.
    
    const textBoxEmail = page.getByPlaceholder("email@example.com");
    const textBoxPassword = page.getByPlaceholder("enter your passsword");
    const buttonLogin = page.getByRole('button', {name: "Login"});
    const titles = page.locator (".card-body b");
    const products = page.locator (".card-body");
    const buttons = page.locator (".card-body button");
    const buttonCart = page.locator ("[routerlink = '/dashboard/cart']");
    const productNameInCart = page.locator (".cartSection h3");
    const buttonCheckout = page.locator (".totalRow button");
    const buttonCheckoutText = page.locator ("text=Checkout");
    const inputTexts = page.locator ("[type='text']");
    const dropDowns = page.locator ("[class='input ddl']");
    const country = page.locator ("[placeholder*='Country']");
    const countryTurkey = page.locator ("span.ng-star-inserted");
    const buttonApplyCoupon = page.locator ("[class='btn btn-primary mt-1']");
    const textCouponApplied = page.locator ("[class='mt-1 ng-star-inserted']");
    const buttonPlaceOrder = page.locator (".action__submit");
    const dropdownCountry = page.locator ("[class='ta-results list-group ng-star-inserted']");
    const buttonOrder = page.locator ("li [routerlink = '/dashboard/myorders']");
    const ordersList = page.locator ("tbody th");
    const buttonViewList = page.locator ("//button[.='View']");
    const orderIDLocator = page.locator (".col-text");

    await page.goto("https://rahulshettyacademy.com/client");

    await textBoxEmail.fill ("kurucaymurat77@gmail.com");
    await textBoxPassword.fill ("Merve1990*");
    await buttonLogin.click();

    await page.waitForLoadState('networkidle');

    const allTitles = await (titles.allTextContents());
    console.log("allTitles : " + allTitles);

    const count = await products.count();
    console.log("count: " + count)

    
    /*for (let index = 0; index < allTitles.length; index++) {
        const element = allTitles[index];
        console.log ("element: " + element)
        if (element == "ZARA COAT 3") {
            const buttonIndex = (index+1)*2 - 1;
            console.log(buttonIndex)
            await buttons.nth(buttonIndex).click();
            break;
        }
    }*/

    // instead of doing for loop, we can also use .filter function and getbyRole buttons 

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole('button', {name: "Add to Cart"}).click();

    await page.getByRole("listitem").getByRole('button', {name: "Cart"}).click(); // parrent: li, child: button, button's name: Cart

    await page.locator ("div li").first().waitFor(); // isVisible does not have auto-wait, that's why we are telling Playwright to wait for these divs to be loaded

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole('button', {name: "Checkout"}).click();

    await inputTexts.first().fill("");
    await inputTexts.first().fill("1234 1234 1234 1234");
    await dropDowns.first().selectOption({label: "05"});
    await dropDowns.last().selectOption({label: "05"});
    await inputTexts.nth(1).fill ("123");
    await inputTexts.nth(2).fill ("Murat Kuruçay");

    //await country.pressSequentially("Turk"); // instead of fill, pressSequentially types words one by one
    await page.getByPlaceholder("Select Country").pressSequentially("Turk");

    /*await dropdownCountry.waitFor();
    const countCountry = await dropdownCountry.locator ("button").count();
    console.log ("countCountry = " + countCountry);
    for (let i = 0 ; i < countCountry ; i++) {
        if (await dropdownCountry.locator ("button").nth(i).textContent() === " Turkey") {
            dropdownCountry.locator ("button").nth(i).click();
            break;
        }
    }*/

    await page.getByRole('button', {name: "Turkey"}).nth(0).click();

    await inputTexts.nth(3).fill ("rahulshettyacademy");
    //await buttonApplyCoupon.click();
    await page.getByRole('button', {name: "Apply Coupon"}).click();

    await textCouponApplied.waitFor();
    await expect (textCouponApplied).toBeVisible();

    expect (await page.locator (".user__name [type='text']").first()).toHaveText("kurucaymurat77@gmail.com");

    //await buttonPlaceOrder.click();
    await page.getByText("PLACE ORDER").click();

    //expect (await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    await expect (page.getByText(" Thankyou for the order. ").isVisible()).toBeTruthy();
    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();
});

