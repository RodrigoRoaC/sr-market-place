const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./auth.controller');

const router = Router();
const controller = new Controller();

router.post('/authenticate', catchError(controller.authenticate));
router.post('/authenticate-unr', catchError(controller.authenticateUNR));
router.post('/log-out', catchError(controller.logOut));

module.exports = router;
