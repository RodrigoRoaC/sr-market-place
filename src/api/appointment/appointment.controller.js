const { request, response } = require('express');
const { Ok, BadRequest, BDError, NotFound } = require('../../helpers/http.helper');
const ParseUtils = require('../../utils/parser');
const DoctorService = require('../doctor/doctor.service');
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
    const cod_usuario = +req.params.id;
    const fecha_reserva = req.query.fecha_reserva || ParseUtils.dateToISOString();
    if (!cod_usuario) {
      return BadRequest(res, { message: 'You need to provide a cod_usuario' });
    }

    const { error: err, details: dt, data: doctor } = await DoctorService.getDoctor(cod_usuario);
    if (err) {
      return BDError(res, dt);
    }

    if (!doctor) {
      return NotFound(res, { message: 'Doctor not found' });
    }

    const { error, details, data } = await AppointmentService.getAppointmentsBy({ cod_doctor: doctor.cod_doctor, fecha_reserva });
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

  async update(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await AppointmentService.update(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async cancel(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await AppointmentService.cancel(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }
}

module.exports = AppointmentController;
