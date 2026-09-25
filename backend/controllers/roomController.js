const Room = require('../models/Room');

// GET /api/admin/rooms
async function listAllRooms(req, res) {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch rooms' });
    }
}

// POST /api/admin/rooms
async function createRoom(req, res) {
    try {
        const { name, description, pricePerNight, maxGuests } = req.body;
        if (!name || !pricePerNight) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
        let image = '';
        if (req.file) {
            image = '/' + req.file.filename;
        }
        const room = await Room.create({ name, description, pricePerNight, maxGuests, image });
        res.status(201).json(room);
    } catch (err) {
        res.status(500).json({ error: 'Could not create room' });
    }
}

// PATCH /api/admin/rooms/:id
async function updateRoom(req, res) {
    try {
        const { name, description, pricePerNight, maxGuests, isActive } = req.body;
        const updateData = { name, description, pricePerNight, maxGuests, isActive };
        if (req.file) {
            updateData.image = '/' + req.file.filename;
        }
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: 'Could not update room' });
    }
}

module.exports = { listAllRooms, createRoom, updateRoom };