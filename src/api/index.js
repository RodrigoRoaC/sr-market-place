const { Router } = require('express');
const appointment = require('./appointment/appointment.route');
const auth = require('./auth/auth.route');
const doctor = require('./doctor/doctor.route');
const health = require('./health/health.route');
const payment = require('./payment/payment.route');
const requestAppointment = require('./request-appointment/request-appointment.route');
const user = require('./user/user.route');
const ubigeo = require('./ubigeo/ubigeo.route');

const router = Router();

router.use('/health', health);
router.use('/appointment', appointment);
router.use('/auth', auth);
router.use('/doctor', doctor);
router.use('/payment', payment);
router.use('/request-appointment', requestAppointment);
router.use('/ubigeo', ubigeo);
router.use('/user', user);

module.exports = router;
