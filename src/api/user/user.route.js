const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./user.controller');

const router = Router();
const controller = new Controller();

router.get('/list-operators', catchError(controller.listOperators));

module.exports = router;
