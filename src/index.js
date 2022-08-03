const app = require('./App');
const Config = require('./utils/config');

const config = Config.get();

(
  () => {
    const host = '0.0.0.0';
    const port = +process.env.PORT || config.service.port;

    app.listen(port, host, () => console.log(`App listening on port: ${port} `));
  }
)();
