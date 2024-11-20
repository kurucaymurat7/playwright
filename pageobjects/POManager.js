const { CheckoutPage } = require("./CheckoutPage");
const { DashBoardPage } = require("./DashBoardPage");
const { LoginPage } = require("./LoginPage");
const { CartPage } = require("./CartPage");
const { OrderCompletedPage } = require("./OrderCompleledPage");

// POManager.js class'ı diğer page.js dosyalarının hepsine erişim sağlayabilmek için kullanılır, 
// test sayfasında POManager class'ından object oluşturularak diğer page'lere kolaylıkla erişilebilir. 


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderCompletedPage = new OrderCompletedPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashBoardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderCompletedPage() {
        return this.orderCompletedPage;
    }
}

module.exports = { POManager };
