const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./appointment.controller');

const router = Router();
const controller = new Controller();

router.get('/', catchError(controller.list));
router.post('/', catchError(controller.register));
router.put('/', catchError(controller.update));
router.post('/cancel', catchError(controller.cancel));
router.get('/:id', catchError(controller.getByDoctor));

module.exports = router;
