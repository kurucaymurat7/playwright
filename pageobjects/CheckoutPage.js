class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.inputTexts = page.locator("[type='text']");
        this.dropDowns = page.locator("[class='input ddl']");
        this.country = page.locator("[placeholder*='Country']");
        this.buttonApplyCoupon = page.locator("[class='btn btn-primary mt-1']");
        this.countryTurkey = page.locator("span.ng-star-inserted");
        this.textCouponApplied = page.locator("[class='mt-1 ng-star-inserted']");
        this.userEmailAddress = page.locator(".user__name [type='text']");
        this.buttonPlaceOrder = page.locator(".action__submit");;
    }

    async enterBillingInformation(cardInformation) {
        await this.inputTexts.first().fill("");
        await this.inputTexts.first().fill(cardInformation.cardnumber);
        await this.dropDowns.first().selectOption({ label: cardInformation.expiryMonth });
        await this.dropDowns.last().selectOption({ label: cardInformation.expiryYear });
        await this.inputTexts.nth(1).fill(cardInformation.cvv);
        await this.inputTexts.nth(2).fill(cardInformation.name);
    }

    async enterCountry(country) {
        await this.country.pressSequentially(country); // instead of fill, pressSequentially types words one by one
        await this.countryTurkey.click();
    }

    async applyCoupon() {
        await this.inputTexts.nth(3).fill("rahulshettyacademy");
        await this.buttonApplyCoupon.click();
        await this.textCouponApplied.waitFor();
    }

    async clickPlaceOrder() {
        await this.buttonPlaceOrder.click();
    }
}

module.exports = { CheckoutPage };