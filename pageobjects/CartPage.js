class CartPage {

    constructor(page) {
        this.page = page;
        this.divs = this.page.locator("div li");
        this.buttonCheckout = page.locator(".totalRow button");
    }

    async waitForDivstobeVisible() {
        await this.divs.first().waitFor();
    }

    async checkOut(productName) {
        this.waitForDivstobeVisible();
        this.page.getByText(productName).waitFor();
        await this.buttonCheckout.click();
    }
}

module.exports = { CartPage };
