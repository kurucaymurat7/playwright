class OrderCompletedPage {

    constructor(page) {
        this.page = page;
        this.confirmOrder = page.locator(".hero-primary");
    }
}

module.exports = { OrderCompletedPage };