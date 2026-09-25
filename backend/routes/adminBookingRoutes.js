const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const { listBookings, updateBookingStatus } = require('../controllers/bookingController');

router.use(requireAuth, requireRole('admin', 'owner'));

router.get('/bookings', listBookings);
router.patch('/bookings/:id/status', updateBookingStatus);

module.exports = router;