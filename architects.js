const puppeteer = require('puppeteer');

const BASE_URL = (limit) => `https://www.architects.nsw.gov.au/architects-register?view=architects&regSearchName=a&start=${limit}`


const architects = {
  browser: null,
  page: null,

  initialize: async (limit) => {
    architects.browser = await puppeteer.launch({
      headless: true
    })
    architects.page = await architects.browser.newPage()
    await architects.page.goto(BASE_URL(limit), { waitUntil: 'networkidle2' })
    // await architects.page.waitForTimeout(10000)
  },

  getLinks: async (selector) => {
    let links = await architects.page.$$eval(selector, x => x.map(x => x.firstElementChild.firstElementChild.href))
    return links
  },

  close: async () => {
    await architects.page.close()
  }
}

module.exports = architects