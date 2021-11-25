const fs = require('fs/promises');
const scrapeArch = require('./architects')

const main = async () => {
  let curr_limit = 0, max_limit = 0, urls = [];

  try {
    max_limit = await scrapeArch.getMaxLimit(curr_limit) //TODO: fix this redundant request
    while (curr_limit <= max_limit) {
      await scrapeArch.initialize(curr_limit)
      links = await scrapeArch.getLinks('tbody tr')
      urls.push(links.length > 31 ? [... new Set(links)] : links) // Removed Duplicates

      await fs.writeFile('architect_urls3.json', JSON.stringify([].concat(...urls), null, 2))
      curr_limit += 3
    }
    await scrapeArch.getDetails([].concat(...urls))
  }
  catch (error) {
    console.error(error.message);
  }
  finally {
    await scrapeArch.close()
  }
}

main()

