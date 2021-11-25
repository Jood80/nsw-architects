const fs = require('fs/promises')
const scrapeArch = require('./architects')

const main = async () => {
  let curr_limit = 0
  let max_limit = 5280
  let urls = []
  let res = []

  while (curr_limit <= max_limit) {
    try {
      await scrapeArch.initialize(curr_limit)
      links = await scrapeArch.getLinks('tbody tr')
      urls.push(links.length > 31 ? [... new Set(links)] : link) // remove Duplicates

      await fs.writeFile('architect_link2.json', JSON.stringify([].concat(...urls), null, 2))
      curr_limit += 30
    } catch (error) {
      console.error(error.message);
    } finally {
      await scrapeArch.close()
    }
  }
  details = await scrapeArch.getDetails(urls)
  res.push(details)
  await fs.writeFile('architect_detail.json', JSON.stringify([].concat(...res), null, 2))

}

main()

