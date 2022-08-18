const Config = require('../utils/config');
const postgresql = require('./postgresql');

const config = Config.get();

function initDatabases() {
  console.log(`Connecting to databases ...`);
  Object.keys(config.service.databases).forEach((database) => {
    const dialect = config.service.databases[database].dialect;
    switch (dialect) {
      case 'postgresql':
        console.log(`[${dialect}] init connection to <${database}>`);
        postgresql.initPostgreSQL(database);
        break;
      default:
        break;
    }
  });
}

module.exports = {
  initDatabases,
}
