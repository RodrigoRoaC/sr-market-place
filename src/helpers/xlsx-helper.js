const xlsx = require('node-xlsx').default;

// const base64ToXlsx = (base64) => xlsx.parse(base64);
const base64ToXlsx = (base64) => xlsx.parse(Buffer.from(base64, 'base64'));

module.exports = {
  base64ToXlsx,
}
