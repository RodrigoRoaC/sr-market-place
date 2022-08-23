const { request, response } = require('express');
const { Ok, BDError, BadRequest, ExternalServiceError } = require("../../helpers/http.helper");
const { sendEmail } = require('../../services/node-mailer');
const PaymentService = require('./payment.service');

class PaymentController {
  async list(req = request, res = response) {
    const operatorId = req.params.operatorId;
    if (!operatorId) {
      return BadRequest(res, { message: 'OperatorId is required' });
    }

    const { error, details, data } = await PaymentService.getPayments(operatorId);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async listByPatient(req = request, res = response) {
    const patientId = req.params.patientId;
    const { error, details, data } = await PaymentService.getPaymentsByPatient(patientId);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async register(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await PaymentService.add(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async update(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await PaymentService.update(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async delete(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await PaymentService.remove(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async sendPaymentLink(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await PaymentService.update(body);
    if (error) {
      return BDError(res, details);
    }

    const { error: emailErr, details: emailDetails } = await sendEmail(body);
    if (emailErr) {
      return ExternalServiceError(res, { message: 'Email not sended', details: emailDetails });
    }

    return Ok(res, { message: 'Link sended successfully', data: data });
  }
}

module.exports = PaymentController;
