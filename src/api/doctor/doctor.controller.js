const { request, response } = require('express');
const { Ok, BadRequest, BDError } = require("../../helpers/http.helper");
const DoctorService = require('./doctor.service');

class DoctorController {
  async list(req = request, res = response) {
    const { error, details, data } = await DoctorService.list();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async register(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'You must provide a body' });
    }
    if (!body.cod_usuario) {
      return Forbidden(res, { message: 'You must be a valid user' });
    }

    const { error, details, data } = await DoctorService.add(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async update(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'You must provide a body' });
    }
    if (!body.cod_usuario) {
      return Forbidden(res, { message: 'You must be a valid user' });
    }

    const { error, details, data } = await DoctorService.update(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async assignToOperator(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'You must provide a body' });
    }

    const { error, details, data } = await DoctorService.assignToOperator(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async getComboData(req = request, res = response) {
    const { error, details, data } = await DoctorService.getComboData();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async delete(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await DoctorService.remove(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, { data });
  }
}

module.exports = DoctorController;
