const { request, response } = require('express');
const { Ok, BDError } = require("../../helpers/http.helper");
const UserService = require('./user.service');

class UserController {
  async listOperators(req = request, res = response) {
    const { error, details, data } = await UserService.getOperators();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }
}

module.exports = UserController;
