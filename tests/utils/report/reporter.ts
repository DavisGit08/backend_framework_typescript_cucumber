import reporter, { Options } from 'cucumber-html-reporter';

// These options will be used at the time of HTML Report generation
const options: Options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  screenshotsDirectory: 'reports/screenshots/',
  reportSuiteAsScenarios: true,
  storeScreenshots: true,
  name: 'Automation Tests',
  scenarioTimestamp: false,
  launchReport: true,
  metadata: {
    Browser: 'Chrome',
    'Test Environment': process.env.BASEURL ?? 'https://smartservices.axaxl.com/',
    Executed: 'E2E',
  }
};

reporter.generate(options);