const fs = require('fs/promises')
const scrapeArch = require('./architects')

const main = async () => {
  let curr_limit = 0, max_limit = 30
  let urls = [], res = []

  max_limit = await scrapeArch.getMaxLimit(curr_limit) //TODO: fix this redundant request
  while (curr_limit <= max_limit) {
    try {
      await scrapeArch.initialize(curr_limit)
      links = await scrapeArch.getLinks('tbody tr')
      urls.push(links.length > 31 ? [... new Set(links)] : links) // Removed Duplicates

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

