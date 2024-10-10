// @ts-check
const { devices, expect } = require('@playwright/test');
const { time } = require('console');

const config = {
  testDir : './tests', 

  timeout : 30 * 1000, 

  expect : {
    timeout : 5000
  }, 

  reporter: 'html',

  use: {
      browserName : 'webkit',
      headless : false
  },

};

module.exports = config;
