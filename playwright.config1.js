// @ts-check
const { devices, expect } = require('@playwright/test');
const { time } = require('console');
const { permission } = require('process');

const config = {
  testDir: './tests',

  /* Maximum number of retries*/
  retries: 1, // tests will be retried number of times identified here
  workers: 3, // number of workers to run tests -- this is needed for parallel test runs

  timeout: 30 * 1000, // Debug ederken de bu süre üzerinden düşündüğü için idle olursa test patlıyor. Bu kısmı hiç beğenmedim. 

  expect: {
    timeout: 50000
  },

  reporter: 'html',

  // npx playwright test tests/PageObjectPattern5.spec.js --config playwright.config1.js --project=safari   --> safari execution çalışır
  // npx playwright test tests/PageObjectPattern5.spec.js --config playwright.config1.js --project=chrome   --> chrome execution çalışır

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on', // off and only-on-failure
        trace: 'on', // will see failures only when tests fail off,on
        ...devices['iPhone 15 Pro Max landscape'], // you can run tests on any device you want
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'off', // off and only-on-failure
        trace: 'on', // will see failures only when tests fail off,on
        // viewport: { width: 720, height: 720 }, // browser'ın istenen ölçüde açılmasını sağlar. 
        //ignoreHttpsErrors: true, // bazı web sayfaları https ceritificate hatası verebilir, bu hatayı playwrigt otomatik olarak atlayabilir. 
        //permissions: ['geolocation'], // bazı website'lar ilk açıldığında location erişim izni isterler, bu config ile otomatik olarak permission verilmiş olur. 
        video: 'retain-on-failure',  // videos are saved for failed tests
      },
    },
  ]
};

module.exports = config;
