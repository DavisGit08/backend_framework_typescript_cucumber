import { LaunchOptions, chromium, Browser, BrowserContext, APIRequestContext, request } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { createLogger } from "winston";
import { loggerOptions } from "../utils/logger/logger";
import { fixture } from "../utils/fixture";

const headlessMode: boolean = process.env.HEADLESS === 'true' || false;
const trace: string = process.env.TRACE ?? 'false';
const har: string = process.env.HAR ?? 'false';

let browser: Browser;
let context: BrowserContext;
let apiContext: APIRequestContext;

// Launch options.
const options: LaunchOptions = {
  headless: headlessMode,
  slowMo: 100
};

setDefaultTimeout(60 * 10000);


// To launch the browser before all the scenarios
BeforeAll(async function () {
browser = await chromium.launch(options);
});

// Before every scenario, Create new context and page
Before(async function ({ pickle }) {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL_API ?? 'https://practice.expandtesting.com/notes/api'
  });
  const scenarioName: string = pickle.name + pickle.id;
  if (har !== 'undefined' && har === 'true') {
    context = await browser.newContext({
      recordHar: { path: './reports/har/' + scenarioName + '.har' }
    });
  } else {
    context = await browser.newContext();
  }
  if (trace !== 'undefined' && trace === 'true') {
    await context.tracing.start({
      name: scenarioName,
      title: pickle.name,
      sources: true,
      screenshots: true,
      snapshots: true
    });
  }
  this.page = await context.newPage();
  fixture.page = this.page;
  fixture.api = apiContext;
  fixture.logger = createLogger(loggerOptions(scenarioName));
});

// After every scenario, Close context and page
After(async function ({ pickle, result }) {
  const path: string = './reports/trace/' + pickle.id + '.zip';
  if (result?.status !== 'PASSED') {
    const image: Buffer = await this.page.screenshot({
      path: './reports/screenshots/' + pickle.name + '.png',
      type: 'png'
    });
    // Assuming this.attach is a valid method in your context
    this.attach(image, 'image/png');
  }
  if (trace !== 'undefined' && trace === 'true') {
    console.log('the trace is', trace);
    await context.tracing.stop({ path: path });
    const traceFileLink: string = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    // Assuming this.attach is a valid method in your context
    this.attach(`Trace file: ${traceFileLink}`, 'text/html');
  }
  await this.page.close();
  await context.close();
});

// To close the browser after all the scenarios
AfterAll(async function () {
  await browser.close();
  fixture.logger.close();
});