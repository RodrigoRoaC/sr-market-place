const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./health.controller');

const router = Router();
const controller = new Controller();

router.get('/', catchError(controller.health));

module.exports = router;
