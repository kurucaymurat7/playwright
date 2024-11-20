const { test, expect } = require('@playwright/test');

// Burada amacımız route.route() ve abort() metodu ile sayfadaki bazı API call'larının browser'a gelmesini engelliyoruz. 
// Bu özellik nerede nasıl işimize yarar bu konuda hiç bir fikrim yok, ama sayfadaki bazı API isteklerini engelleyebiliriz. Line 14 and 15

// Burada, ayrıca page.on() metodu ile test sırasında gelen giden tüm request ve response'ları console'a yazdırabileceğimizi gördük. Line 22 and 23

test.only('Network Test API Part 9', async ({ browser }) => {
    //chrome browser (playwright.config.js file used for more configurations about the tests)
    const context = await browser.newContext();
    const page = await context.newPage();

    // page.route('**/*.css', route => route.abort()); // extension css olan her url'i bloklar. 
    // page.route('**/*.{jpg, png, jpeg}', route => route.abort()); // jpg, png, jpeg dosyalarının tamamını bloklar. 

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signin = page.locator("#signInBtn");
    const titles = page.locator(".card-body a");

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // css most preferred

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("wrong");
    await page.locator("#signInBtn").click();

    // intelligent wait is available in playwright -- timeout : 30 * 1000 (identified in the config.js file)
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //type not supported anymore, fill used instead
    await username.fill("")  // clear
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await signin.click();
});



test('Page playwright test', async ({ page }) => {
    await page.goto("https://google.com");
    //get the title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});