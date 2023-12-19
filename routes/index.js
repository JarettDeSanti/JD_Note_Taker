const router = require('express').Router();
const apiRoutes = require('./apiRoutes.js');
const viewRoutes = require('./viewRoutes.js');
router.use('/api', apiRoutes);
router.use('/', viewRoutes);
module.exports = router;