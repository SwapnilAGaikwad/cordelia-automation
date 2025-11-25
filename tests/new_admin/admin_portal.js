require('dotenv').config();
const fs = require('fs');
const { Builder, By, until } = require('selenium-webdriver');
const { getLatestQuotationEmail } = require('./quotation_approval.js');
const nodemailer = require('nodemailer');

let stepsLog = []; // Array to store steps

async function takeScreenshot(driver, label) {
  const img = await driver.takeScreenshot();
  fs.writeFileSync(`error-${label}-${Date.now()}.png`, img, 'base64');
}

async function clickWhenReady(driver, xpath, label) {
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const elem = await driver.wait(until.elementLocated(By.xpath(xpath)), 20000);
      await driver.wait(until.elementIsVisible(elem), 10000);
      await driver.wait(async () => (await elem.isEnabled()), 10000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", elem);
      try {
        await elem.click();
      } catch {
        await driver.executeScript("arguments[0].click();", elem);
      }
      console.log(`Clicked ${label}`);
      stepsLog.push(`✅ ${label}`); // Log successful step
      return;
    } catch (e) {
      if (e.name === "StaleElementReferenceError" && attempt < MAX_RETRIES) {
        console.warn(`StaleElementReferenceError on attempt ${attempt} for ${label}, retrying...`);
        stepsLog.push(`⚠️ Retrying ${label} due to StaleElementReferenceError (attempt ${attempt})`);
      } else {
        stepsLog.push(`❌ Failed: ${label} - ${e.message}`);
        throw e;
      }
    }
  }
}

// Function to send result email
async function sendResultEmail(subject, stepsLog) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `<h3>Automation Test Result</h3>
                <ul>${stepsLog.map(step => `<li>${step}</li>`).join('')}</ul>`;

  let info = await transporter.sendMail({
    from: `"Cordelia Automation" <${process.env.EMAIL_USER}>`,
    to: 'swapnil.gaikwad@cordeliacruises.com, siddhesh.pawar@cordeliacruises.com',
    subject,
    text: stepsLog.join('\n'),
    html,
  });

  console.log('📧 Result email sent:', info.messageId);
}

async function loginTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  let approveUrl = '';

  try {
    await driver.get('https://adminpro.stage.cordeliacruises.com/login');
    await driver.manage().window().maximize();

    await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys('swapnil.stage@gmail.com');
    stepsLog.push('Entered email');

    await clickWhenReady(driver, '//*[@id="generate-otp"]/button', 'Generate OTP');

    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[2]/div[1]/section/form/div')), 20000);

    for (let i = 1; i <= 6; i++) {
      const otpInput = await driver.findElement(By.xpath(`//*[@id="root"]/div/div[2]/div[1]/section/form/div/input[${i}]`));
      await otpInput.sendKeys(i.toString());
    }
    stepsLog.push('Entered OTP');

    await clickWhenReady(driver, '//*[@id="root"]/div/div[2]/div[1]/section/form/button[1]', 'Verify OTP');

    await clickWhenReady(driver, '//*[@id="root"]/div/div/button', 'Create Quotation');
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/span', 'Skip Agent');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section/div[1]/div/div[1]', 'Select Booking Type Dropdown');
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section/div[1]/div/div[2]/ul/li[5]', 'Select Booking Type');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section/div[2]/div/div/input', 'Select Group Name Dropdown');
    await driver.sleep(1000);
    await clickWhenReady(driver, '//*[@id="dropdown-scroll-container"]/div/div/ul', 'Select Group Name');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="cabin-slider-wrapper"]/button[4]', 'Select Month Filter');
    await driver.sleep(1000);
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[1]/div[2]/div/button[5]', 'Select Nights Filter');
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[2]/div[4]/div', 'Select Ship Dropdown');
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[2]/div[4]/div/div[2]/ul/li[3]', 'Select Ship Empress');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[3]/button', 'Check Availability');
    await driver.sleep(1000);
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[2]/div[2]/div/div[1]/div[1]/label', 'Select Itinerary');
    await driver.sleep(1000);
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[3]/button', 'Build Quuotation Page');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[1]/div/div/div[1]', 'Select Cabin Category');
    await driver.sleep(1000);
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[1]/div/div/div[2]/ul/li[1]', 'Interior Cabin');
    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[2]/div[2]/div[1]/input')).sendKeys('1');
    stepsLog.push('Entered number of cabins');

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[2]/div[2]/button', 'Get Price');
    await driver.wait(until.elementLocated(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[2]/div/div[2]')), 20000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/button', 'Send Quotation');
    await driver.wait(until.elementLocated(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[1]/section/section[2]/div[2]')), 20000);
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[2]/div/button', 'Send Quotation on Quotation Preview Page');

    await driver.findElement(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[1]/section/div/input')).sendKeys('Quality Test');
    await driver.findElement(By.xpath('//*[@id="recipients-email-input"]')).sendKeys('swapnil.a.g476@gmail.com');
    await clickWhenReady(driver, '//*[@id="recipients-email-form"]/button', 'Add Email');
    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[1]/section/button', 'Send Quotation on Email Confirmation Page');

    approveUrl = await getLatestQuotationEmail();
    if (approveUrl) {
      stepsLog.push(`Quotation Approve URL: ${approveUrl}`);
      await driver.get(approveUrl);
    }

    stepsLog.push('✅ All steps completed successfully.');

    await sendResultEmail('Test Result of New Admin Portal', stepsLog);

  } catch (e) {
    stepsLog.push(`❌ Error occurred: ${e.message}`);
    await takeScreenshot(driver, 'error');
    console.error('Error occurred, screenshot taken:', e);
    await sendResultEmail('Test Result of New Admin Portal - Failed', stepsLog);
  } finally {
    await driver.quit();
  }
}

loginTest();
