const puppeteer = require('puppeteer');
const fs = require('fs/promises')

const MOVIE_URL = 'https://www.imdb.com/title/tt7846844/?ref_=nv_sr_srsg_6'

const scrapeMovies = async (url) => {

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  let movieMeta = await page.evaluate(() => {
    return {
      title: document.querySelector('div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"] > h1').innerText,
      rating: document.querySelector('div[class="AggregateRatingButton__Rating-sc-1ll29m0-2 bmbYRW"] > span').innerText
    }
  })
  await fs.writeFile('movie_details.txt', JSON.stringify(movieMeta))

  await browser.close()
}


scrapeMovies(MOVIE_URL)