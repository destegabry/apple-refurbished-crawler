const fs = require('fs');
const conf = require('./conf');

function createHistoryID(product) {
  if (!product.filters?.dimensions) {
    return product.productDetailsUrl;
  }
  const attributes = [
    ...Object.values(product.filters?.dimensions),
    product.price.currentPrice.raw_amount
  ];
  return attributes.join('-')
}

function load() {
  if (fs.existsSync(conf.history.path)) {
    const historyFileContent = fs.readFileSync(conf.history.path);
    return historyFileContent.toString().split('\n');
  }
  return [];
}


function update(newProducts, prevHistory) {
  const ids = newProducts.map(createHistoryID);
  const history = prevHistory.concat(ids);
  fs.writeFileSync(conf.history.path, history.join('\n'));
  return history;
}

module.exports = {
  load,
  update,
  createHistoryID
}

