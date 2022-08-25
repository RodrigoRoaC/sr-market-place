const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./payment.controller');

const router = Router();
const controller = new Controller();

router.get('/:operatorId', catchError(controller.list));
router.get('/patient', catchError(controller.listByPatient));
router.post('/register', catchError(controller.register));
router.put('/update', catchError(controller.update));
router.put('/validate-payment', catchError(controller.updateState));
router.post('/confirm-payment', catchError(controller.confirmPayment));
router.post('/remove', catchError(controller.delete));
router.post('/send-payment-link', catchError(controller.sendPaymentLink));

module.exports = router;
