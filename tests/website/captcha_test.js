const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function captcha_test() {
  const options = new chrome.Options();
  options.addArguments('--disable-background-networking');
  options.addArguments('--disable-sync');
  options.addArguments('--disable-gcm-notification');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  await driver.manage().window().maximize();

  const mobileNumbers = [
    "9845123789","9911223344","9356781245","9812345670","8796541230","9001122334","8899776655","9898989898","9944556677","9753102468","9123098765","9876012345","9834567890","9867543210","9822011223","9933445566","9012345678","9654321890","9845671230","9870001112","9922334455","9801234567","9977553311","9761112233","9890001122","9812233445","9944005566","9122003344","9000099999","9777888899","9881234560","9826543219","9998887776","9811100099","9887766554","9755554443","9345678901","9876665554","9988990011","9888887777","9966778899","9011002200","9844007788","9799112233","9882221110","9955667788","9811223344","9700112233","9900332211","9855667788","9889776655","9977112233","9844332211","9866001122","9991223344","9874005566","9812340999","9008765432","9821346790","9911887766","9899900011","9933221100","9776001122","9887456123","9811665544","9944550011","9877891234","9895667788","9001122554","9820012345","9955778899","9777332211","9866009988","9810099887","9887001122","9900112233","9876660009","9833445566","9755123789","9922110099","9811220077","9990099887","9898776654","9871100987","9912345566","9820001122","9844556677","9981223344","9755012345","9872221110","9966007788","9812347788","9799001122","9833456789"
  ];

  try {
    await driver.get('https://cordeliacruises.com/');
    console.log("Opened Cordelia Cruises site");

    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]')), 20000);

    try {
      await driver.wait(until.elementLocated(By.css('div.exit-intent-popup')), 5000);
      let popup = await driver.findElement(By.css('div.exit-intent-popup'));
      try {
        let closeBtn = await popup.findElement(By.css('button.close'));
        await closeBtn.click();
        console.log('Popup closed');
        await driver.sleep(1000);
      } catch {
        console.log('Popup present but close button not found');
      }
    } catch {
      console.log('No popup detected, continuing');
    }

    let loginBtn = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/header/nav/div/div[2]/div[2]/div/div[3]/div/a'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", loginBtn);
    try {
      await loginBtn.click();
    } catch {
      console.log('Click intercepted, using JS click');
      await driver.executeScript("arguments[0].click();", loginBtn);
    }

    await driver.wait(until.elementLocated(By.xpath('//*[@id="phone_number"]')), 10000);

    for (const mobile of mobileNumbers) {
      console.log("📱 Testing mobile number: " + mobile);

      try {
        let phoneInput = await driver.findElement(By.xpath('//*[@id="phone_number"]'));
        await phoneInput.clear();
        await phoneInput.sendKeys(mobile);

        let submitBtn = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div[1]/div/form/div[2]/button'));
        await submitBtn.click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div/div[1]/div/img')), 10000);
        let imageIcon = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div[2]/div/div[1]/div/img'));
        await imageIcon.click();

        console.log("✅ Finished number: " + mobile);
      } catch (err) {
        console.log("❌ Error with mobile number " + mobile + ": " + err.message);
        console.log("⚠️ Possibly captcha or navigation error. Skipping to next.");
      }

      await driver.sleep(1000);
    }
  } catch (err) {
    console.log("❌ Script failed: " + err.message);
  } finally {
    await driver.quit();
    console.log("Browser closed!");
  }
}

captcha_test();
