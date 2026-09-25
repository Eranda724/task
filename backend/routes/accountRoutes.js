const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { updateAccount } = require('../controllers/accountController');

router.patch('/account', requireAuth, requireRole('admin', 'owner'), updateAccount);

module.exports = router;