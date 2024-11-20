class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("[value='Login']");
    }

    async gototheURL(url) {
        await this.page.goto(url);
    }

    async validLogin(email, password) {
        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };