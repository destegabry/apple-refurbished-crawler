const fs = require('fs');
const conf = require('./conf');

function load() {
  if (fs.existsSync(conf.history.path)) {
    const historyFileContent = fs.readFileSync(conf.history.path);
    return historyFileContent.toString().split('\n');
  }
  return [];
}


function update(newProducts, prevHistory) {
  const urls = newProducts.map(({ productDetailsUrl }) => productDetailsUrl);
  const history = prevHistory.concat(urls);
  fs.writeFileSync(conf.history.path, history.join('\n'));
  return history;
}

module.exports = {
  load,
  update
}

