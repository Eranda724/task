const Booking = require('../models/Booking');
const Room = require('../models/Room');

// GET /api/admin/stats
async function getStats(req, res) {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const totalRooms = await Room.countDocuments({ isActive: true });

        // Bookings currently occupying a room today
        const activeToday = await Booking.countDocuments({
            status: 'confirmed',
            checkIn: { $lte: now },
            checkOut: { $gt: now },
        });

        // Upcoming arrivals in the next 7 days
        const upcomingArrivals = await Booking.find({
            status: 'confirmed',
            checkIn: { $gte: now, $lte: in7Days },
        })
            .populate('room', 'name pricePerNight')
            .sort({ checkIn: 1 });

        // Revenue this month: confirmed bookings with check-in in current month
        const monthBookings = await Booking.find({
            status: 'confirmed',
            checkIn: { $gte: startOfMonth, $lt: startOfNextMonth },
        }).populate('room', 'pricePerNight');

        const revenueThisMonth = monthBookings.reduce((sum, b) => {
            const nights = Math.round((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24));
            return sum + nights * (b.room?.pricePerNight || 0);
        }, 0);

        const pendingCount = await Booking.countDocuments({ status: 'pending' });

        res.json({
            totalRooms,
            occupancyRate: totalRooms > 0 ? Math.round((activeToday / totalRooms) * 100) : 0,
            revenueThisMonth,
            pendingCount,
            upcomingArrivals,
        });
    } catch (err) {
        res.status(500).json({ error: 'Could not load stats' });
    }
}

module.exports = { getStats };