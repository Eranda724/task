const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { getStats } = require('../controllers/statsController');

router.get('/stats', requireAuth, requireRole('admin', 'owner'), getStats);

module.exports = router;