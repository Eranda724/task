const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { createStaffUser, listStaffUsers } = require('../controllers/userController');

router.use(requireAuth, requireRole('admin', 'owner'));

router.get('/users', listStaffUsers);
router.post('/users', createStaffUser);

module.exports = router;