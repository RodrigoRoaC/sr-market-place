const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./indicator.controller');

const router = Router();
const controller = new Controller();

router.get('/', catchError(controller.list));
router.get('/patient/results', catchError(controller.patientResultChart));
router.post('/upload', catchError(controller.upload));
router.put('/', catchError(controller.update));
router.post('/delete', catchError(controller.delete));
router.get('/mae', catchError(controller.listMae));
router.get('/mae/combo', catchError(controller.listComboMae));
router.post('/mae', catchError(controller.registerMae));
router.put('/mae', catchError(controller.updateMae));

module.exports = router;
