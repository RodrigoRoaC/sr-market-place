const { Router } = require('express');
const health = require('./health/health.route');
const appointment = require('./appointment/appointment.route');
const auth = require('./auth/auth.route');

const router = Router();

router.use('/health', health);
router.use('/appointment', appointment);
router.use('/auth', auth);

module.exports = router;
