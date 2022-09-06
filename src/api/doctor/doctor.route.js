const { Router } = require('express');
const { catchError } = require('../../helpers/error.helper');
const Controller = require('./doctor.controller');

const router = Router();
const controller = new Controller();

router.get('/', catchError(controller.list));
router.post('/', catchError(controller.register));
router.put('/', catchError(controller.update));
router.get('/time-window', catchError(controller.getVentanaHoraria));
router.get('/availability', catchError(controller.getVentanaHorariaByDate));
router.get('/specialties', catchError(controller.getEspecialidades));
router.get('/:id', catchError(controller.getDoctor));

module.exports = router;
