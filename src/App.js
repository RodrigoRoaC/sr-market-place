const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { initDatabases } = require('./database');

class App {
  express;
  logger;

  constructor() {
    this.express = express();
    this.initDatabases();
    
    // this.logger = ?
    this.setMiddlewares();
    this.setRoutes();
  }

  initDatabases() {
    initDatabases();
  }

  setMiddlewares() {
    console.log('Loading middlewares');
    // Cross-origin
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
      );
      next();
    });
    this.express.use(cors({ credentials: true, origin: false }));
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    this.express.use(helmet());
    console.log('Middlewares loaded');
  }

  setRoutes() {
    console.log('Loading api routes...');
    const routes = require('./api');
    this.express.use('/', routes);
    console.log('Api routes loaded...');
  }
}

const app = new App();

module.exports = app.express;
