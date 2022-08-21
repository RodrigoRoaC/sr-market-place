const { Router } = require('express');
const health = require('./health/health.route');
const appointment = require('./appointment/appointment.route');
const auth = require('./auth/auth.route');
const user = require('./user/user.route');

const router = Router();

router.use('/health', health);
router.use('/appointment', appointment);
router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
