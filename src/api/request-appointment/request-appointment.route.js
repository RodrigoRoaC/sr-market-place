const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./request-appointment.controller');

const router = Router();
const controller = new Controller();

router.get('/:operatorId', catchError(controller.list));
router.get('/combo/get-data', catchError(controller.getComboData));
router.post('/register', catchError(controller.register));
router.put('/update', catchError(controller.update));
router.post('/assign-operator', catchError(controller.assignToOperator));
router.post('/remove', catchError(controller.delete));

module.exports = router;
