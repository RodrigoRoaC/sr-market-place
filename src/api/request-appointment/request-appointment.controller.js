const { request, response } = require('express');
const { Ok, BadRequest, BDError } = require('../../helpers/http.helper');
const ReqAppointmentService = require('./request-appointment.service');
const AppointmentService = require('../appointment/appointment.service');

class AppointmentController {
  async list(req = request, res = response) {
    const operatorId = req.params.operatorId;
    if (!operatorId) {
      return BadRequest(res, { message: 'You must provide an operator identifier' });
    }

    const { error, data } = await ReqAppointmentService.getByOperatorId(operatorId);
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

    const { error, details, data } = await ReqAppointmentService.add(body);
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

    const { error, details, data } = await ReqAppointmentService.update(body);
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

    const { error, details, data } = await ReqAppointmentService.assignToOperator(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async getComboData(req = request, res = response) {
    const { error, details, data } = await ReqAppointmentService.getComboData();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async delete(req = request, res = response) {
    const body = req.body;
    const { error: err, details: det } = await AppointmentService.cancel(body);
    if (err) {
      return BDError(res, det);
    }

    const { error, details, data } = await ReqAppointmentService.remove(body);
    if (error) {
      return BDError(res, details);
    }
    return Ok(res, { data });
  }
}

module.exports = AppointmentController;
