const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./appointment.controller');

const router = Router();
const controller = new Controller();

router.get('/:operatorId', catchError(controller.list));
router.post('/register', catchError(controller.register));
router.put('/update', catchError(controller.update));
router.post('/assign-operator', catchError(controller.assignToOperator));

module.exports = router;
