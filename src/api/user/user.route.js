const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./user.controller');

const router = Router();
const controller = new Controller();

router.get('/list-operators', catchError(controller.listOperators));
router.put('/update-user-payment', catchError(controller.updateUserPayment));

module.exports = router;
