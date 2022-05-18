const conf = require('./lib/conf');
const History = require('./lib/history');
const Products = require('./lib/products');
const Email = require('./lib/email');

async function run() {
  try {
    let history = History.load();
    console.log(`Found ${history.length} history records`);

    const availableProducts = await Products.scrape();
    console.log(`Found ${availableProducts.length} refurbished products`);

    const filteredProducts = Products.filter(availableProducts, history);
    console.log(`${filteredProducts.length} new products matching filters`);

    if (filteredProducts.length > 0) {
      await Email.send(filteredProducts);
      console.log(`Notification email sent to ${conf.email.to}`);

      const updatedHistory = History.update(filteredProducts, history);
      console.log(`${updatedHistory.length} products saved in history`);
    }
  } catch (err) {
    console.error(err);
  }
}

run();