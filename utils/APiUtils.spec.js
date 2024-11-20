class APiUtils {

    // constructor method ne zaman bir object oluşturursak o zaman çağrılır. 

    constructor(apiContext, loginPayload) {
        //apiContext, loginPayload constructor'a parametre olarak vererek obje oluşturduğumuzda bu iki parametreyi direkt olarak almış oluyoruz. 
        //this.apiContext ile bu sayfada da kullanabiliyoruz. 
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });

        console.log("loginResponse : " + loginResponse);

        const loginResponseJSON = await loginResponse.json();
        console.log(await loginResponse.json())

        const token = loginResponseJSON.token;
        console.log("token: " + token);

        return token;
    }

    async createOrder(orderPayLoad) {
        const response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
            });

        console.log(await orderResponse.json())

        const orderResponseJSON = await orderResponse.json();
        const orderID = orderResponseJSON.orders[0];
        console.log("orderID : " + orderID);
        response.orderID = orderID;
        return response;
    }
}

module.exports = { APiUtils };