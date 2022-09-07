const { Ok } = require('../../helpers/http.helper');

class HealthController {
  async health(req, res) {
    return Ok(res, { message: 'Todo está OK' });
  }
}

module.exports = HealthController;
