const { test, expect, request } = require('@playwright/test');

test('API Test GET', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const text = await response.text();
    console.log("text: " + text);
    expect(text).toContain('Janet');

    console.log(await response.json());
});

test('API Test POST', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "Murat",
            "job": "QA"
        }
    })

    expect(response.status()).toBe(201);

    expect(response.ok()).toBeTruthy();

    const text = await response.text();
    console.log("text: " + text);
    expect(text).toContain('Murat');

    console.log(await response.json());

});

test('API Test PUT', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Murat",
            "job": "Software Engineer Tester"
        }
    })

    expect(response.status()).toBe(200);

    expect(response.ok()).toBeTruthy();

    const text = await response.text();
    console.log("text: " + text);
    expect(text).toContain('Software Engineer Tester');

    console.log(await response.json());

});

test('API Test DELETE', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2', {
        data: {
            "name": "Murat",
            "job": "Software Engineer Tester"
        }
    })

    expect(response.status()).toBe(204);

    expect(response.ok()).toBeTruthy();

});

test.only('API Test LOGIN', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/login', {
        data: {
            "email": "eve.holt@reqres.in"
        }
    })

    expect(response.status()).toBe(400);
    expect(response.ok()).toBeTruthy();

    console.log("response: " + await response.text());


});