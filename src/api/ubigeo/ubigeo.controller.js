const { request, response } = require('express');
const { Ok, BadRequest, BDError, NotFound } = require('../../helpers/http.helper');
const ParseUtils = require('../../utils/parser');
const UbigeoService = require('./ubigeo.service');

class UbigeoController {
  async getDepartamentos(req = request, res = response) {
    const { error, details, data } = await UbigeoService.getDepartamentos();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, ParseUtils.toComboData(data, 'departamento', 'descripcion'));
  }

  async getProvincias(req = request, res = response) {
    const { departamento } = req.query;
    if (!departamento) {
      return BadRequest(res, { message: 'You must provide a departamento' });
    }

    const { error, details, data } = await UbigeoService.getProvincias({ departamento });
    if (error) {
      return BDError(res, details);
    }

    if (!data) {
      return NotFound(res, { message: 'Provincias not founded' });
    }

    return Ok(res, ParseUtils.toComboData(data, 'provincia', 'descripcion'));
  }

  async getDistritos(req = request, res = response) {
    const { departamento, provincia } = req.query;
    if (!departamento || !provincia) {
      return BadRequest(res, { message: 'You must provide departamento and provincia' });
    }

    const { error, details, data } = await UbigeoService.getDistritos({ departamento, provincia });
    if (error) {
      return BDError(res, details);
    }

    if (!data) {
      return NotFound(res, { message: 'Distritos not found' });
    }

    return Ok(res, ParseUtils.toComboData(data, 'distrito', 'descripcion'));
  }
}

module.exports = UbigeoController;
