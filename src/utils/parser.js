const parseDate = (date) => date ? new Date(date) : null;
const parseTime = (time) => time ? new Date(time).toLocaleTimeString() : null;

const parseDateToString = (date) => parseDate(date)?.toISOString().split('T')[0] || null;

const toComboData = (array = [], id, descriptcion) => array.map(a => ({
  label: a[descriptcion],
  value: a[id]
}));

const parseAvailabilityDates = (dates = []) => [parseDateToString(dates[0]), parseDateToString(dates[1])];

const dateToISOString = () => {
  const [day, month, year] = new Date().toLocaleDateString().split('/');

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

module.exports = {
  parseDate,
  parseTime,
  toComboData,
  parseDateToString,
  parseAvailabilityDates,
  dateToISOString,
}
