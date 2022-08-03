const fs = require('fs');
const yaml = require('js-yaml');

function get() {
  const fileContent = fs.readFileSync(`./config/config.${process.env.NODE_ENV}.yml`, 'utf8');
  const data = yaml.load(fileContent);

  return data.default;
}

module.exports = {
  get
}
