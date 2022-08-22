const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./ubigeo.controller');

const router = Router();
const controller = new Controller();

router.get('/departamentos', catchError(controller.getDepartamentos));
router.get('/provincias', catchError(controller.getProvincias));
router.get('/distritos', catchError(controller.getDistritos));

module.exports = router;
