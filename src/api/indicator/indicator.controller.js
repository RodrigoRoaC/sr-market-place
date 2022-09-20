const { request, response } = require('express');
const { Ok, BDError } = require('../../helpers/http.helper');
const { arrayToIndicatorValues } = require('../../utils/parser');
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

    const mapUploadPromises = arrayToIndicatorValues(file).map(IndicatorService.register);
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
}

module.exports = IndicatorController;
