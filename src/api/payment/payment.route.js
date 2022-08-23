const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./payment.controller');

const router = Router();
const controller = new Controller();

router.get('/:operatorId', catchError(controller.list));
router.get('/patient', catchError(controller.listByPatient));

module.exports = router;
