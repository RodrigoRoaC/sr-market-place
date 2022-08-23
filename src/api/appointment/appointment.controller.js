const { request, response } = require('express');
const { Ok, BadRequest, BDError } = require("../../helpers/http.helper");
const AppointmentService = require('./appointment.service');

class AppointmentController {
  async list(req = request, res = response) {
    const operatorId = req.params.operatorId;
    if (!operatorId) {
      return BadRequest(res, { message: 'You must provide an operator identifier' });
    }

    const { error, data } = await AppointmentService.getByOperatorId(operatorId);
    if (error) {
      return BDError(res, error);
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

    const { error, details, data } = await AppointmentService.add(body);
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

    const { error, details, data } = await AppointmentService.update(body);
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

    const { error, details, data } = await AppointmentService.assignToOperator(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async getComboData(req = request, res = response) {
    const { error, details, data } = await AppointmentService.getComboData();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async delete(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await AppointmentService.remove(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, { data });
  }
}

module.exports = AppointmentController;
