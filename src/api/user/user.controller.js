const { request, response } = require('express');
const { Ok, BDError } = require('../../helpers/http.helper');
const UserService = require('./user.service');

class UserController {
  async getUserByDoc(req = request, res = response) {
    const numDoc = +req.params.numDoc;
    if (!numDoc) {
      return BadRequest(res, { message: 'No documentation provided' });
    }

    const { error, details, data } = await UserService.getUserByDoc(numDoc);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async getPatientByDoc(req = request, res = response) {
    const numDoc = +req.params.numDoc;
    if (!numDoc) {
      return BadRequest(res, { message: 'No documentation provided' });
    }

    const { error, details, data } = await UserService.getPatientByDoc(numDoc);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async listOperators(req = request, res = response) {
    const { error, details, data } = await UserService.getOperators();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async updateUserPayment(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await UserService.updateUserPayment(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }
}

module.exports = UserController;
