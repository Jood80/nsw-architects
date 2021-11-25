const fs = require('fs/promises');
const scrapeArch = require('./requests/architects')

const main = async () => {
  let curr_limit = 0, max_limit = 120, urls = [];

  try {
    max_limit = await scrapeArch.getMaxLimit(curr_limit) //TODO: re-code this redundant request
    while (curr_limit <= max_limit) {
      await scrapeArch.initialize(curr_limit)
      links = await scrapeArch.getLinks('tbody tr')
      urls.push(links.length > 31 ? [... new Set(links)] : links) // Removed Duplicates

      await fs.writeFile('./data/architect_urls.json', JSON.stringify([].concat(...urls), null, 2))
      curr_limit += 30
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

