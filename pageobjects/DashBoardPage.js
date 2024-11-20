class DashBoardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink = '/dashboard/cart']");
    }

    async searchProductAddProduct(productName) {
        const allTitles = await (this.productsText.allTextContents());
        console.log("allTitles : " + allTitles);

        const count = await this.products.count();
        console.log("count: " + count)

        await this.products.filter({ hasText: productName }).getByRole('button', { name: "Add to Cart" }).click();
    }

    async navigateToCart() {
        await this.page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
    }
}

module.exports = { DashBoardPage };