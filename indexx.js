const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

async function fillForm(formData) {
  let options = new chrome.Options();
  options.addArguments("--disable-cache");
  options.addArguments("--disk-cache-size=0");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(formData.link);

    // Chờ cho các phần tử có thể tương tác
    await driver.wait(until.elementLocated(By.name("card_number")), 10000);
    let cardNumber = await driver.findElement(By.name("card_number"));
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      cardNumber
    );
    await cardNumber.sendKeys(formData.card_number);

    await driver.wait(until.elementLocated(By.name("card_name")), 10000);
    let cardName = await driver.findElement(By.name("card_name"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", cardName);
    await cardName.sendKeys(formData.card_name);

    await driver.wait(until.elementLocated(By.name("releaseDate")), 10000);
    let releaseDate = await driver.findElement(By.name("releaseDate"));
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      releaseDate
    );
    await releaseDate.sendKeys(formData.releaseDate);

    await driver.wait(until.elementLocated(By.name("cvv")), 10000);
    let cvv = await driver.findElement(By.name("cvv"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", cvv);
    await cvv.sendKeys(formData.cvv);

    // Handle event click
    await driver.wait(
      until.elementLocated(By.css('button[type="button"].accordion-button')),
      10000
    );
    let accordionButton = await driver.findElement(
      By.css('button[type="button"].accordion-button')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      accordionButton
    );
    await accordionButton.click();

    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.name("email")), 10000);
    let email = await driver.findElement(By.name("email"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", email);
    await email.clear(); // Xóa giá trị mặc định (nếu có)
    await email.sendKeys(formData.email);

    await driver.wait(until.elementLocated(By.name("phone")), 10000);
    let phone = await driver.findElement(By.name("phone"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", phone);
    await phone.clear(); // Xóa giá trị mặc định (nếu có)
    await phone.sendKeys(formData.phone);

    await driver.wait(until.elementLocated(By.name("address")), 10000);
    let address = await driver.findElement(By.name("address"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", address);
    await address.clear(); // Xóa giá trị mặc định (nếu có)
    await address.sendKeys(formData.address);

    // Chọn quốc gia
    await driver.wait(
      until.elementLocated(By.id("react-select-2-input")),
      10000
    );
    let countryElement = await driver.findElement(
      By.id("react-select-2-input")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      countryElement
    );
    await countryElement.sendKeys("Vietnam");
    await countryElement.sendKeys(Key.RETURN);

    // Chọn thành phố
    await driver.wait(
      until.elementLocated(By.id("react-select-3-input")),
      10000
    );
    let cityElement = await driver.findElement(By.id("react-select-3-input"));
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      cityElement
    );
    await cityElement.click();

    await driver.wait(
      until.elementLocated(By.css("#react-select-3-option-0")),
      10000
    );
    let firstCityOption = await driver.findElement(
      By.css("#react-select-3-option-0")
    );
    await firstCityOption.click();

    // Continue
    await driver.wait(until.elementLocated(By.name("wards")), 10000);
    let wards = await driver.findElement(By.name("wards"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", wards);
    await wards.clear(); // Xóa giá trị mặc định (nếu có)
    await wards.sendKeys(formData.wards);

    // Điền mã bưu chính
    await driver.wait(until.elementLocated(By.name("zip_code")), 10000);
    let zipCode = await driver.findElement(By.name("zip_code"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", zipCode);
    await zipCode.clear(); // Xóa giá trị mặc định (nếu có)
    await zipCode.sendKeys(formData.zip_code);

    // Cuộn và nhấp vào nút submit
    let submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      submitButton
    );
    await driver.executeScript("arguments[0].click();", submitButton);

    await driver.sleep(5000);

    // Switch to the first iframe
    await driver.wait(
      until.elementLocated(By.name("enrollment-iframe")),
      10000
    );
    let firstIframe = await driver.findElement(By.name("enrollment-iframe"));
    await driver.switchTo().frame(firstIframe);

    await driver.sleep(5000);

    // Switch to the second iframe within the first iframe
    await driver.wait(
      until.elementLocated(By.id("Cardinal-CCA-IFrame")),
      10000
    );
    let secondIframe = await driver.findElement(By.id("Cardinal-CCA-IFrame"));
    await driver.switchTo().frame(secondIframe);

    // submit method receive OTP
    await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );
    let getOTPSubmitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      getOTPSubmitButton
    );
    await getOTPSubmitButton.click();

    await driver.sleep(5000);

    // Fill OTP into the input field
    await driver.wait(until.elementLocated(By.id("Callback_sms")), 10000);
    let otpInput = await driver.findElement(By.id("Callback_sms"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", otpInput);
    await otpInput.clear(); // Clear any existing value if needed
    await otpInput.sendKeys(formData.otp);

    await driver.sleep(5000);

    // Submit OTP

    await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );
    let OTPSubmitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      OTPSubmitButton
    );
    await OTPSubmitButton.click();
    await driver.sleep(5000);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await driver.quit();
  }
}

// Gọi hàm fillForm và truyền các giá trị
const formData = {
  link: "https://payment.appotapay.com/v2/bank/payment/process?tran=dGlkPUFQMjQyMDE2NzAyNjM1Jm9yZGVySWQ9SDk5OVA2MElILVJRZTNxJnRzPTE3MjE5MDI1MDg&sign=4c9770d2377afefa3f44d19ac49d91949c49d445e5283e5f497af491cbd615d9&lang=vi",
  card_number: "4780970023195367",
  card_name: "DAO DUY LUONG",
  releaseDate: "11/31",
  cvv: "403",
  email: "john.doe@example.com",
  phone: "0123456789",
  address: "123 Main Street",
  country: "Vietnam",
  wards: "Some District",
  zip_code: "123456",
  otp: "123456",
};

fillForm(formData);
