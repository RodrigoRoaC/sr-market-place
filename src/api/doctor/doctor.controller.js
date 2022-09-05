const { request, response } = require('express');
const { Ok, BadRequest, BDError, Forbidden } = require("../../helpers/http.helper");
const { toComboData } = require('../../utils/parser');
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
    if (!body.cod_resp) {
      return Forbidden(res, { message: 'You must be a valid user' });
    }

    const { error, details, data } = await DoctorService.register(body);
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

  async getVentanaHoraria(req = request, res = response) {
    const { error, details, data} = await DoctorService.getVentanaHoraria();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, toComboData(data, 'cod_vent_horaria', 'horario'));
  }

  async getEspecialidades(req = request, res = response) {
    const { error, details, data} = await DoctorService.getEspecialidades();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, toComboData(data, 'cod_especialidad', 'descripcion'));
  }
}

module.exports = DoctorController;
