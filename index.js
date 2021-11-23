const fs = require('fs/promises')
const scrapeArch = require('./architects')

const main = async () => {
  let res = []
  let limit = 30
  while (limit <= 150) {
    await scrapeArch.initialize(limit)
    links = await scrapeArch.getLinks('tbody tr')
    res.push(links)
    limit += 30
  }

  await fs.writeFile('architects_urls.json', JSON.stringify([].concat(...res), null, 2))
  await scrapeArch.close()
}

main()



//?TODO: Fetch the details for each creature
// let details = [...selector].filter(x => x.textContent.trim()).map(x => {
//   let key = x.textContent.split(":")[0];
//   let value = x.textContent.split(":")[1];
//   return (key === "Social Networks") ? {
//     [key]: x.lastElementChild.lastElementChild.href
//   } : { [key]: value }
// })


