import  { test, expect } from "@playwright/test";
import { Agent } from "http";
const { chromium } = require('playwright');
const https = require('https');

// Define capabilities
//LmbdaTest capabilities
const capabilities = {
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "LambdaTest Exam Santhiya",
        name: "Result Santhiya",
        user: 'santhiyac2001',
        accessKey: 'ltsOVu560W0UqM4cfFqoT098O0QUwe1mGrDWCrxppfE3kNrinT',
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: "", // Optional
        geoLocation: '', 
    },
};

let browser;
let context;

test.beforeAll(async ()=>{
     browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities))}`);
         context = await browser.newContext();
      
    
})

test.afterAll(async()=>{
  await browser.close()
})

test.beforeEach(async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/");
})

test("Test scenario 1", async ({page}) => {

  await page.locator("//a[text()='Simple Form Demo']").click();
  await page.waitForTimeout(3000); 
  var value = "Welcome to Lambda Test";
  await page.getByPlaceholder("Please enter your Message").fill(value);
  await page.locator("button[id='showInput']").click();
  await page.waitForSelector("#message");
 expect(page.locator("#message")).toHaveText(value);
});




test('Test Scenario 2', async ({page}) => {

  await page.getByText('Drag & Drop Sliders').click()
  await page.waitForTimeout(3000);
  
  const slider = await page.locator("//input[@class='sp__range' and @value='15']");
  const srcBound = await slider.boundingBox();
  
  if (srcBound) {
    const startX = srcBound.x + srcBound.width / 2;
    const startY = srcBound.y + srcBound.height / 2;
    const endX = startX + (srcBound.width * 80)/100; 
  
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, startY, { steps: 10 });
    await page.mouse.up();
  }
});




test("Test scenario 3", async ({page}) => {

  await page.getByText('Input Form Submit').click();
  await page.waitForTimeout(3000);

  await page.locator("//button[text()='Submit']").click();
  await page.waitForTimeout(3000);

  const name = await page.textContent('body');
  if (name?.includes("Please fill out this field")) {
    await expect(page.textContent('body')).toContain("Please fill out this field");
  }

  await page.fill("input[name='name']", "Rose");
  await page.fill("#inputEmail4", "abc@gmail.com");
  await page.fill("input[type='password']", "abc123ghi");
  await page.fill("#company", "mycompany");
  await page.fill("#websitename", "www.google.com");
  await page.selectOption("//select[@name='country']", { label: 'United States' });
  await page.fill("#inputCity", "uk");
  await page.fill("#inputAddress1", "first street");
  await page.fill("#inputAddress2", "second house");
  await page.fill("#inputState", "Delhi");
  await page.fill("#inputZip", "629002");

  await page.locator("//button[text()='Submit']").click();
  await page.waitForTimeout(3000);

  await expect(page.locator('//p[@class="success-msg hidden"]')).toContainText("Thanks for contacting us, we will get back to you shortly");
});