const puppeteer = require('puppeteer');
const fs = require('fs/promises')

const NSW_URL = 'https://www.architects.nsw.gov.au/architects-register?view=architects&regSearchName=a&start=270'
const selector = 'tbody tr'

const scrapeArchitects = async (url, selector) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  const links = await page.$$eval(selector, x => x.map(x => x.firstElementChild.firstElementChild.href))

  // let links = [...document.querySelectorAll(selector)].map(x => x.firstElementChild.firstElementChild.href)


  // let details = [...selector].filter(x => x.textContent.trim()).map(x => {
  //   let key = x.textContent.split(":")[0];
  //   let value = x.textContent.split(":")[1];
  //   return (key === "Social Networks") ? {
  //     [key]: x.lastElementChild.lastElementChild.href
  //   } : { [key]: value }
  // })

  console.log(links)

  // let list = await page.$$( '.titleColumn' );

  await fs.writeFile('architects_urls.json', JSON.stringify(links))
  // await fs.writeFile('architects_details.json', details)

  await browser.close()
}


scrapeArchitects(NSW_URL, selector)



  // let movies_urls = await page.evaluate(() => [...document.querySelectorAll('.ratingColumn')].map(td => td.strong))

  // let movies_images = await page.evaluate( () => [ ...document.querySelectorAll( '.posterColumn a img' ) ].map( img => img.src ) )
  // let movies_urls = await page.evaluate( () => [ ...document.querySelectorAll( '.posterColumn' ) ].map( a => a.href ) )
  // let movies_titles = await page.evaluate( () => [ ...document.querySelectorAll( '.titleColumn' ) ].map( a => a.innerText ) )
  // let movies_ratings = await page.evaluate( () => [ ...document.querySelectorAll( '.ratingColumn' ) ].map( td => td.strong ) )