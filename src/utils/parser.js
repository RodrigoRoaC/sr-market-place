const parseDate = (date) => date ? new Date(date) : null;
const parseTime = (time) => time ? new Date(time).toLocaleDateString() : null;

const toComboData = (array = [], id, descriptcion) => array.map(a => ({
  label: a[descriptcion],
  value: a[id]
}));

module.exports = {
  parseDate,
  parseTime,
  toComboData,
}
