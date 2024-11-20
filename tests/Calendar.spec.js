const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {

    // buradaki amaç; calendar üzerindeki locate'leri kullanmaktır.


    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedDateList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber - 1).click();
    await page.locator(".react-calendar__month-view__days__day").filter({ hasText: date }).click(); // filter yerine xpath de kullanabilirsin.

    const actualYear = await page.locator("input[name='year']").getAttribute("value");
    console.log("actualYear :" + actualYear);

    const actualMonth = await page.locator("input[name='month']").getAttribute("value");
    console.log("actualMonth :" + actualMonth);

    const actualDay = await page.locator("input[name='day']").getAttribute("value");
    console.log("actualDay :" + actualDay);

    await expect(actualYear == year).toBeTruthy();
    await expect(actualMonth == monthNumber).toBeTruthy();
    await expect(actualDay == date).toBeTruthy();


    // second way
    // playwright does not get the hidden elements although it is found in the DOM itself

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) {
        expect(inputs[index].getAttribute("value")).toEqual(expectedDateList[index]);
    }

});