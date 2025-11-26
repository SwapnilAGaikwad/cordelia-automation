require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Builder, By, until } = require('selenium-webdriver');
const { getLatestQuotationEmail } = require('./quotation_approval.js');
const nodemailer = require('nodemailer');

// ---------- ERROR DIRECTORY SETUP ----------
const ERROR_DIR = 'errors';
if (!fs.existsSync(ERROR_DIR)) fs.mkdirSync(ERROR_DIR);

let stepsLog = []; // Array to store steps
let screenshotPaths = []; // Array to store screenshot file paths

// ---------- SAVE SCREENSHOT FUNCTION ----------
async function takeScreenshot(driver, label) {
  const timestamp = Date.now();
  const filePath = path.join(ERROR_DIR, `error-${label}-${timestamp}.png`);
  const img = await driver.takeScreenshot();
  fs.writeFileSync(filePath, img, 'base64');
  screenshotPaths.push(filePath);
  console.log(`📸 Screenshot saved: ${filePath}`);
}

// ---------- SAVE ERROR LOG FUNCTION ----------
function saveErrorLog(stepsLog) {
  const timestamp = Date.now();
  const logPath = path.join(ERROR_DIR, `error-log-${timestamp}.txt`);
  fs.writeFileSync(logPath, stepsLog.join('\n'), 'utf8');
  console.log(`📝 Error log saved: ${logPath}`);
  return logPath;
}

// ---------- CLICK HANDLER WITH RETRIES ----------
async function clickWhenReady(driver, xpath, label) {
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const elem = await driver.wait(until.elementLocated(By.xpath(xpath)), 20000);
      await driver.wait(until.elementIsVisible(elem), 10000);
      await driver.wait(async () => (await elem.isEnabled()), 10000);
      await driver.executeScript("arguments[0].scrollIntoView(true);", elem);
      try { await elem.click(); } catch { await driver.executeScript("arguments[0].click();", elem); }
      console.log(`Clicked ${label}`);
      stepsLog.push(`✅ ${label}`);
      return;
    } catch (e) {
      if (e.name === "StaleElementReferenceError" && attempt < MAX_RETRIES) {
        console.warn(`Retry ${attempt} for ${label} due to StaleElementReferenceError`);
        stepsLog.push(`⚠️ Retry ${attempt}: ${label} – StaleElementReferenceError`);
      } else {
        stepsLog.push(`❌ Failed: ${label} - ${e.message}`);
        throw e;
      }
    }
  }
}

// ---------- SEND RESULT EMAIL ----------
async function sendResultEmail(subject, stepsLog) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Build inline images HTML
  let screenshotsHTML = screenshotPaths.map((filePath, idx) => {
    const cid = `screenshot${idx}`;
    return `<h4>Screenshot ${idx + 1}</h4><img src="cid:${cid}" style="max-width:800px; display:block; margin-bottom:10px;"/>`;
  }).join('');

  const html = `
    <h3>Automation Test Result</h3>
    <ul>${stepsLog.map(step => `<li>${step}</li>`).join('')}</ul>
    ${screenshotsHTML}
  `;

  let attachments = screenshotPaths.map((filePath, idx) => ({
    filename: path.basename(filePath),
    path: filePath,
    cid: `screenshot${idx}`
  }));

  let info = await transporter.sendMail({
    from: `"Cordelia Automation" <${process.env.EMAIL_USER}>`,
    to: `${process.env.EMAIL}`
    subject,
    text: stepsLog.join('\n'),
    html,
    attachments
  });

  console.log('📧 Result email sent:', info.messageId);
}

// ---------- MAIN TEST FUNCTION ----------
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

    // await clickWhenReady(driver, '//*[@id="root"]/div/div[2]/div[1]/section/form/button[1]', 'Verify OTP');

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

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[3]/button', 'Build Quotation Page');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[1]/div/div/div[1]', 'Select Cabin Category');
    await driver.sleep(1000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[1]/div/div/div[2]/ul/li[1]', 'Interior Cabin');
    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[2]/div[2]/div[1]/input'))
      .sendKeys('1');
    stepsLog.push('Entered number of cabins');

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[1]/div[3]/div/section[2]/div[2]/button', 'Get Price');

    await driver.wait(until.elementLocated(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[1]/section[2]/div/div[2]')), 20000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/button', 'Send Quotation');

    await driver.wait(until.elementLocated(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[1]/section/section[2]/div[2]')), 20000);

    await clickWhenReady(driver, '//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[2]/div/button', 'Send Quotation on Quotation Preview Page');

    await driver.findElement(By.xpath('//*[@id="create-quotation-outlet-wrapper"]/div[2]/div[1]/div[1]/section/div/input'))
      .sendKeys('Quality Test');

    await driver.findElement(By.xpath('//*[@id="recipients-email-input"]'))
      .sendKeys('swapnil.a.g476@gmail.com');

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
    saveErrorLog(stepsLog);
    console.error('Error occurred:', e);
    await sendResultEmail('Test Result of New Admin Portal - Failed', stepsLog);
  } finally {
    await driver.quit();
  }
}

loginTest();
