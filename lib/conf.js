const fs = require('fs');

const confPath = process.argv.slice(2)[0];
const conf = JSON.parse(fs.readFileSync(confPath));

module.exports = conf;