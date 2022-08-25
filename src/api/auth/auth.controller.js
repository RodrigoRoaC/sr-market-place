const { request, response } = require('express');
const { Ok, BadRequest, BDError, NotFound } = require("../../helpers/http.helper");
const { parseUserAuthResponse } = require('./auth.map');
const AuthService = require('./auth.service');

class AuthController {
  async authenticate(req = request, res = response) {
    const user = req.body;
    if (!user) {
      return BadRequest(res, { message: 'You must provide a user object' });
    }

    const { error, details, data } = await AuthService.authenticate(user);
    if (error) {
      return BDError(res, details);
    }

    if (!data) {
      return NotFound(res, { message: 'User not found' });
    }

    return Ok(res, parseUserAuthResponse(data));
  }

  async authenticateUNR(req = request, res = response) {
    const user = req.body;
    if (!user) {
      return BadRequest(res, { message: 'You must provide a user object' });
    }

    const { error, details, data } = await AuthService.authenticateUNR(user);
    if (error) {
      return BDError(res, details);
    }

    if (!data) {
      return NotFound(res, { message: 'User not found' });
    }

    return Ok(res, parseUserAuthResponse(data));
  }

  async logOut(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'You must provide a body' });
    }

    const { error, data } = await AuthService.authenticate(body);
    if (error) {
      return BDError(res, error);
    }

    if (!data) {
      return NotFound(res, { message: 'User not found' });
    }

    return Ok(res, { message: 'User logged out' });
  }
}

module.exports = AuthController;
