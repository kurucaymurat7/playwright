const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            pageUrl: "https://rahulshettyacademy.com/client",
            username: "anshika@gmail.com",
            password: "Iamking@000",
            productname: "ZARA COAT 3",
            country: "Turkey",
            thankyou: " Thankyou for the order. ",
            cardinformation: {
                cardnumber: "1234 1234 1234 1234",
                expiryMonth: "05",
                expiryYear: "05",
                cvv: "123",
                name: "Murat Kuruçay"
            }
        }
    }
)