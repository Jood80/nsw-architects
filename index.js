const fs = require('fs/promises')
const scrapeArch = require('./architects')

const main = async () => {
  let limit = 1;  // TODO: update the limit 
  await scrapeArch.initialize(limit)
  links = await scrapeArch.getLinks('tbody tr')
  let details = await scrapeArch.getDetails(links[0])

  await fs.writeFile('architect_details.json', JSON.stringify(details))
  await scrapeArch.close()
}

main()



