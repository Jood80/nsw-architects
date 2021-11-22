const puppeteer = require('puppeteer');
const fs = require('fs/promises')

const NSW_URL = 'https://www.architects.nsw.gov.au/architects-register?view=architects&regSearchName=a&start=270'
let browser = puppeteer.Browser;

const main = async (url) => {
  browser = await puppeteer.launch({ headless: true })
  const links = await scrapeArchitects(url, 'tbody tr')
  await fs.writeFile('architects_urls.json', JSON.stringify(links, null, 2))
}

const scrapeArchitects = async (url, selector) => {
  const page = await browser.newPage()
  await Promise.all([
    page.waitForNavigation(),
    page.goto(url),
    page.waitForSelector(selector),
  ]);

  return await page.$$eval(selector, x => x.map(x => x.firstElementChild.firstElementChild.href))
}


main(NSW_URL)