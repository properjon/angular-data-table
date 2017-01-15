const config = {
  framework: 'jasmine',
  specs: ['./protractor/*.e2e.js'],
  baseUrl: 'http://localhost:9000/',
};

if (process.env.TRAVIS) {
  config.seleniumAddress = 'http://localhost:4445/wd/hub';

  // Configure more at: https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
  config.multiCapabilities = [
    {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      name: 'angular-data-table e2e tests: chrome',
      browserName: 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_BUILD_NUMBER,
    },
    {
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      name: 'angular-data-table e2e tests: ie11',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '11.0',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_BUILD_NUMBER,
    },
  ];
}

exports.config = config;
