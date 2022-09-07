const { request, response } = require('express');
const { Ok, BadRequest, BDError } = require('../../helpers/http.helper');
const ParseUtils = require('../../utils/parser');
const AppointmentService = require('./appointment.service');

class AppointmentController {
  async list(req = request, res = response) {
    const fecha_programacion = req.query.fecha_programacion || ParseUtils.dateToISOString();
    const { error, details, data } = await AppointmentService.getAppointments({ fecha_programacion });
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async getByDoctor(req = request, res = response) {
    const cod_doctor = +req.params.id;
    const fecha_reserva = req.query.fecha_reserva || ParseUtils.dateToISOString();
    if (!cod_doctor) {
      return BadRequest(res, { message: 'You need to provide a cod_doctor' });
    }

    const { error, details, data } = await AppointmentService.getAppointmentsBy({ cod_doctor, fecha_reserva });
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async register(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await AppointmentService.register(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }
}

module.exports = AppointmentController;
