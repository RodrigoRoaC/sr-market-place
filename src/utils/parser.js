const parseDate = (date) => date ? date.toLocaleString() : null;
const parseTime = (time) => time ? `${time}` : null;

module.exports = {
  parseDate,
  parseTime,
}
