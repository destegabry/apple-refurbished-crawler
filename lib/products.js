const { JSDOM, VirtualConsole } = require('jsdom');
const conf = require('./conf');
const { createHistoryID } = require('./history');

async function scrape() {
  const dom = await JSDOM.fromURL(`${conf.scraper.baseUrl}${conf.scraper.path}`, {
    runScripts: "dangerously",
    virtualConsole: new VirtualConsole() // Avoid getting client console messages
  });
  return dom.window.REFURB_GRID_BOOTSTRAP?.tiles || [];
}

function filter(products, history) {
  return products.filter(
    (tile) => {
      const historyId = createHistoryID(tile);
      // Check if the product was already notified
      if (history.indexOf(historyId) > -1) {
        return false;
      }
      // Check if all the filters match
      const filters = Object.entries(conf.scraper.filters);
      for (let i = 0; i < filters.length; i++) {
        const [key, value] = filters[i];
        if (tile.filters?.dimensions?.[key] !== value) {
          return false;
        }
      }
      return true;
    }
  );
}

module.exports = {
  scrape,
  filter
}