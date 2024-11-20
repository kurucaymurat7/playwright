const {test, expect} = require('@playwright/test');
const exp = require('constants');
const { title } = require('process');

test('First playwright test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");

    const buttonRegister = page.locator(".text-reset");
    const textBoxFirstName = page.locator("#firstName");
    const textBoxLastName = page.locator("#lastName");
    const textBoxEmail = page.locator("#userEmail");
    const textBoxPhoneNumber = page.locator("#userMobile");
    const dropDownOccupation = page.locator("[formcontrolname='occupation']");
    const genderMale = page.locator("[value='Male']");
    const textBoxPassword = page.locator("#userPassword");
    const textBoxConfirmPassword = page.locator("#confirmPassword");
    const checkBoxRequired = page.locator("[formcontrolname='required']");
    const buttonLogin = page.locator("#login");
    const textAccountCreated = page.locator("[class='headcolor']");

    await buttonRegister.click();
    await textBoxFirstName.fill("Murat11");
    await textBoxLastName.fill("Kurucay11");
    await textBoxEmail.fill("kurucaymurat777@gmail.com");
    await textBoxPhoneNumber.fill("5308971258");
    await dropDownOccupation.selectOption ({index: 1});
    await genderMale.click();
    await textBoxPassword.fill("Merve1990*");
    await textBoxConfirmPassword.fill("Merve1990*");
    await checkBoxRequired.click();
    await buttonLogin.click();
    
    console.log (await textAccountCreated.textContent);
    await expect(textAccountCreated).toContainText("Account Created Successfully");
});

