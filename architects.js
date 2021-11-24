const puppeteer = require('puppeteer');

const BASE_URL = (limit) => `https://www.architects.nsw.gov.au/architects-register?view=architects&regSearchName=a&start=${limit}`


const architects = {
  browser: null,
  page: null,

  initialize: async (limit) => {
    architects.browser = await puppeteer.launch({
      headless: false
    })
    architects.page = await architects.browser.newPage()
    await architects.page.goto(BASE_URL(limit), { waitUntil: 'domcontentloaded' })
  },

  getLinks: async (selector) => {
    let links = await architects.page.$$eval(selector, x => x.map(x => x.firstElementChild.firstElementChild.href))
    return links
  },

  getDetails: async (url) => {
    await architects.page.goto(url, { waitUntil: 'load' })

    const name = await architects.page.evaluate(() => document.querySelector('#system > h2').textContent)
    const info = await architects.page.$$eval("tr", x => x.filter(x => x.textContent.trim()).map(x => {
      let key = x.textContent.split(":")[0];
      let value = x.textContent.split(":")[1];
      return (key === "Social Networks") ? {
        [key]: x.lastElementChild.lastElementChild.href
      } : { [key]: value }
    }))
    const details = Object.assign({}, ...info);

    return {
      name,
      ...details,
    }
  },

  close: async () => {
    await architects.page.close()
  }
}

module.exports = architects