const puppeteer = require('puppeteer');

const URL = "https://ezakupy.tesco.pl/groceries/pl-PL/"

void(async () => {
 try {
  const browser = await puppeteer.launch({
   headless: true
  });
  const page = await browser.newPage();
  page.setUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36")
  await page.goto(URL);

  // wait for page load
  await page.waitForSelector('.menu__link--superdepartment');

  //wait for product category and list
  const productCategories = await page.$(`.menu__link--superdepartment`)

  // choose product category

  productCategories.click();


  // wait for all items in chosen category

  await page.waitForSelector("ul.menu-department");
  const allProducts = await page.$('ul.menu-department > li > a')

  //click on next page with items
  allProducts.click()

  // wait for all items in chosen category
  await page.waitForSelector("ul.product-list");

  const productPriceList = await page.evaluate(() =>
   Array.from(document.querySelectorAll('ul.product-list > li'))
   .map(item => ({
    name: item.querySelector('h3').innerText,
    price: item.querySelector("span.value").innerText
   }))
  )
  console.log(productPriceList)


  await browser.close()
 } catch (e) {
  console.log("our error", e)
 }

})()