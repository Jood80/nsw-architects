const fs = require('fs/promises')
const scrapeArch = require('./architects')

const main = async () => {
  let limit = 0
  let urls = []
  let res = []
  while (limit <= 120) {
    await scrapeArch.initialize(limit)
    links = await scrapeArch.getLinks('tbody tr')
    details = await scrapeArch.getDetails(links)
    urls.push(links)
    res.push(details)
    limit += 30
  }

  await fs.writeFile('architect_urls.json', JSON.stringify([].concat(...urls), null, 2))
  await fs.writeFile('architect_details.json', JSON.stringify([].concat(...res), null, 2))
  await scrapeArch.close()
}

main()



