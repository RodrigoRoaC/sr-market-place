const Config = require('../utils/config');
const { Pool } = require('pg');

const config = Config.get();

class PostgreSQL {
  database;
  connectionPool;

  constructor(database) {
    const { dbName, user, password, host, port } = config.service.databases[database];
    this.database = database;
    this.connectionPool = new Pool({
      user: user,
      host: host,
      database: dbName,
      password: password,
      port: port,
    });
  }

  async initPostgreSQL() {
    const client = await this.connectionPool.connect();
    try {
      await client.query('SELECT NOW()');
      console.log(`Connection to <${this.database}> has been established successfully.`);
    } catch (err) {
      console.error(`Unable to connect to the database:: <${this.database}> :: ${err}`);
    } finally {
      client.release();
    }
  }

  async getConnectionClient() {
    return await this.connectionPool.connect();
  }
}

const db = new PostgreSQL('main');

module.exports = db;
