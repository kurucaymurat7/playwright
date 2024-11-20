const {test, expect} = require('@playwright/test');

test('Playwright Special Locators', async ({page})=>
{
    
    // Using GetByLabel and running tests with --ui to see them visually

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();

    await page.getByLabel("Gender").selectOption("Male");

    // Using GetByPlaceHolder
    await page.getByPlaceholder("Password").fill("Password1");

    // GetByLabel method does not enter information all the time, there needs to be association between the labeled locator and the edit box. 
    // They either need to be within the same tag or they need to be associated with id
    // label for = "exampleInputPassword1" and input [#id='exampleInputPassword1'] --> here, there is an association between label and the input, so it should work
    await page.getByPlaceholder("Password").fill("");
    await page.pause();
    await page.getByPlaceholder("Password").fill("Password2");

    // Using GetByRole
    await page.getByRole("button", {name : "Submit"}).click();

    // Using GetByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByText("Success! The Form has been submitted successfully!.").hover();
    

    // use getByRole and gather all elements which are links, and filter the one name is 'Shop' and click on it
    await page.getByRole("link", {name: "Shop"}).click();


    // find the elements with tagname: app-card -- there are 4
    // filter out of them the one has text: Nokia Edge
    // go to the button (there is only one Button available)
    // click on it
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


    





});
