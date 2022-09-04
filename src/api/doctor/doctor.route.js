const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./doctor.controller');

const router = Router();
const controller = new Controller();

router.get('/', catchError(controller.list));

module.exports = router;
