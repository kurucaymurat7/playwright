const { test, expect, request } = require('@playwright/test');


const loginPayload = { userEmail: "kurucaymurat777@gmail.com", userPassword: "Merve1990*" };
const getAllProductsPayLoad = { productName: "", minPrice: null, maxPrice: null, productCategory: [], productSubCategory: [] }

let token;

// Login API and Get All Products API

test("API Get All Products", async () => {

    // Login API

    const apiContext = await request.newContext(); // create a new context for api testing
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        });

    console.log("loginResponse : " + loginResponse);
    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJSON = await loginResponse.json();
    console.log(await loginResponse.json())

    token = loginResponseJSON.token;
    console.log("token: " + token);

    // Get All Products

    const getAllProductsResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products",
        {
            data: getAllProductsPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });

    console.log(await getAllProductsResponse.json())

    expect(getAllProductsResponse.status()).toBe(200);
    expect(getAllProductsResponse.ok()).toBeTruthy();

    const getAllProductsResponseJSON = await getAllProductsResponse.json();
    const productName = getAllProductsResponseJSON.data[0].productName;
    console.log("productName" + productName);

    const count = getAllProductsResponseJSON.count;
    console.log("count : " + count);

    for (let index = 0; index < count; index++) {
        const element = getAllProductsResponseJSON.data[index].productName;
        console.log("element : " + element);
    }
});

