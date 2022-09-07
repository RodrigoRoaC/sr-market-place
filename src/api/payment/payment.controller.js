const { request, response } = require('express');
const { Ok, BDError, BadRequest, ExternalServiceError } = require('../../helpers/http.helper');
const { sendEmail } = require('../../services/node-mailer');
const UserService = require('../user/user.service');
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
    const codUsuario = req.query.codUsuario;
    const { error: userErr, details: userDet, data: userData } = await UserService.getPatientByUserCode(codUsuario);
    if (userErr) {
      return BDError(res, userDet);
    }

    const { error, details, data } = await PaymentService.getPaymentsByPatient(userData.cod_paciente);
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

  async updateState(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await PaymentService.updateState(body);
    if (error) {
      return BDError(res, details);
    }

    return Ok(res, data);
  }

  async confirmPayment(req = request, res = response) {
    const body = req.body;
    const { error, details, data } = await PaymentService.updateState(body);
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
