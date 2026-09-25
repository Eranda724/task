const express = require('express');
const router = express.Router();
const { checkAvailability, createBooking } = require('../controllers/bookingController');

// GET /api/availability?roomId=...&checkIn=...&checkOut=...
router.get('/availability', checkAvailability);

// POST /api/bookings
router.post('/bookings', createBooking);

module.exports = router;
