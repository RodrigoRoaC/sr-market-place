const { request, response } = require('express');
const { Ok, BadRequest, BDError, Forbidden } = require('../../helpers/http.helper');
const { toComboData } = require('../../utils/parser');
const { parseDoctor } = require('./doctor.map');
const DoctorService = require('./doctor.service');

class DoctorController {
  async list(req = request, res = response) {
    const { error, details, data } = await DoctorService.list();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async getDoctor(req = request, res = response) {
    const cod_doctor = +req.params.id;
    const { error, details, data } = await DoctorService.getDoctor(cod_doctor);
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
    if (!body.cod_resp) {
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

  async getVentanaHorariaByDate(req = request, res = response) {
    const { cod_doctor, fecha_reserva } = req.query;
    if (!cod_doctor || !fecha_reserva) {
      return BadRequest(res, { message: 'You must provide a doctor and a date'});
    }

    const { error, details, data } = await DoctorService.getVentanaHorariaByDate({ cod_doctor, fecha_reserva });
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, toComboData(data, 'cod_vent_horaria', 'horario'));
  }

  async getComboDoctorBy(req = request, res = response) {
    const { cod_especialidad, cod_tipo_atencion } = req.query;
    if (!cod_especialidad || !cod_tipo_atencion) {
      return BadRequest(res, { message: 'You must provide an specialty and an atention'});
    }

    const { error, details, data } = await DoctorService.getComboDoctor(+cod_especialidad, +cod_tipo_atencion);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, toComboData(parseDoctor(data), 'cod_doctor', 'nombres_doctor'));
  }
}

module.exports = DoctorController;
