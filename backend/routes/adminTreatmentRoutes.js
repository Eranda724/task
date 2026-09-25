const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { listAllTreatments, createTreatment, updateTreatment } = require('../controllers/treatmentController');

router.use(requireAuth, requireRole('admin', 'owner'));

router.get('/treatments', listAllTreatments);
router.post('/treatments', createTreatment);
router.patch('/treatments/:id', updateTreatment);

module.exports = router;
