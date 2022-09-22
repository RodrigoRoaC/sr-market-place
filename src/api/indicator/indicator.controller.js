const { request, response } = require('express');
const { Ok, BDError, BadRequest, NotFound } = require('../../helpers/http.helper');
const Utils = require('../../utils/parser');
const IndicatorService = require('./indicator.service');

class IndicatorController {
  async list(req = request, res = response) {
    const { error, details, data } = await IndicatorService.list()
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async upload(req = request, res = response) {
    const { file } = req.body;
    if (!file.length) {
      return BadRequest(res, { message: 'No file provided' });
    }

    const mapUploadPromises = Utils.arrayToIndicatorValues(file).map(IndicatorService.register);
    const uploadRes = await Promise.all(mapUploadPromises);
    if (uploadRes.every(u => u.error)) {
      return BDError(res, uploadRes);
    }

    return Ok(res, { ok: true });
  }

  async update(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'No body provided' });
    }

    const { error, details, data } = await IndicatorService.update(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async delete(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'No body provided' });
    }

    const { error, details, data } = await IndicatorService.remove(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async listMae(req = request, res = response) {
    const { error, details, data } = await IndicatorService.listMae();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async listComboMae(req = request, res = response) {
    const { error, details, data } = await IndicatorService.listMae();
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, Utils.toComboData(data, 'cod_mae_indicator', 'descripcion'));
  }

  async registerMae(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'No body provided' });
    }

    const { error, details, data } = await IndicatorService.registerMae(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async updateMae(req = request, res = response) {
    const body = req.body;
    if (!body) {
      return BadRequest(res, { message: 'No body provided' });
    }

    const { error, details, data } = await IndicatorService.updateMae(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async patientResultChart(req = request, res = response) {
    const cod_mae_indicator = +req.query.cod_mae_indicator;
    const cod_patient = +req.query.cod_patient;
    if (!cod_mae_indicator || !cod_patient) {
      return BadRequest(res, { message: 'Patient and Indicator missing' });
    }

    const { error, details, data } = await IndicatorService.listBy({ cod_mae_indicator, cod_patient });
    if (error) {
      return BDError(res, details);
    }

    if (!data.length) {
      return NotFound(res, { message: 'No results found' });
    }

    const labels = data.map(({ fec_atencion }) => Utils.parseLocalDate(fec_atencion));
    const dataSets = data.map(({ valor }) => +valor);
    const dataSetLabel = data[0].nombre_mae_indicator;

    return Ok(res, { labels, dataSets, dataSetLabel });
  }
}

module.exports = IndicatorController;
