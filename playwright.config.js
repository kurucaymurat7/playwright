// @ts-check
const { devices, expect } = require('@playwright/test');
const { time } = require('console');
const { retries } = require('./playwright.config1');
const { truncate } = require('fs');

const config = {
  testDir: './tests',
  retries: 1, // number of retries

  timeout: 30 * 1000, // Debug ederken de bu süre üzerinden düşündüğü için idle olursa test patlıyor. Bu kısmı hiç beğenmedim. 

  expect: {
    timeout: 50000
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on', // off and only-on-failure
    trace: 'on', // will see failures only when tests fail off,on
  },
};

module.exports = config;
