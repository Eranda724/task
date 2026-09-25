const Booking = require('../models/Booking');
const Room = require('../models/Room');

// GET /api/availability?roomId=...&checkIn=2026-10-01&checkOut=2026-10-05
async function checkAvailability(req, res) {
    try {
        const { roomId, checkIn, checkOut } = req.query;
        if (!roomId || !checkIn || !checkOut) {
            return res.status(400).json({ error: 'roomId, checkIn and checkOut are required' });
        }

        const overlapping = await Booking.findOne({
            room: roomId,
            status: { $ne: 'cancelled' },
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) },
        });

        res.json({ available: !overlapping });
    } catch (err) {
        res.status(500).json({ error: 'Could not check availability' });
    }
}

// POST /api/bookings
async function createBooking(req, res) {
    try {
        const { roomId, guestName, email, checkIn, checkOut, guests } = req.body;

        if (!roomId || !guestName || !email || !checkIn || !checkOut) {
            return res.status(400).json({ error: 'Missing required booking fields' });
        }

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ error: 'Room not found' });

        const overlapping = await Booking.findOne({
            room: roomId,
            status: { $ne: 'cancelled' },
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) },
        });
        if (overlapping) {
            return res.status(409).json({ error: 'Room is not available for those dates' });
        }

        const booking = await Booking.create({
            room: roomId,
            guestName,
            email,
            checkIn,
            checkOut,
            guests: guests || 1,
        });

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Could not create booking' });
    }
}

// GET /api/admin/bookings
async function listBookings(req, res) {
    try {
        const bookings = await Booking.find()
            .populate('room', 'name pricePerNight')
            .sort({ checkIn: 1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch bookings' });
    }
}

// PATCH /api/admin/bookings/:id/status
async function updateBookingStatus(req, res) {
    try {
        const { status } = req.body;
        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('room', 'name pricePerNight');

        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Could not update booking' });
    }
}

module.exports = { checkAvailability, createBooking, listBookings, updateBookingStatus };